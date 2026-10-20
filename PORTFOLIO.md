# Portfolio

The home page is implemented in `src/pages/Portfolio.tsx`, with responsive styles in `src/portfolio.css`.

## Local development

```sh
npm install
npm run dev -- --host 127.0.0.1 --port 5173
```

## Checks

```sh
npm run check
```

The production output is `dist/`. Configure the host to serve `index.html` for application routes, including `/projects/*`.

SPA fallback configuration is included in `public/_redirects` for Netlify-compatible static hosting and `vercel.json` for Vercel. Keep the build command as `npm run build` and the output directory as `dist`. No deployment has been performed.

## Projects

The four resume projects are defined in `src/data/projects.ts`. Each links to a complete `/projects/:slug` case study rendered by `src/pages/Project.tsx`. Detailed narratives and stacks are in `src/data/case-studies.ts`, based on the resume and supplied handwritten implementation notes. Each page includes workflow architecture, design rationale, a validation plan, limitations, technical references, and a next-project link.

`src/components/ProjectExplorer.tsx` contains four local examples backed by `src/data/project-examples.ts`: segmentation selection, a schematic flood intersection query, ETL reconciliation and key validation, and editable access-log parsing with an event chart. All fixtures are explicitly synthetic. No model, map, IP lookup, clinical service, or external API runs from these panels.

Set each project's `url` field to its hosted application address when available. Cards will use the hosted destination; the case study keeps an Open project action. Leave it null to keep cards on the case studies. Illustrations are not application screenshots, and no measured benchmark is invented.

## Content

Education, work experience, skills, and project descriptions follow the supplied resume. The earlier unsupported accuracy, speed, and publication claims have been removed. Oracle uses the year 2026 because the resume and certificate list different months. Existing credential links and the updated portrait and email are retained.

The original resume PDF is not included in public assets. A public download requires the owner's approval.

Finance is displayed only as a degree in Education. The 30-item source audit and implemented changes are recorded in `WEBSITE_REVIEW.md`.

Certificate cards use lightweight WebP covers. Their original PNG files are retained; the Quantum certificate link opens its original image, and other credentials open their configured external destinations. Keep cover dimensions in `src/data/profile.ts` synchronized when replacing images.
