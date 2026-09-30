# AD Imperial — Signage Website

Marketing website for **AD Imperial**, a premium signage studio (letter boards, 3D
letters, LED & neon, custom fabrication) serving Kolkata, West Bengal.

Built with **Next.js 16 (App Router)** and React 19. Styling is hand-written CSS
in [`app/globals.css`](app/globals.css); the only external UI dependency is
**Bootstrap Icons**.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build && npm start   # production build
npm run lint                 # eslint
npm run typecheck            # tsc --noEmit
npm test                     # vitest: contact validation + gallery ordering
```

## Configuration

Copy [`.env.example`](.env.example) to `.env.local` (or `.env`) and fill in what
you have. Every variable is optional — the site builds and runs without them.
Never commit real credentials; `.env*` files are gitignored.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production origin — canonical URLs, Open Graph, sitemap, robots. Defaults to `https://adimperial.in`. |
| `NEXT_PUBLIC_CONTACT_PHONE` / `_EMAIL` / `_WHATSAPP` / `NEXT_PUBLIC_GSTIN` | Override the business details in `src/lib/site.ts`. Blank values are hidden from the UI. |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASSWORD` | **Required for email delivery.** SMTP account that *sends* contact-form leads (e.g. Gmail with an app password). Server-side only. |
| `SMTP_SECURE` | Optional. `true` for implicit TLS; auto-detected from the port when blank (465 = TLS, otherwise STARTTLS). |
| `SMTP_FROM` | Optional sender address / display name. Defaults to `SMTP_USER`. |
| `CONTACT_RECIPIENT_EMAIL` | Where leads are delivered. Set it in production; falls back to `nayeem.akhtar181@gmail.com` (the log notes when the fallback is used). |
| `CONTACT_WEBHOOK_URL` | Optional. Leads are also POSTed here as JSON (Zapier / Make / n8n / Slack / Discord). 5-second timeout. |

## Project structure

```
app/                 Routes: /, /about, /services, /services/[slug] (products,
                     categories and industry pages), /locations,
                     /locations/[state], /locations/[state]/[city], /guides,
                     /guides/[slug], /gallery, /faq, /contact, legal pages,
                     sitemap.ts, robots.ts, not-found.tsx, api/contact/route.ts
src/components/      UI (Header, Footer, LocationDetail, IndustryDetail, JsonLd, …)
src/data/            Content: services, serviceContent (product pages),
                     industries, locations/ (one file per state), guides,
                     projectImages (alt text for every real photo), faq, legal
src/lib/             site.ts (business details), seo.ts (SEO config +
                     buildMetadata), schema.ts (JSON-LD), serviceLinks.ts,
                     navigation.ts, mailer.ts, rateLimit.ts, serviceGallery.ts
public/              Imagery and video (all served locally)
```

Content lives in `src/data/*` and site-wide config in `src/lib/*` — update those
rather than editing components. The gallery is built automatically from the
images in `public/services/` (see `src/lib/serviceGallery.ts`); describe new
photos in `src/data/projectImages.ts`.

## SEO

- Every page builds its metadata with `buildMetadata()` (`src/lib/seo.ts`):
  title, description, canonical, Open Graph, Twitter and robots together.
- One `LocalBusiness` (the Kolkata studio) is emitted site-wide; page-level
  `Service`, `Article`, `BreadcrumbList`, `FAQPage` and `ImageGallery` schemas
  reference it by `@id`. No ratings, prices or branch addresses are published.
- **Adding a city:** add an entry in `src/data/locations/<state>.ts` and its
  slug to the state's `citySlugs`. Routing, links, sitemap and schema follow
  automatically. Only add cities the business genuinely serves, with content
  specific to that city.
- **Adding a guide:** add it to `src/data/guides.ts`; update `dateModified` on edits.
- Old URLs (flat `/locations/<city>`, renamed images) permanently redirect —
  see `next.config.ts`.
- Vercel preview deployments are `noindex` and disallowed in robots.txt.
- **Unconfirmed products:** slugs in `src/data/productStatus.ts` (currently glow
  sign boards and brass/aluminium letters) are written but not published — no
  route, sitemap entry, link or form option. Remove a slug once the business
  confirms it offers that product.
- **Canonical domain:** `https://adimperial.in`. In Vercel → Domains, make
  `adimperial.in` the primary domain and redirect `www.adimperial.in` to it.

## Icons

Only the Bootstrap Icons the site uses are shipped (`src/styles/bootstrap-icons-subset.*`).
After using a new `bi-*` icon, regenerate the subset with `npm run icons`
(needs Python with `fonttools` and `brotli`).

## Contact form & email delivery

```
ContactForm  →  POST /api/contact  →  Nodemailer (SMTP)  →  CONTACT_RECIPIENT_EMAIL
                                   └→  CONTACT_WEBHOOK_URL (optional)
```

[`app/api/contact/route.ts`](app/api/contact/route.ts):

- Accepts `name`, `phone`, `email` (optional), `service` (optional slug, e.g.
  `letter-board`) and `message`. Malformed JSON or non-string fields get a
  `400`; invalid values get a `422` with per-field errors.
- A hidden `company` honeypot field silently drops bot submissions.
- Rate-limited to 5 submissions per IP per 10 minutes (`429` + `Retry-After`).
  The limiter is in-memory ([`src/lib/rateLimit.ts`](src/lib/rateLimit.ts)), so
  on multi-instance/serverless hosting each instance counts separately. The
  client IP comes from `x-real-ip` (set by Vercel, not spoofable there), falling
  back to `x-forwarded-for`.
- Validation lives in [`src/lib/contactValidation.ts`](src/lib/contactValidation.ts)
  (unit tested).
- Delivery can't hang the request: the webhook times out after 5 s and SMTP
  after 10 s to connect / 20 s of inactivity; a timeout counts as a failed channel.
- Emails are sent by [`src/lib/mailer.ts`](src/lib/mailer.ts) **from** the SMTP
  account and **to** `CONTACT_RECIPIENT_EMAIL`, with `Reply-To` set to the
  visitor's email when they provide one. Times are shown in IST.
- If no channel is configured (or all fail), the lead is logged server-side at
  error level and the response reports `delivered: false`. Hosting logs are
  short-lived, so this is not a durable backup — configure both SMTP and a
  webhook in production if losing a lead to a mail outage matters.

Service pages link to `/contact?service=<slug>` to pre-select the service in
the form; the options come from `enquiryServiceOptions` in
[`src/data/services.ts`](src/data/services.ts).
