# Aakash Prathipati ? AI Engineer

A resume-based portfolio built with React, TypeScript, and Vite. The current design uses a warm neutral palette, forest green accents, local fonts, and responsive layouts.

## Run locally

```sh
npm ci
npm run dev
```

Open http://localhost:5173. The development server binds to localhost and uses a strict port so another instance cannot silently switch to a different URL.

## Verify changes

```sh
npm run check
```

This runs strict TypeScript checks, lint with zero warnings, interaction tests, structural accessibility checks, palette contrast tests, a production build, and a local preview audit of application URLs and assets.

```sh
npm run build
npm run preview -- --host 127.0.0.1
```

The production output is `dist/`. Configure the eventual host to return `index.html` for client-side routes such as `/projects/flood-mapping`.

## Edit content

- `src/data/profile.ts`: contact details, social links, experience, education, technical skills, engineering approach, and certification links.
- `src/data/projects.ts`: the four resume projects.
- `src/pages/Portfolio.tsx`: home-page sections.
- `src/pages/Project.tsx`: minimal project placeholders.
- `src/portfolio.css`: layout, colors, responsive rules, reduced-motion and print styles.
- `public/fonts/`: locally served fonts and their SIL Open Font Licenses.

Projects currently open dedicated placeholder pages. Set a project's `url` field in `src/data/projects.ts` to its absolute hosted URL when it is published. Cards then open the hosted application, and old local project URLs show a link to it. Empty or unsupported URL values stay on the placeholder. The project diagrams are conceptual illustrations rather than application screenshots or benchmark outputs.

## Content decisions

The content follows the supplied resume, with certificate titles checked against the certificate images. Oracle is dated 2026 because the resume and certificate disagree on the month. Existing credential links, the requested portrait, and the updated contact email are retained. Unsupported accuracy, processing-time, and publication claims from the original site are not used.

The original resume PDF is not included in public assets. No resume download is shown.

## Verification limits

The automated accessibility audit uses jsdom, which does not render browser layout. Contrast tests calculate ratios from the actual CSS palette. Production smoke checks verify routes and assets over HTTP; they do not replace a visual browser review. The computer-use tool stopped because it could not verify the current browser URL, so the latest layout has not received a direct browser visual review in this session.

Use npm for this checkout; `package-lock.json` is the current lockfile. The inherited Bun lockfile is not part of the documented workflow. See `QA.md` for the current audit scope and limits.
