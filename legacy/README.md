# Legacy GitHub Pages handoff

This directory contains the static redirect surface for the preserved legacy
repository:

`manish-sharma-ai/manish-sharma-ai.github.io`

The canonical source and live domain are:

- Source: `aiwithms/personal-website`
- Site: `https://manishsharma.dev`

## Release rule

Do not publish this redirect while the legacy repository still owns the
`manishsharma.dev` custom domain. Doing so would create a redirect loop.

After the custom domain has moved to `aiwithms/personal-website`, publish only
the contents of `legacy/redirect-site` from the legacy repository's dedicated
`legacy-redirect` branch. Keep the legacy `main` branch, the
`legacy-live-2026-08-03` tag, and the
`archive/legacy-live-2026-08-03` branch unchanged as rollback provenance.

The redirect intentionally contains no `CNAME` file. It preserves the path,
query string, and fragment when forwarding visitors from the old `github.io`
address to `manishsharma.dev`.
