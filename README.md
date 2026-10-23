# YUTECH SOLUTIONS website

Buildless company website. Deploy the contents of `dist/` to any static host.

- Contact: yutech075@gmail.com; +260 772 068 123; +260 969 452 590.
- The enquiry form submits via FormSubmit AJAX to yutech075@gmail.com. One-time recipient activation is required: submit a setup enquiry on the live site, confirm the FormSubmit email in the owner inbox, then send a second enquiry and verify receipt. Do not consider email delivery verified until this is done. Browser checks mock the service and do not prove inbox delivery. Messages stay in the form after success or failure; no automatic retries are performed.
- No analytics are implemented. FormSubmit processes enquiry submissions; the privacy notice discloses this. Google Fonts is used for typography; the page includes local font fallbacks.
- EatPay's status is described as developed and tested, awaiting cafeteria and employer onboarding.
- The product illustration is clearly labelled and contains no live data or fabricated results.
- Source and hosting configuration are isolated from EatPay's application.

Local preview: `python -m http.server 4173 --bind 127.0.0.1 --directory dist`

The Sites deployment starts owner-private. A public company launch and custom domain can be configured when ready.

## GitHub Pages

The `.github/workflows/pages.yml` workflow publishes `dist/` when `main` changes.
In the GitHub repository, set Settings > Pages > Build and deployment > Source
 to **GitHub Actions**. The deployment run returns the actual website URL.
Relative asset paths support a project URL such as `/yutech-solutions/`.
No tokens, server credentials or backend services are needed in the website.
The local `.openai/` metadata belongs to the earlier Sites registration and is
excluded from this GitHub repository.

## Search visibility and sharing
The page includes canonical metadata, Open Graph and X/Twitter preview metadata, Organization/WebSite JSON-LD, and a sitemap at https://miyambojoseph.github.io/yutech-solutions/sitemap.xml. The site is one HTML page, so section anchors are not separate sitemap entries.

Owner action: open https://search.google.com/search-console/ and add the URL-prefix property https://miyambojoseph.github.io/yutech-solutions/. Choose HTML tag verification and provide the verification tag for insertion into index.html (or supply the Google verification HTML file). After verifying, submit sitemap.xml and use URL Inspection to request indexing of the homepage. Never share a Google password or access token.

No Search Console verification or indexing request has been performed. Indexing and ranking are not guaranteed. Social platforms may cache older link previews.

GitHub Pages serves this project under /yutech-solutions/. A robots.txt placed inside that subdirectory would not control crawling: robots.txt must be at the hostname root. This repository does not control that root, so no misleading project-scoped robots.txt is included. Revisit the canonical URLs, sitemap, structured data and root robots.txt when moving to a custom domain.
