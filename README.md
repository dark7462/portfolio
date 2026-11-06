# Anurag Nayak portfolio

A Next.js 16 portfolio built from the completed brief in [docs/Website_portfolio_details_filled.md](docs/Website_portfolio_details_filled.md) and the supplied SDE resume.

## Run locally

- Install the locked dependencies with npm ci.
- Start the preview with npm run dev.
- Check TypeScript with npm run check.
- Run ESLint with npm run lint.
- Create the production build with npm run build, then run npm start.

The Google Fonts used by next/font require network access during a fresh production build.

## Edit content

[src/data/siteConfig.ts](src/data/siteConfig.ts) holds the public identity, contact links, projects, skills, campus roles, education, achievements, appearance preferences, and motion speed. Project and recognition modules derive their content from it.

The portfolio has five project case studies, four featured projects, category filters, technology search, and keyboard-accessible quick views. Sherlock has an abstract evidence-graph cover. The other four covers are generated illustrations, labelled accordingly.

The current public resume and its image preview are public/Anurag-Nayak-Resume.pdf and public/Anurag-Nayak-Resume.png. The phone text and telephone link were removed from the supplied resume; other content and links were preserved. Verification is recorded in [docs/public-resume-verification.md](docs/public-resume-verification.md).

## Interaction

The full page assembles as visitors scroll. Cursors travel to targets, drag component frames with dimensions, type copy, and commit the real components. Reverse scrolling erases and removes outgoing components. Idle workers move toward the edges. Rebuild page restarts the hero; Motion off and reduced motion show the completed page. The motion setting persists under a portfolio-specific key.

The header includes active navigation, a progress line, and a mobile menu with Escape and focus restoration. Contact uses a validated email-draft form: visitors review and send through their own email app. The page never claims delivery.

## References and assets

The editorial direction follows the supplied [Touquir reference](https://touquirakhtar.com/) and the [Renando portfolio](https://portofoliorenando.pages.dev/) shown in the [Instagram reel](https://www.instagram.com/p/DfMhyC7Ma31/). Personal content comes from Anurag's supplied resume and existing project links.

The suggested [Swarm Rebuild repository](https://github.com/imperfec-t/swarm-Antigravity) describes its code as unlicensed. Its code is not included or injected here. The local component construction effect is independently implemented.

The approved generated portrait is based on Anurag's own image. Generated imagery is not represented as a real product screenshot. No client logos, testimonials, or unrelated personal credentials are shown.

## Domain and services

The public website URL is intentionally blank. Canonical/domain metadata is omitted until a real domain is supplied. No publishing or hosting account is required to run this checkout.

The open-source contributions route uses the existing GitHub endpoint and can use GITHUB_TOKEN server-side. Public project demos are owner-supplied external links; their availability can change.
