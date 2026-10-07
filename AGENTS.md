# Agent Instructions For Manish Sharma Lab

Every AI coding agent working in this repository must read this file before editing, committing, pushing, or deploying. Treat it as the repo handoff contract.

## Project Identity

- Project: Manish Sharma Lab
- Canonical site: `https://manishsharma.dev`
- Canonical source owner: `aiwithms`
- Repository: `aiwithms/personal-website`
- Legacy Pages organization: `manish-sharma-ai`
- Legacy Pages deployment repository: `manish-sharma-ai/manish-sharma-ai.github.io` (deployment and rollback provenance only)
- GitHub profile for Manish: `https://github.com/aiwithms`
- Professional description: laser-based manufacturing, photonics and industrial systems
- Homepage headline: Laser-based manufacturing and industrial systems.
- Actual employment title: Head of AI & R&D at Exafuse / ThinkIng – Additive Technology GmbH
- Research role: external PhD researcher at Ruhr University Bochum, Applied Laser Technology; PhD in progress, expected 2027
- Strongest technical evidence: more than six years of Directed Energy Deposition / Laser Metal Deposition (DED/LMD), with process development, robotics, sensing, control, machine integration, manufacturing data, documentation and quality
- Research-platform artifact: LMD Decision Brief v1.0
- Company connection: Exafuse, Germany

Never replace the canonical site with any GitHub Pages URL. The `aiwithms` account owns the canonical source repository; `manish-sharma-ai/manish-sharma-ai.github.io` remains only as legacy Pages deployment and rollback provenance.

## Stack

- Astro
- TypeScript
- React islands
- Tailwind CSS
- Static generation
- GitHub Pages deployment through GitHub Actions

Core commands:

```bash
npm install
npm run dev
npm run check
npm run test
npm run build
npm run audit:security
npm run preview
```

On Windows PowerShell, use `npm.cmd` if execution policy blocks `npm`.

## Non-Negotiable Site Rules

- Keep `astro.config.*` configured for:
  - `site: "https://manishsharma.dev"`
  - `base: "/"`
  - static output
- Keep deployment through `.github/workflows/deploy.yml`.
- Do not use a `docs` deployment folder or `gh-pages` branch unless explicitly requested.
- Do not introduce a backend, database, paid service, private API, or confidential Exafuse/customer information.
- Do not place private, unannounced, employer-confidential, customer-confidential, or commercially sensitive project ideas anywhere in this public repository. Private concepts belong in a separate private workspace and must not be represented as hidden routes or draft source files.
- Preserve the LMD/DED pages as the established public proof domain. Do not dilute technical specificity on LMD, DED, laser cladding, repair, process monitoring, RFQ intelligence, or quality evidence pages.
- Keep statements inspection-aware. AI/process monitoring is decision support, not final quality proof.
- Keep this disclaimer language where relevant:
  `Preliminary decision-support only. Final feasibility depends on base material, geometry, service conditions, inspection requirements, and expert review.`
