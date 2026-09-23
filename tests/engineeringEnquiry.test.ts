import { describe, expect, it } from "vitest";
import { createEngineeringBrief, emptyProblem, problemFromPreset, updateEngineeringDetail } from "../src/lib/engineeringEnquiry";
import { briefPrintDocument } from "../src/lib/printDecisionBrief";
import type { EngineeringInput } from "../src/lib/engineeringEnquiry";
import { formatDecisionBriefJson, formatExafuseEmailDraft, formatTechnicalDecisionBrief } from "../src/lib/decisionBrief";

const blank = (): EngineeringInput => ({ situation: "repair", details: { ...emptyProblem }, info: [], risk: [], materialConfirmed: false, role: null, phase: null });
const specified = (): EngineeringInput => ({
  ...blank(), materialConfirmed: true, info: ["drawingAvailable"],
  details: { ...emptyProblem, component: "Pump shaft", goal: "Restore bearing seat", material: "42CrMo4, certificate A123",
    geometry: "80 mm diameter, 120 mm seat length, open access", scope: "0.4 mm measured radial wear",
    service: "Ambient temperature, cyclic bending", requirements: "80 h6 after machining",
    signals: "Camera intensity excursion at layer 3, position 20 mm", inspection: "Dimensional report and agreed crack inspection", delivery: "2 parts by 30 November" }
});

describe("Engineering enquiry workflow", () => {
  it("does not confuse document availability or the preparer's role with supplied specifications", () => {
    const input = { ...blank(), info: ["materialKnown", "drawingAvailable", "photosAvailable", "inspectionKnown"], role: "quality" as const, phase: "review" as const };
    const brief = createEngineeringBrief(input);
    expect(brief.briefCompleteness).toBe("Too vague for useful review");
    expect(brief.expertReviewPackageStatus).toBe("Not ready");
    expect(brief.missingCritical.join(" ")).toContain("exact material grade");
    expect(brief.missingCritical.join(" ")).toContain("dimensions");
    expect(brief.availableData).toHaveLength(2);
  });
  it("preserves the engineer's actual specifications in every shareable output", () => {
    const brief = createEngineeringBrief(specified());
    for (const output of [formatDecisionBriefJson(brief), formatTechnicalDecisionBrief(brief), formatExafuseEmailDraft(brief)]) {
      for (const fact of ["Pump shaft", "42CrMo4", "80 h6", "cyclic bending", "30 November"]) expect(output).toContain(fact);
    }
    expect(brief.expertReviewPackageStatus).toBe("Ready for expert review");
    expect(brief.boundaryStatement).toContain("not approval");
  });
  it("retains example facts when one field is edited, without treating placeholders as specifications", () => {
    const input = problemFromPreset("worn-shaft");
    input.details.delivery = "1 part before the next shutdown";
    const brief = createEngineeringBrief(input);
    expect(brief.component).toContain("shaft");
    expect(brief.material).toContain("Steel");
    expect(brief.knownFacts.join(" ")).toContain("next shutdown");
    expect(brief.missingCritical.join(" ")).toContain("damage depth");
    expect(brief.missingCritical.join(" ")).toContain("dimensions");
  });
  it("keeps explicitly unknown values and an unconfirmed material grade open", () => {
    const input = specified();
    input.details.geometry = "TBD";
    input.materialConfirmed = false;
    const brief = createEngineeringBrief(input);
    expect(brief.missingCritical.join(" ")).toContain("dimensions");
    expect(brief.missingCritical.join(" ")).toContain("exact material grade");
    expect(brief.expertReviewPackageStatus).toBe("Not ready");
  });
  it("does not permit a material checkbox to override a contradictory unknown-material flag", () => {
    const input = specified(); input.risk = ["unknownMaterial"];
    const brief = createEngineeringBrief(input);
    expect(brief.riskFlags.join(" ")).toContain("entries conflict");
    expect(brief.material).toContain("grade not confirmed");
    expect(brief.expertReviewPackageStatus).toBe("Not ready");
  });
  it("invalidates material confirmation after editing the material, including unconfirmed descriptions", () => {
    const edited = updateEngineeringDetail(specified(), "material", "Steel; grade unconfirmed");
    expect(edited.materialConfirmed).toBe(false);
    const brief = createEngineeringBrief({ ...edited, materialConfirmed: true });
    expect(brief.expertReviewPackageStatus).toBe("Not ready");
    expect(brief.material).toContain("grade not confirmed");
  });
  it("keeps sample provenance after edits and in email exports", () => {
    const edited = updateEngineeringDetail(problemFromPreset("worn-shaft"), "delivery", "Next week");
    expect(edited.exampleId).toBe("worn-shaft");
    expect(formatExafuseEmailDraft(createEngineeringBrief(edited))).toContain("Sample facts may remain");
    expect(createEngineeringBrief(blank()).knownFacts.join(" ")).not.toContain("illustrative");
  });
  it("prints the complete selected brief with escaped user text and all hidden questions", () => {
    const input = blank(); input.details.component = "<script>alert('test')</script> & shaft";
    const brief = createEngineeringBrief(input);
    const html = briefPrintDocument(brief);
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
    expect(html).toContain("&amp; shaft");
    for (const question of [...brief.missingCritical, ...brief.evidenceNeeded]) expect(html).toContain(question);
    expect(html).not.toContain("<details");
  });
  it("changes questions to suit monitoring instead of requesting repair damage depth", () => {
    const input = { ...blank(), situation: "monitoring" as const };
    const brief = createEngineeringBrief(input);
    expect(brief.missingCritical.join(" ")).toContain("signals");
    expect(brief.missingCritical.join(" ")).not.toContain("damage depth");
    expect(brief.evidenceNeeded.join(" ")).toContain("Independent measurements");
    expect(brief.preliminaryRoute).toContain("does not establish a defect");
  });
  it("keeps formal inspection responsibility visible even when all fields are supplied", () => {
    const input = specified(); input.risk = ["safetyCritical"];
    const brief = createEngineeringBrief(input);
    expect(brief.expertReviewPackageStatus).toBe("Requires formal qualification planning");
    expect(brief.nextAction).toContain("responsibility");
  });
  it("retains no automatic sending and no backend boundaries", () => {
    const brief = createEngineeringBrief(specified());
    expect(brief.noAutomaticSendingNote).toContain("Nothing is sent unless you send");
    expect(brief.noBackendNote).toContain("No data sent");
  });
  it("produces useful route-specific next steps without a circular tool referral", () => {
    for (const situation of ["repair", "new-build", "cladding", "compare", "rfq", "monitoring"] as const) {
      const brief = createEngineeringBrief({ ...specified(), situation });
      expect(brief.preliminaryRoute).not.toContain("start with");
      expect(brief.nextAction).toContain("technical review");
    }
  });
});
