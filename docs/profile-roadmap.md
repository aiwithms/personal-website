# Profile availability

At Manish's request, unfinished personal destinations are visible as plain **Work in progress** text. They are not clickable and have no `href`, `tabindex`, button or link role.

Work in progress:

- GitHub profile
- Website repository
- ORCID
- Zenodo
- Hugging Face
- Google Scholar
- ResearchGate

LinkedIn, Exafuse and the canonical personal website remain active. Internal navigation, email routes and genuine external citations are unaffected. Repository ownership and deployment configuration remain unchanged.

Rules:

- Use `src/data/profiles.ts` for profile availability and shared rendering.
- Exclude unfinished destinations from JSON-LD `sameAs` and active AI-readable links.
- Never invent placeholder URLs.
- Activate a destination only after Manish confirms readiness and its URL is verified; synchronize human pages, structured metadata and public text.
- This explicit user request supersedes the earlier rule hiding planned profiles from public pages.