- Public Exafuse pages may be used as public proof context, but do not claim confidential involvement, certification, guaranteed outcomes, or engineering approval.
- Every new claim needs source context or must be clearly framed as interpretation.
- Do not add fake profile links, fake publications, fake certifications, unsupported metrics, or staging URLs.
- Preserve the commercial boundary: Exafuse owns commercial services, RFQs, company case studies, quality pages, production capability, delivery claims, and company-owned source details.
- When importing public Exafuse proof context, use `src/data/exafusePublicProof.ts` and `ExafuseProofMedia.astro`; record source path, reviewed commit, public URL, limitation, visible attribution, and `personalContribution: null` unless an explicit public contribution source supports a claim. The Exafuse repository is strictly read-only and is never a runtime/build dependency.
- Resolve Exafuse URLs through `src/config/externalLinks.ts`; do not hard-code Exafuse production or staging URLs in page components.
- Keep Exafuse labels synchronized with `EXAFUSE_LINK_MODE`. In `production-safe`, do not render labels such as "Exafuse Pathfinder", "Exafuse RFQ Builder", or individual case-study deep-link labels as if those future routes are live.
- Human-facing pages must not show internal migration CTA language. Use "Contact Exafuse" or "Request Exafuse review" with the small helper text `New Exafuse case/tool deep links will activate after production migration.` where production-safe context is needed.
- Render public proof metrics from `src/data/publicClaims.ts`; do not hard-code CS15 or other proof metrics in page components.
- Do not render image-generation prompts, diagram helper text, or long SVG descriptions as visible page text. Decorative visuals should keep internals out of rendered text and use concise accessibility labels.
- Keep identity facts unambiguous: `aiwithms` owns the canonical `aiwithms/personal-website` source repository; `manish-sharma-ai/manish-sharma-ai.github.io` is retained only as the legacy Pages deployment and rollback repository.
- Keep the homepage engineering-led: professional introduction, areas of work and selected personal evidence precede the research/method and Decision Cockpit layer. Primary actions are Selected work and Research/method; preserve `/public-work` and `#lmd-decision-cockpit`.
- Keep three professional dimensions visible: technical project and R&D leadership; lasers, photonics and sensing; advanced manufacturing and industrial systems. Present these as actual work, never as desired jobs.
- Keep DED/LMD prominent as the strongest technical evidence, while making practical optics, illumination, calibration and camera-based measurement visible beyond Education. AI, machine learning, modelling and automation are engineering tools within physical systems, not an umbrella personal identity.
- Use hands-on, concrete engineering language. Do not add job-search announcements, recruiter appeals, invented metrics, specialist photonics skills or credentials. Do not attach the six-plus DED/LMD years to LPBF work.
- Use the actual title `Head of AI & R&D` in structured employment identity. Broader positioning belongs in headlines/descriptions, not invented job titles. Preserve the in-progress PhD and German B1 progressing toward B2 qualifications.
- Preserve the unresolved master's end-date discrepancy (site: January 2020; approved-CV context: December 2019) in factual documentation. Omit the unnecessary month from public copy until confirmed; never guess.
- Keep LMD Decision Brief v1.0 as the central research-platform artifact across cockpit, tools, demo, template, playbooks, and AI-readable files.
- Treat `/brief-standard/` as the public, portable LMD Decision Brief v1.0 standard. Keep its schema, examples, adoption package, AI-readable files, and docs synchronized.
- Keep the three portable output modes synchronized: Technical Decision Brief, Exafuse-ready email draft, and AI-agent-safe summary.
- Treat brief completeness as a context-quality label, not feasibility. Treat evidence burden as a planning label, not approval.
- Keep not-valid-for boundaries synchronized: approval, certification, release, safety-critical acceptance, and quality guarantee.
- Email drafts must stay client-side/manual. Do not add automatic sending, backend endpoints, input analytics, or input storage.
- Missing information should stay grouped as critical gaps, useful gaps, and optional context wherever the shared brief is rendered or exported.
- Cockpit presets must be public-safe dummy examples only and must not use backend storage, analytics, or confidential data.
- LinkedIn and Exafuse are the active external personal-profile destinations. At Manish's request, unfinished profiles and the website repository appear as plain "Work in progress" text without links or keyboard focus. Exclude those destinations from JSON-LD `sameAs` and active AI-readable links; track readiness in `docs/profile-roadmap.md`. Keep genuine external citations and internal navigation active.

## Working Tree Rules

Before starting:

```bash
git status --short
git branch --show-current
```

Inspect all uncommitted changes before editing and reconcile them with the task. Do not reset, overwrite, stash or discard user work. Do not assume the deployed site matches the working tree. Run `git pull --ff-only` only when remote synchronization is authorized and safe for the current workspace; local-only work must stay local.

During work:

- Prefer small, coherent changes.
- Keep design, SEO, and AI-readable files synchronized when changing public identity, routes, assets, or canonical resources.
- When adding a route, consider updating:
  - `src/data/site.ts`
  - `/site-map`
  - `public/llms.txt`
  - `public/llms-full.txt`
  - `README.md`
  - `docs/search-indexing-checklist.md`
  - `docs/decision-brief-standard.md` when the route affects LMD Decision Brief v1.0

Before finishing:

```bash
npm run build
npm run audit:all
git status --short
```

For frontend changes, also preview and visually check the affected page when practical:

```bash
npm run preview
```

## Commit And Push Rules

Unless the user explicitly says not to, finish work by committing and pushing to `main`.

Standard sequence:

```bash
npm run build
git status --short
git add .
git commit -m "Concise description of the change"
git push
gh run list --limit 3
gh run watch <latest-run-id> --exit-status
```

After the deploy passes, verify important live URLs when the change affects deployed pages or assets:

```bash
curl -fsSI https://manishsharma.dev/ | head -n 1
curl -fsSI https://manishsharma.dev/site-map/ | head -n 1
```

If `gh` is not authenticated or unavailable, still commit locally and tell Manish the exact commands needed to push and verify deployment.

## Switching Machines

Before leaving one machine:

```bash
npm run build
git status --short
git add .
git commit -m "Describe the completed work"
git push
gh run list --limit 3
gh run watch <latest-run-id> --exit-status
git status -sb
git rev-parse HEAD
git rev-parse origin/main
```

The final state should be:

- working tree clean
- local `main` matches `origin/main`
- GitHub Pages deploy successful

On a new Windows PC, fresh clone:

```bash
git clone https://github.com/aiwithms/personal-website.git
cd personal-website
npm install
npm run dev
```

If the repo already exists on Windows:

```bash
cd personal-website
git checkout main
git pull --ff-only
npm install
npm run dev
```

Before making changes on the Windows PC:

```bash
git status -sb
git rev-parse HEAD
git rev-parse origin/main
```

If local and origin do not match, pull before editing.

## Content And SEO Rules

