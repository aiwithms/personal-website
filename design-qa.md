# Design QA

## Comparison target

- Source visual truth: `C:\Users\thede\AppData\Local\Temp\codex-clipboard-62506777-7851-4a94-8b65-2fbc875aa3bc.png` — the user-approved dark, symmetrical editorial homepage reference.
- Principle reference: the current Nooon Studio homepage, projects index, and Digital Metal case study, reviewed in the preceding visual audit.
- Desktop implementation: `output/playwright/cadence-contract-desktop-entry.png` and `output/playwright/cadence-contract-desktop-full.png`.
- Supporting proof focus: `output/playwright/cadence-final-supporting-proof.png`.
- Mobile implementation: `output/playwright/cadence-contract-mobile-full.png`.

The reference defines the editorial system—centred display statement, hard ruled evidence frame, compact navigation, minimal palette, and decisive action—not copied content or assets. The user's existing melt-pool image is intentionally used in place of the reference's machined part.

## Capture normalization

- Source: 1435 × 1096 px.
- Desktop implementation: 1440 × 1000 px at a 1440 × 1000 CSS viewport, device scale factor 1.
- Mobile implementation: 390 × 844 px at a 390 × 844 CSS viewport, device scale factor 1.
- State: dark theme, navigation closed, homepage entry for the hero; the supporting-proof focus was captured after scrolling so the lazy-loaded public image was actually rendered.
- Full-view comparison: source and implementation entry captures were normalized to 480 px wide and reviewed side by side in one in-memory comparison input. The distinct capture heights are expected.
- Focused comparisons: the public proof chapter, compact Cockpit preview, amber contact chapter, and mobile full page were inspected separately because their detail cannot be judged from the entry comparison.

## Comparison history

### Iteration 1 — visual cadence

**Findings**

- [P1] The prior lower homepage repeated the same black ruled-panel treatment, making the page feel like a continuous technical dashboard.
  - Fix: converted the opening public proof into a two-part image-led composition, expanded the supporting proof into a second media chapter, reduced note framing, simplified the desktop header, and added a solid amber contact endpoint.

- [P2] The full interactive Cockpit embedded on the homepage made the landing page unnecessarily long and dense.
  - Fix: replaced the full interface with the existing compact decision-brief preview. It keeps the real worked example, decision signal, confidence/evidence fields, critical gaps, risk flags, Copy brief action, and full-tool handoff without the full dashboard controls.

- [P2] Mobile technical support copy was too small for the amount of information shown.
  - Fix: increased mobile support-text size and line height across proof, method, mission, and route content.

### Iteration 2 — homepage contract

- [P1] The first compact preview removed visible product-path markers required by the repository's homepage contract.
  - Fix: restored the existing `DecisionBriefCard` compact preview inside the new editorial frame and retained the “Run the Decision Cockpit” and “View public proof” paths.

### Iteration 3 — post-fix verification

No actionable P0, P1, or P2 differences remain.

### Iteration 4 � desktop reading refinement

**Findings**

- [P2] Supporting desktop copy was visibly too small in several areas: mono labels, evidence metadata, the decision-support explanation, proof metrics, and the compact Brief preview. Large multi-line display headlines also sat too tightly.
  - Evidence: output/playwright/type-pass-before-desktop.png (1280 � 9009 px full-page capture from the same 1280px desktop state) and the approved reference. The before capture showed 8�11px mono support text and compressed display stacking.
  - Fix: added a desktop-only reading layer in src/styles/components.css. It raises the relevant support-copy ranges, increases line-height, adds small vertical separations between labels and detail, relaxes multi-line display headings, and enlarges/pads the homepage-only compact Brief fields. No layout, copy, route, image, or interaction changes were made.
  - Post-fix evidence: output/playwright/type-pass-after-desktop.png (same 1280px state) and output/playwright/type-pass-after-desktop-1440.png (1440 � 1000 CSS viewport; 1440 � 9721 px full-page capture, device scale factor 1). Before and after entry/proof captures were placed side by side in the same in-memory comparison input.

**Post-fix result**

- Support copy is readable without losing the deliberate editorial contrast between display text and metadata.
- The hero, Cockpit, section titles, and amber closing statement retain their hierarchy but no longer read as vertically compressed.
- No actionable P0, P1, or P2 differences remain from this refinement.

### Iteration 5 - homepage footer continuation

**Findings**

