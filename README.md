# Medulla — anatomy study edition

## Use the ready-made site

Extract the ZIP first. Open the root `index.html` in a modern browser with JavaScript enabled. The app and CSS are compiled inside the file. Keep the adjacent `anatomy/` folder and `body-selector-v3.webp` beside it; those contain the identification artwork and reading figures. No npm command is needed to use that file.

On an iPhone, a file preview inside Files or a messaging app may not run JavaScript. Use the hosted site in Safari, or upload the Pages package to Cloudflare Pages.

## Upload to Cloudflare Pages

The separate `Medulla-Cloudflare-Pages.zip` is the ready-to-upload static site. Extract it and upload its contents with `index.html` at the top level. Select Pages / static assets, not a Worker. No server, database, functions or secrets are needed.

For Git-based Pages deployment from this source:

- Build command: `npm run build`
- Output directory: `dist`
- Node.js: 22.12 or newer

The app uses relative assets and hash links, so it can also be hosted as a static subdirectory or GitHub Pages site. Study progress belongs to the browser and origin, with no cross-device synchronization.

## Edit and rebuild

Run `npm ci`, then `npm run dev` for local editing. After editing, run `npm test`, `npm run build` and `npm run test:static`. `src/index.html` is the editable entry template. Root `index.html` is the generated, ready-to-open app; rebuild rather than hand-editing it.

The build bundles a classic inline script rather than JavaScript modules, preventing the local module-loading failure that caused the earlier blank page. TypeScript and JSX source files are not directly browser-executable.

## Included in this edition

- The approved purple/lime interface, centred medical-study hero and brain mascot.
- 39 interactive identification plates and 402 targets.
- Adapted source anatomy artwork for all 21 original regional plates. The 16 later regions now use detailed source dissections, sections and teaching networks. The two new respiratory sets add 73 major-structure targets across 13 source views.
- 60 concise study guides, 243 reading-checklist objectives and prerequisites across 11 domains. Every module has related visual context; nine labelled developmental figures accompany the five developmental modules.
- 64 source-linked applied anatomy cases, grouped into eight regional sets.
- Per-letter dashes, immediate starting clues, capped input, automatic grading and progressively stronger hints.
- Identification timers of 20 / 30 / 45 seconds, by answer length. Applied-case timers of 45 / 60 / 75 seconds include reading time. A timeout keeps the learning interaction open and adds the item to review.
- Browser-local progress, review lists, diagram zoom up to 400%, source-view switching, pan/focus, expansion, scan motion and accessible keyboard controls.

## References and coverage

Netter, Complete Anatomy and Visible Body are external reading companions. Proprietary atlas pages and models are not included. Source credits, licences and adaptation notes are in `anatomy-credits.md` and `docs/ANATOMY-ARTWORK-CREDITS.md`.

This is an expanded anatomy teaching aid. The 60-module pathway is a proposed scope, with concise guides and selected practice. It is not exhaustive Year 1–2 teaching, complete imaging coverage or an independently validated medical atlas. The 243 checklist objectives are not all individually assessed. Year placement differs between schools; faculty review of content, visuals and mappings remains necessary. Physiology, biochemistry, histology and other subjects are not implemented in this edition.

## Main editable files

`app/page.tsx` controls the original atlas and quiz. `app/anatomy-pathway.tsx` controls guides and objectives. `app/applied-lab.tsx` controls cases. Data live in `app/atlas.ts`, `app/advanced-atlas.ts`, `app/clinical-visuals.ts`, the curriculum/case JSON, and the detailed-plate/reading-figure JSON. Keep target IDs, labels, anchors and questions in sync; run the checks after changing them.
