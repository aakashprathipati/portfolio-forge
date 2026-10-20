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

The four resume projects are defined in `src/data/projects.ts`. Each currently links to a matching `/projects/:slug` placeholder rendered by `src/pages/Project.tsx`. Set each project's `url` field to its hosted address when available; both cards and old placeholder URLs will then point to it. The diagrams are illustrative, not screenshots of the applications.

## Content

Education, work experience, skills, and project descriptions follow the supplied resume. The earlier unsupported accuracy, speed, and publication claims have been removed. Oracle uses the year 2026 because the resume and certificate list different months. Existing credential links and the updated portrait and email are retained.

The original resume PDF is not included in public assets. A public download requires the owner's approval.

Finance is displayed only as a degree in Education. The 30-item source audit and implemented changes are recorded in `WEBSITE_REVIEW.md`.

Certificate cards use lightweight WebP covers. Their original PNG files are retained; the Quantum certificate link opens its original image, and other credentials open their configured external destinations. Keep cover dimensions in `src/data/profile.ts` synchronized when replacing images.
