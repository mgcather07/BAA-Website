# Bowfishing Association of America — Website

A modern, fast, static rebuild of [bowfishingassociation.com](https://bowfishingassociation.com),
replacing the legacy WordPress site. Built as plain HTML/CSS/JS and hosted on
**Firebase Hosting** (project `baa-website-908e4`).

The BAA is a 501(c)(3) non-profit dedicated to preserving, protecting, and
educating on the sport of bowfishing.

## Design

The brand palette and feel were lifted from the original site's custom theme:

| Token        | Hex        | Use                         |
|--------------|------------|-----------------------------|
| Red          | `#ee272e`  | Primary brand / CTAs        |
| Navy         | `#1e2c39`  | Headings, dark sections     |
| Charcoal     | `#0d0d0d`  | Footer                      |
| White        | `#ffffff`  | Backgrounds                 |
| Slate grays  | `#52555e` … `#b9c3cd` | Body / muted text |

Typeface: **Roboto** (matches the original). Patriotic red/white/blue, modern execution.

## Structure

```
BAA-Web/
├── firebase.json          # Firebase Hosting config (serves public/, cleanUrls, 404)
├── .firebaserc            # Default project: baa-website-908e4
└── public/                # ← everything served lives here
    ├── index.html         # Home
    ├── about.html · officers.html · hall-of-fame.html · sponsors.html
    ├── tournaments.html · world-championship.html · sanctioning.html · bowfisher-of-the-year.html
    ├── records.html · red-zone-maps.html · guide-services.html
    ├── join.html · contact.html · store.html · 404.html
    ├── css/styles.css     # The whole design system
    ├── js/main.js         # Shared header/footer injection + nav + scroll reveal + analytics loader
    ├── js/firebase-config.js  # Firebase Analytics init
    └── images/            # Logo + favicons (pulled from the original site)
```

**Header and footer are injected by `js/main.js`** from a single `NAV` array — edit
links in one place and every page updates. Each page just needs
`<div id="site-header"></div>`, `<div id="site-footer"></div>`, and
`<body data-page="...">` for active-link highlighting.

## Local preview

Any static server works. For the full Firebase experience:

```bash
npm install -g firebase-tools   # one time
firebase login                  # one time
firebase emulators:start --only hosting
# → http://localhost:5000
```

Or quick-and-dirty: `cd public && python3 -m http.server 5000`.

> Note: Firebase Analytics is skipped on `localhost` by design, so metrics stay clean.

## Deploy

```bash
firebase deploy --only hosting
```

Deploys `public/` to `baa-website-908e4`. First time, run `firebase login` and make
sure `firebase use baa-website-908e4` resolves (it's the default in `.firebaserc`).

## Contact form

`contact.html` is fully static, so the form needs a third-party handler. It's pre-wired
for **[Formspree](https://formspree.io)** (free tier is fine):

1. Create a form at Formspree and copy its endpoint (e.g. `https://formspree.io/f/abcdwxyz`).
2. In `public/contact.html`, set `data-endpoint="…"` on the `<form id="contact-form">`.
3. Set `data-fallback-email="…"` to the BAA's real inbox.

**Until an endpoint is set**, the form gracefully falls back to opening the visitor's
email client (`mailto:`) addressed to `data-fallback-email`.

## TODO / future

- Replace the Store placeholder with a real shop (WooCommerce export, Shopify, or Stripe).
- Replace the Join links with a real membership/checkout flow (the old site used MemberPress).
- Build out the searchable Records book and the Hall of Fame roster.
- Wire guide-service state links to real per-state guide listings.
- Add real officer/team photos (currently initials avatars).

## Provenance

Content and brand assets were extracted from the live legacy site on 2026-06-12.
Logo and favicons are the association's existing marks, copied from the original theme.
