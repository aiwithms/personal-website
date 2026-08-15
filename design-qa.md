# Design QA

## Comparison target

- Source visual truth: `C:\Users\thede\.codex\generated_images\01a00676-e0e5-7cc3-a8d4-85750ca99574\exec-60a5489b-2f50-418e-9c59-2cacbafcb891.png`
- Implementation, desktop: `J:\My Drive\Softwares\web-design-lab\current-site\screenshots\desktop\home-redesign.png`
- Implementation, mobile: `J:\My Drive\Softwares\web-design-lab\current-site\screenshots\mobile\home-redesign.png`
- Full-view comparison: `J:\My Drive\Softwares\web-design-lab\current-site\screenshots\desktop\home-redesign-comparison.jpg`

The selected direction is a dark, symmetrical editorial hero with a centered display statement, a three-part evidence panel, a central process image, and a compact principle rail. The implementation deliberately uses the existing melt-pool photograph in place of the reference's generic central image.

## Capture normalization

- Desktop source: 1435 x 1096 px.
- Desktop implementation: 1440 x 1000 px at a 1440 x 1000 CSS viewport, device scale factor 1.
- Desktop comparison: both captures resized to 720 px wide and placed side by side in the comparison image. The differing source height is retained as an expected capture difference.
- Mobile implementation: 390 x 844 CSS viewport, device scale factor 1; browser-rendered viewport capture at the mobile evidence path above.
- State: homepage at initial scroll position, dark theme, navigation closed.

## Findings

- [P2] The first desktop pass placed the evidence panel too low, leaving the melt-pool image mostly below the initial viewport.
  Location: homepage hero vertical rhythm.
  Evidence: `output/playwright/home-hero-desktop.png` showed the three-panel system beginning close to the bottom edge, while the selected direction presents it as part of the opening composition.
  Impact: the requested process image did not have enough visual presence before scrolling.
  Fix: reduced the desktop hero top padding, display scale, supporting-copy and action spacing, and the gap before the evidence grid. Reduced the desktop panel minimum height from 18rem to 16rem.
  Post-fix evidence: `J:\My Drive\Softwares\web-design-lab\current-site\screenshots\desktop\home-redesign.png` shows the visible molten region and both supporting panels in the first viewport.

No actionable P0, P1, or P2 differences remain after the second desktop capture.

## Fidelity review

- Fonts and typography: the existing sans display face provides the bold, dense hierarchy of the selected direction. Georgia is used only for the italic evidence phrase, maintaining the editorial contrast without introducing an external font dependency. Mobile wraps remain legible.
- Spacing and layout rhythm: the centered statement, three-column panel, and five-part rail create the intended symmetry. On mobile, the panel stacks context, image, action, then the compact rail.
- Colors and visual tokens: graphite, warm copper, and muted ivory use the existing instrumentation tokens. The page remains high contrast without introducing bright dashboard-like color fields.
- Image quality and asset fidelity: the original responsive WebP/JPG melt-pool asset is used directly, cropped around the molten region, and retained with an explicit caption and image alternative text. No generated replacement or code-drawn image was used.
- Copy and content: existing positioning, Cockpit, public proof, method, and decision-support content are preserved. New panel labels only organize existing evidence concepts.

## Interaction and browser checks

- Primary interaction tested: "Run the Decision Cockpit" reached `/#lmd-decision-cockpit`.
- Browser console: 0 errors, 0 warnings; one React DevTools informational message only.
- Static build: `npm.cmd run build` passed with 0 Astro errors, warnings, and hints.

## Implementation checklist

1. Preserve the central melt-pool image and its responsive sources.
2. Preserve the Cockpit and public-proof actions.
3. Keep the decision-support boundary in the following homepage flow.

## Follow-up polish

- No remaining P3 items are required for this approved hero scope.

final result: passed
