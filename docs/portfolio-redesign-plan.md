# Anurag portfolio redesign — design and build plan

## Direction

Rebuild the portfolio as a dark editorial experience based on the Renando site shown in the supplied reel. Match its visual rhythm: oversized condensed headlines, near-black canvas, red accents, generous full-width sections, portrait-led hero, strong project imagery, fine rules, and cursor-led component construction. Use Anurag's existing projects, links, highlights, and resume rather than the reference site's identity or claims.

The reel begins with a near-black canvas and a cluster of colored pointers. They scatter to selected regions as the hero is built in separate pieces, then continue placing components on the actual page while it scrolls through work, recognition, comparison, story, and contact. Recreate that staged placement on the final page. The pointers are a visual presentation effect; they never represent real visitors or autonomous editing.

## Page sequence

1. **Opening and hero:** start with the actual full-screen hero near black; multiple agent pointers gather, select positions, and place the oversized red `PORTFOLIO` word, generated portrait, copy, and details separately.
2. **Selected work:** original generated cover artwork for GeoLoanLens, VibeBench, GridCam, and URL Shortener; category filters and a search field; links to the existing project pages and external destinations. Covers are labelled as illustrations so they cannot be mistaken for product screenshots.
3. **Technology marks and recognition:** a short strip of tools Anurag uses, followed by selected milestones from the repository. Avoid unsupported counts, client logos, or borrowed credentials.
4. **From plan to product:** an interactive comparison between a clearly labelled illustrative system blueprint and generated concept art, inspired by the reference's before/after module.
5. **About and toolkit:** short personal statement, engineering skills, and a compact build process grounded in the current portfolio.
6. **Journey:** existing experience and milestones in a clean timeline with expandable detail.
7. **Contact finale:** large typographic invitation; email, GitHub, LinkedIn, resume, and existing contact route.

## Visual and behavior rules

- Palette: near-black background, warm off-white text, vivid red primary accent, muted gray supporting text.
- Typography: condensed display face for headlines, restrained sans-serif for body and navigation, script accent only in the hero.
- Construction: each component has an unplaced, selected, and placed state. Colored pointers move to its location, a brief selection frame marks its bounds, and the actual text, image, card, or detail is placed. Project card shells arrive before their images and captions; recognition, story, and contact pieces are placed individually.
- Scroll behavior: scrolling down builds the section in view; scrolling up tears its components down in reverse order and scrolling down rebuilds them. The site never advances the visitor's scroll position automatically. The header can replay the hero build.
- Motion preferences: a motion-off control and `prefers-reduced-motion` show the finished page immediately, without pointer travel or staged placement.
- Layout: full-width desktop sections with responsive one-column mobile composition. No horizontal overflow or tiny text.
- Accessibility: semantic headings, keyboard-operable filters, search and comparison slider, visible focus, descriptive image alternatives, and skip link.
- Content: preserve project and social URLs; correct stale identity and availability copy; avoid implying experience or metrics that the repository does not support.

## Build order

1. Install locked dependencies and read the installed Next.js 16 guides before editing app code.
2. Establish the editorial tokens, typography, and generated hero asset.
3. Build the homepage sections and lightweight client interactions around existing data.
4. Restyle project, experience, open-source, resume, and contact routes so navigation follows the same visual system.
5. Verify desktop and mobile layouts, keyboard interaction, reduced motion, image loading, links, lint, and production build.

## Acceptance criteria

- The homepage visibly follows the reference's whole-page visual sequence while remaining recognizably Anurag's portfolio.
- The real full-screen hero visibly assembles through distinct pointer-led placements. Scrolling down builds actual section components; scrolling up removes them in reverse order, and scrolling down rebuilds them. The page never scrolls itself, and the hero build can be replayed.
- Motion off and reduced motion present the complete page without construction effects.
- Existing project, resume, contact, and open-source destinations remain reachable. The repository has no published blog posts, so no writing index appears in the new navigation.
- The generated portrait is used in the hero with a working transparent cutout.
- Production build and lint complete; desktop and mobile browser checks show no overflow or broken interactive controls.
