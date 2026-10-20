# 30 website issues and 30 improvements

Source audit and implementation: 20 October 2026. Each numbered row pairs one observed issue or readiness gap with one implemented improvement. Design and resilience gaps are identified as such; these are not 30 claims that existing features were broken.

| # | Mistake, issue, or gap before this pass | Improvement implemented |
| --- | --- | --- |
| 1 | Hero padding still reserved space for the removed bottom slogan. | Reduced desktop and mobile padding while retaining the full-screen desktop composition. |
| 2 | The portrait caption repeated the name and role immediately beside the hero. | Removed the repeated identity and gave the social links visible names. |
| 3 | Three portrait aspect ratios cropped the supplied photo differently across devices. | Used its actual 1010:999 ratio at all breakpoints. |
| 4 | Languages appeared before degrees in the Education reading order. | Placed both degrees before Languages in the document. |
| 5 | Education retained a two-column biography layout after the biography was removed. | Put degree cards side by side with Languages on a separate row. |
| 6 | Languages retained top margins intended to separate it from deleted paragraphs. | Removed the orphaned margins. |
| 7 | Every credential issuer reserved 3.3 lines even for short names. | Removed the artificial issuer height; card actions still align at the bottom. |
| 8 | All credential images declared the same 600×420 intrinsic dimensions despite different source shapes. | Added accurate dimensions for each optimized cover. |
| 9 | Six PNG covers required approximately 3.53 MB. | Generated six WebP covers totaling approximately 0.50 MB; original assets remain available. |
| 10 | The internship cover had no asynchronous decoding hint. | Enabled asynchronous decoding alongside lazy loading. |
| 11 | The hero image element did not explicitly declare high fetch priority. | Added high priority and asynchronous decoding while retaining its preload and eager loading. |
| 12 | Navigation gave no visual indication of the section being read. | Added scroll-based current-section highlighting, including Contact at the page bottom. |
| 13 | Navigation had no programmatic current-location indication. | Added `aria-current="location"` consistently to desktop and mobile navigation. |
| 14 | Desktop header spacing stayed wide just above the mobile breakpoint despite the requested larger text scale. | Added a compact desktop treatment between 1101px and 1350px without changing the requested scale. |
| 15 | Short landscape screens used the same tall mobile navigation treatment. | Added a shorter header and scrollable menu treatment for viewports under 500px high. |
| 16 | The home wordmark had no minimum touch height. | Gave it a 44px minimum target height. |
| 17 | Links and buttons explicitly suppressed mobile tap highlighting. | Restored a subtle visible tap highlight. |
| 18 | Project title underlining and arrow feedback were hover-oriented; the arrow reacted only over the illustration. | Applied matching keyboard-focus feedback and whole-card hover behavior. |
| 19 | Credential action underlining and cover feedback were hover-oriented. | Applied the same feedback to keyboard focus across the credential link. |
| 20 | Skill pills lacked a wrap rule for long tokens at enlarged text sizes. | Enabled wrapping within long skill names. |
| 21 | Project graphics were not visibly identified as illustrative rather than actual application screenshots. | Labeled them “Illustrative diagram.” |
| 22 | The active stylesheet retained rules for removed slogans, notes, principles, and descriptions. | Removed 70 obsolete CSS rules and unused selector branches. |
| 23 | Profile data still exported deleted engineering-principle slogans and unused skill summaries. | Removed those unused fields and exports. |
| 24 | The Open Graph description still used a removed marketing slogan. | Matched it to the factual portfolio description. |
| 25 | Route changes updated ordinary metadata but left social titles and descriptions on the home-page text. | Updated and restored Open Graph and Twitter metadata with each route. |
| 26 | Twitter metadata declared a card type without its own title and description. | Added explicit, consistent title and description metadata. |
| 27 | Search engines had no structured profile record. | Added minimal Person JSON-LD using the existing name, role, and social profiles. |
| 28 | With JavaScript disabled, the page body was empty. | Added a concise no-script identity and email contact fallback. |
| 29 | An unexpected React rendering error could leave visitors without a useful recovery screen. | Added an error boundary with reload and direct email actions. |
| 30 | Deep-link hosting requirements were described in prose without checked-in routing configuration. | Added a Netlify-compatible SPA fallback and Vercel rewrite configuration. |

## Additional readiness work

- Added regression coverage for the Finance restriction, Education order, active navigation, the supplied internship destination, render recovery, social metadata, and structured profile data.
- Added build checks for WebP signatures, six cover assets, a 200 kB individual cover budget, a 600 kB combined cover budget, and the SPA fallback file.
- Added forced-colors support and improved print layout, backgrounds, and text scale.
- Kept all four project destinations as local placeholders, as requested. Their hosted URLs can be added later.
- Kept Finance exclusively within Education, preserved the supplied photo, email, and credential destinations, and kept the resume PDF out of public assets.

## Verification limits

The browser inventory returned no connected browsers during this pass, so direct visual browser review could not be completed. Source inspection, automated behavior/accessibility checks, and production HTTP/asset verification do not establish a Lighthouse score or guarantee an absence of defects.

Hosting rewrites are prepared, but this task remains local. A production domain and actual hosted project URLs have not been supplied. No canonical URL or sitemap with an invented domain has been added.

## Completed validation

`npm run check` passed after the final code change: strict TypeScript, zero-warning lint, 60 tests across seven files, production build, seven application routes, and 15 assets. Initial JavaScript is 62.8 kB gzip and CSS is 6.0 kB gzip. Both image budgets passed.
