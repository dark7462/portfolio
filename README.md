# Anurag Nayak — Portfolio

An editorial portfolio for Anurag Nayak, built with Next.js 16, React 19, TypeScript, and CSS Modules. It presents selected engineering work, experience, open-source contributions, a resume, and contact information.

## Design

The redesign takes its visual direction from the [Renando portfolio](https://portofoliorenando.pages.dev/) seen in the [Instagram reference](https://www.instagram.com/p/DfMhyC7Ma31/): oversized condensed typography, a near-black and red palette, a portrait-led hero, image-led work, and cursor-led construction. All content, project links, and identity are Anurag's.

The hero portrait and four project covers were generated for this site. Covers are marked as illustrations rather than product screenshots. Colored agent cursors build components on the actual full-screen page: they move to a target, mark its bounds, and place its text, image, or card. The hero's title, portrait, copy, and details arrive separately; project card shells, images, and captions follow as visitors scroll. Scrolling up removes those placements in reverse order, and scrolling down builds them again. The page does not scroll automatically. The header can replay the hero build; turning motion off or requesting reduced motion shows the finished page immediately.

The detailed design and build plan is in [`docs/portfolio-redesign-plan.md`](docs/portfolio-redesign-plan.md).

## Run locally

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Check

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Notes

- The open-source contributions page uses GitHub GraphQL through `/api/github` when `GITHUB_TOKEN` is available. It falls back to GitHub's public search API when no token is configured.
- The contact form sends through FormSubmit to the address configured in `EditorialContactForm.tsx`. Direct email and social links are available on the contact page.
- Project details and their links live in `src/data/projectsData.ts`.