- [P2] The shared footer still used the older dark-instrument pattern: rounded controls, soft background treatment, a large bold identity block, and a loose 2 by 2 navigation grid. It read as a separate site template after the editorial amber contact chapter.
  - Evidence: output/playwright/footer-audit-before-1440.png, inspected as a focused footer crop at the local 1440 by 1000 desktop viewport.
  - Fix: added homepage-scoped footer rules only. The existing identity, destination links, social links, command-palette trigger, legal details, and accessibility semantics remain unchanged. The presentation is now a flat graphite continuation with square controls, normal-weight editorial identity type, mono support text, and a four-column ruled destination rail.
  - Post-fix evidence: output/playwright/footer-audit-after-1440.png, inspected side by side with the before crop in one comparison input.

**Post-fix result**

- The footer now reads as the final quiet information rail of the homepage rather than a return to the old card-like site shell.
- Footer links and controls retain their original destinations and visible focus behavior.
- No actionable P0, P1, or P2 differences remain from this footer refinement.

### Iteration 6 - footer reading size

**Findings**

- [P2] The new footer composition was correct, but its supporting text was still too small for comfortable desktop reading.
  - Evidence: output/playwright/footer-audit-after-1440.png. Footer group headings, links, description, action labels, and legal text were visually underpowered at 1440px.
  - Fix: increased those homepage-scoped text sizes, line-height, and list spacing while keeping the four-column ruled rail and restrained hierarchy.
  - Post-fix evidence: output/playwright/footer-readability-after-1440.png, compared side by side with the earlier footer capture in one visual input.

**Post-fix result**

- The footer now remains quiet relative to the headline but is comfortably readable at desktop size.
- No actionable P0, P1, or P2 differences remain from this readability refinement.

Intentional differences from the hero reference:

- The central image is the supplied melt-pool photograph rather than a machined component.
- The lower page contains public proof, a working decision product, and trust boundaries that are not in the reference. Those sections follow the audited Nooon principle of alternating sparse editorial moments with dominant imagery, rather than copying Nooon's content or assets.

## Fidelity review

- Fonts and typography: large normal-weight display text, italic evidence phrase, and compact mono metadata retain the approved contrast. The desktop header is reduced to five primary links plus Contact. Mobile support copy is more readable than the prior pass.
- Spacing and layout rhythm: the approved hero structure remains intact. The page now moves through image-led public proof, a compact working brief, method, a second public-image chapter, and an amber closing action.
- Colors and visual tokens: graphite/near-black, warm ivory, and orange remain the system. The solid amber contact chapter is a deliberate endpoint, inspired by Nooon's decisive colour fields while preserving the requested dark-mode character.
- Image quality and asset fidelity: the existing responsive melt-pool and public Exafuse assets are used directly. The focused proof capture confirms the valve-seat image is sharp, correctly cropped, and visible once rendered. No generated, placeholder, CSS-drawn, or copied Nooon assets were introduced.
- Copy and content: public metrics, source attribution, commercial boundaries, and the full decision-support disclaimer remain present. The compact Cockpit uses the existing public-safe worn-shaft example and retains Copy brief / Open full brief / full Cockpit paths.
- Responsiveness and accessibility: desktop and mobile reflow without visible horizontal overflow. Skip link, proof links, contact path, and Cockpit actions remain semantic. The mobile Menu was verified keyboard reachable and Enter-operable. Contrast at all zoom levels and screen-reader behavior remain separate follow-up checks.

## Interaction and browser checks

- Hero action: “Open the Decision Cockpit” leads to the concise homepage brief preview.
- Product action: “Run the Decision Cockpit” and “Open full brief” both lead to `/tools/#lmd-decision-cockpit`; Copy brief is available in the compact preview.
- Browser console: 0 errors and 0 warnings in the final local capture; the only console entry is React DevTools information.
- Build: `npm.cmd run build` passed with 0 Astro errors, warnings, and hints; 62 static pages built.
- Repository checks: `npm.cmd run audit:all` passed. The audit prints pre-existing duplicate-boundary density advisories for functional brief surfaces, but reports `audit:all passed`.

## Implementation checklist

1. Preserve the approved melt-pool hero and its three-part evidence frame.
2. Preserve public proof attribution, metrics, and the decision-support boundary.
3. Keep the full Cockpit on the tools page and the compact working brief on the homepage.
4. Keep the amber contact chapter as the homepage endpoint.

## Follow-up polish

- [P3] Test focus contrast and 200% zoom on a physical mobile device.
- [P3] Consider a licensed/open display family only if it improves on the current safe system-font pairing without harming load performance.

final result: passed