Important public files:

- `public/robots.txt`
- `public/llms.txt`
- `public/llms-full.txt`
- `public/identity.md`
- `public/about.md`
- `public/thesis.md`
- `public/research/lmd-literature-scan.json`
- `public/research/exafuse-public-proof-map.json`
- `public/schemas/lmd-decision-brief-v1.schema.json`
- `public/examples/lmd-decision-brief-worn-shaft-v1.json`
- `public/examples/lmd-decision-brief-worn-shaft-v1.md`
- `public/examples/lmd-decision-brief-monitoring-anomaly-v1.json`
- `public/examples/lmd-decision-brief-surface-cladding-v1.json`
- `public/examples/lmd-decision-brief-rfq-v1.json`
- `public/agent-pack/lmd-rfq-schema.json`
- `public/agent-pack/lmd-decision-rules.md`
- `public/agent-pack/lmd-prompt-library.md`
- `public/agent-pack/lmd-quality-checklist.md`

When updating SEO-sensitive content:

- Keep canonical URLs on `https://manishsharma.dev`.
- Keep JSON-LD IDs stable where possible.
- Keep the `Person` identity centered on Manish Sharma.
- Use laser-based manufacturing, photonics and industrial systems on top-level identity surfaces. Keep the actual Head of AI & R&D title and applied-AI evidence accurate.
- Treat LMD/DED at Exafuse as the strongest technical evidence, not the boundary of the professional profile. Retain topic-specific industrial-AI research wording where it describes the subject accurately.
- Keep AI-readable files concise, source-aware, and non-hype.

## Design Rules

- Premium, ordered, dark graphite/black-metal design.
- Clear hierarchy, symmetric layouts, readable menus, accessible contrast.
- Avoid generic portfolio feel.
- Keep navigation understandable: selected work, method, notes, about, contact, and the existing research resources.
- Keep primary navigation compressed: Home, Selected work (`/public-work`), Method, Notes and About, with Contact accessible on desktop and mobile. Tools, frameworks, sources and Brief Standard remain under Reference, footer, search or Site Map.
- Do not make dropdowns or important text too transparent to read.
- Optimize large images with WebP/responsive sources when practical.

## Figma-driven UI rules

- Inspect existing components and design tokens before creating new ones.
- Reuse the current routing, content, accessibility, and SEO patterns.
- Preserve all technical claims and evidence boundaries.
- Do not add a UI framework without explicit approval.
- Treat Figma as the visual source of truth, not as final code architecture.
- Implement one logical section at a time.
- Validate desktop and mobile against Figma screenshots.
- Prefer responsive grid and flex layouts over absolute positioning.
- Use project tokens instead of hardcoded values whenever possible.

## Final Release Checklist

Before committing a precision or trust-hardening release, run:

```bash
npm run check
npm run build
npm run audit:visual-text
npm run audit:rendered-text
npm run audit:links
npm run audit:claims
npm run audit:boundaries
npm run audit:homepage-product
npm run audit:brief-artifact
npm run audit:decision-brief
npm run audit:brief-boundaries
npm run audit:debug-text
npm run audit:a11y-static
npm run audit:german-brief
npm run audit:playbook-format
npm run audit:held-claims
npm run audit:mobile-static
npm run audit:public-profiles
npm run audit:decision-boundaries
npm run audit:exafuse-mode-human
npm run audit:rendered-public-language
npm run audit:brief-schema
npm run audit:human-exafuse-ctas
npm run audit:rubric-format
npm run audit:preflight
npm run audit:seo-social
npm run audit:experience
npm run audit:all
npm run smoke:live
git diff --check
```

Also confirm `docs/final-100-checklist.md` still matches the current public surface.

## Useful Live URLs

- Home: `https://manishsharma.dev/`
- Thesis: `https://manishsharma.dev/thesis`
- LMD/DED domain: `https://manishsharma.dev/domains/lmd-ded`
- About: `https://manishsharma.dev/about`
- Identity: `https://manishsharma.dev/identity`
- Public Profile: `https://manishsharma.dev/profile/public-profile`
- Public Work: `https://manishsharma.dev/public-work`
- Evidence: `https://manishsharma.dev/evidence`
- Industrial Proof Map: `https://manishsharma.dev/industrial-proof`
- Frameworks: `https://manishsharma.dev/frameworks`
- Agent Pack: `https://manishsharma.dev/agent-pack`
- Tools: `https://manishsharma.dev/tools`
- Resources: `https://manishsharma.dev/resources`
- Brief Standard: `https://manishsharma.dev/brief-standard`
- Lab Notes: `https://manishsharma.dev/lab-notes`
- Glossary: `https://manishsharma.dev/glossary`
- Press Kit: `https://manishsharma.dev/press-kit`
- For AI Agents: `https://manishsharma.dev/for-ai-agents`
- German Handoff: `https://manishsharma.dev/de`
- Site Map: `https://manishsharma.dev/site-map`
