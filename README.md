# YUTECH SOLUTIONS website

Buildless company website. Deploy the contents of `dist/` to any static host.

- Contact: yutech075@gmail.com; +260 772 068 123; +260 969 452 590.
- The enquiry form prepares a mailto draft and provides a copy fallback. It does not store or send enquiries.
- No analytics, cookies or third-party form submissions are implemented. Google Fonts is used for typography; the page includes local font fallbacks.
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
