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

All environment variables are optional — see [`.env.example`](.env.example).
Copy it to `.env.local` and fill in what you have:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production origin — canonical URLs, Open Graph, sitemap, robots |
| `NEXT_PUBLIC_CONTACT_PHONE` / `_EMAIL` / `_WHATSAPP` / `_ADDRESS` | Business contact details. Blank values are hidden from the UI. |
| `CONTACT_WEBHOOK_URL` | If set, contact-form submissions are POSTed here as JSON. If unset, submissions are logged server-side and the form still confirms receipt. |

## Project structure

```
app/                 Routes (/, /about, /services, /gallery, /faq, /contact,
                     /privacy-policy, /terms), sitemap.ts, robots.ts,
                     not-found.tsx, api/contact/route.ts
src/components/       Reusable UI (Header, Footer, ServiceCard, PortfolioCard,
                     FaqAccordion, ContactForm, PageHeader, PageCta, …)
src/data/            Content modules — services, projects, faq, testimonials, legal
src/lib/             site.ts (config + contact), navigation.ts (routes/nav),
                     constants.ts, utils.ts
public/              Imagery (all served locally)
```

Content lives in `src/data/*` and site-wide config in `src/lib/*` — update those
rather than editing components.

## Connecting the contact form to email

`app/api/contact/route.ts` validates submissions and forwards them to
`CONTACT_WEBHOOK_URL` when configured (works with Zapier / Make / n8n / a Slack
or Discord incoming webhook). To send email directly instead, implement delivery
inside the `deliverLead` function in that file (e.g. Resend, Nodemailer, SES).
