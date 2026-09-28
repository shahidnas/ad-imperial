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
```

## Configuration

Copy [`.env.example`](.env.example) to `.env.local` (or `.env`) and fill in what
you have. Every variable is optional — the site builds and runs without them.
Never commit real credentials; `.env*` files are gitignored.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production origin — canonical URLs, Open Graph, sitemap, robots |
| `NEXT_PUBLIC_CONTACT_PHONE` / `_EMAIL` / `_WHATSAPP` / `NEXT_PUBLIC_GSTIN` | Override the business details in `src/lib/site.ts`. Blank values are hidden from the UI. |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASSWORD` | **Required for email delivery.** SMTP account that *sends* contact-form leads (e.g. Gmail with an app password). Server-side only. |
| `SMTP_SECURE` | Optional. `true` for implicit TLS; auto-detected from the port when blank (465 = TLS, otherwise STARTTLS). |
| `SMTP_FROM` | Optional sender address / display name. Defaults to `SMTP_USER`. |
| `CONTACT_RECIPIENT_EMAIL` | Where leads are delivered. Defaults to `nayeem.akhtar181@gmail.com`. |
| `CONTACT_WEBHOOK_URL` | Optional. Leads are also POSTed here as JSON (Zapier / Make / n8n / Slack / Discord). |

## Project structure

```
app/                 Routes (/, /about, /services, /services/[slug], /locations,
                     /locations/[slug], /gallery, /faq, /contact,
                     /privacy-policy, /terms), sitemap.ts, robots.ts,
                     not-found.tsx, api/contact/route.ts
src/components/      Reusable UI (Header, Footer, ServiceCard, PortfolioCard,
                     FaqAccordion, ContactForm, PageHeader, PageCta, …)
src/data/            Content modules — services, serviceContent, locationContent,
                     faq, clients, legal
src/lib/             site.ts (config + contact), navigation.ts (routes/nav),
                     mailer.ts (Nodemailer), rateLimit.ts, schema.ts (JSON-LD),
                     serviceGallery.ts, constants.ts, utils.ts
public/              Imagery and video (all served locally)
```

Content lives in `src/data/*` and site-wide config in `src/lib/*` — update those
rather than editing components. The gallery is built automatically from the
images in `public/services/` (see `src/lib/serviceGallery.ts`).

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
  on multi-instance/serverless hosting each instance counts separately.
- Emails are sent by [`src/lib/mailer.ts`](src/lib/mailer.ts) **from** the SMTP
  account and **to** `CONTACT_RECIPIENT_EMAIL`, with `Reply-To` set to the
  visitor's email when they provide one. Times are shown in IST.
- If no channel is configured (or all fail), the lead is logged server-side
  and the response reports `delivered: false`.

Service pages link to `/contact?service=<slug>` to pre-select the service in
the form; the options come from `enquiryServiceOptions` in
[`src/data/services.ts`](src/data/services.ts).
