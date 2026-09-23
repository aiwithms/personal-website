import { createDecisionBrief, formatReviewContextFacts, getCockpitPreset } from "./decisionBrief";
import type { ReviewPhaseId, ReviewRoleId } from "./decisionBrief";

export type EnquirySituation = "repair" | "new-build" | "cladding" | "compare" | "rfq" | "monitoring";
export type ProblemField = "component" | "goal" | "material" | "geometry" | "scope" | "service" | "requirements" | "inspection" | "delivery" | "signals";
export type ProblemDetails = Record<ProblemField, string>;
export interface EngineeringInput {
  situation: EnquirySituation;
  details: ProblemDetails;
  materialConfirmed: boolean;
  info: string[];
  risk: string[];
  role: ReviewRoleId | null;
  phase: ReviewPhaseId | null;
  exampleId?: string;
}

export const emptyProblem: ProblemDetails = {
  component: "", goal: "", material: "", geometry: "", scope: "", service: "",
  requirements: "", inspection: "", delivery: "", signals: ""
};

export function updateEngineeringDetail(input: EngineeringInput, field: ProblemField, value: string): EngineeringInput {
  return { ...input, details: { ...input.details, [field]: value }, materialConfirmed: field === "material" ? false : input.materialConfirmed };
}

const labels: Record<ProblemField, string> = {
  component: "Component or process", goal: "Engineering question", material: "Material",
  geometry: "Dimensions and access", scope: "Damage or build area", service: "Service conditions",
  requirements: "Tolerance and surface requirements", inspection: "Inspection and acceptance requirements",
  delivery: "Quantity and target date", signals: "Available signals and observed anomaly"
};
const routes: Record<EnquirySituation, string> = {
  repair: "Assess local LMD repair alongside replacement or conventional repair. Material compatibility, damage extent, deposition access and finishing determine whether this route is viable.",
  "new-build": "Compare DED, powder-bed fusion and conventional or hybrid manufacturing against the part envelope, feature access, detail and finishing requirements.",
  cladding: "Assess LMD cladding against the required surface function, base/coating material compatibility, dilution limits and finishing route.",
  compare: "Compare LMD/DED, powder-bed fusion and conventional routes using the same geometry, material, quantity and acceptance requirements. No process is selected by this brief.",
  rfq: "Request a part-specific technical review before a binding quotation. Separate deposition, machining, inspection and delivery scope so offers can be compared.",
  monitoring: "Link the observed signal to the toolpath, time and process conditions, then check it against independent measurements or inspection. A signal anomaly alone does not establish a defect."
};
const evidence: Record<EnquirySituation, string[]> = {
  repair: ["Material identification and repair history", "Dimensioned damage map and deposition access", "Post-machining and dimensional inspection plan"],
  "new-build": ["Dimensioned CAD with critical features", "Material and build strategy review", "Finishing and part inspection plan"],
  cladding: ["Base/coating material compatibility review", "Surface area, target thickness and required function", "Bond, dilution and coating inspection plan"],
  compare: ["Common drawing and acceptance requirements for each route", "Comparable quantities, machining scope and lead times", "Access, support and internal-feature constraints"],
  rfq: ["Drawing revision, material specification and quantity", "Defined machining and inspection scope", "Delivery target and commercial review"],
  monitoring: ["Time-aligned signals and toolpath context", "Calibration, acquisition settings and baseline", "Independent measurements or inspection linked to the same location"]
};
const attachments: Record<string, string> = {
  drawingAvailable: "Drawing / CAD available to share separately",
  photosAvailable: "Photos available to share separately",
  measurementsAvailable: "Measurement or inspection records available to share separately"
};

// Availability checkboxes never count as a supplied technical specification.
function supplied(value: string) {
  const text = value.trim();
  return text && !/^(unknown|unsure|not sure|tbd|tbc|n\/?a|none|not known|not specified|not available|to be confirmed)[.!?]?$/i.test(text) ? text : "";
}

export function problemFromPreset(id: string): EngineeringInput {
  const preset = getCockpitPreset(id);
  const details = { ...emptyProblem };
  if (id === "worn-shaft") Object.assign(details, {
    component: "Steel shaft near bearing seat", goal: "Assess local repair rather than replacing the shaft",
    material: "Steel; exact grade unconfirmed", scope: "Local wear near bearing seat; depth unmeasured",
    requirements: "Tight bearing-seat tolerance; numerical target to be supplied"
  });
  if (id === "monitoring-anomaly") Object.assign(details, {
    component: "LMD build with process signal anomaly", goal: "Understand whether the signal needs investigation",
    signals: "Process anomaly observed; no physical defect confirmed"
  });
  if (id === "surface-cladding") Object.assign(details, {
    component: "Worn surface or functional coating area", goal: "Assess cladding or local build-up",
    scope: "Surface wear; target coating thickness and function unconfirmed"
  });
  if (id === "lmd-vs-slm") Object.assign(details, {
    component: "Large part with local feature addition", goal: "Compare LMD, powder-bed fusion and conventional routes",
    scope: "Local feature addition; no internal-channel requirement"
  });
  if (id === "rfq") Object.assign(details, { goal: "Prepare a reviewable quotation enquiry" });
  return {
    situation: (preset?.state.situation ?? "repair") as EnquirySituation,
    details, materialConfirmed: false,
    info: [...(preset?.state.info ?? [])].filter((key) => key in attachments),
    risk: [...(preset?.state.risk ?? [])], role: null, phase: null, exampleId: preset?.id
  };
}

export function createEngineeringBrief(input: EngineeringInput) {
  const d = Object.fromEntries(Object.entries(input.details).map(([key, value]) => [key, supplied(value)])) as ProblemDetails;
  const monitoring = input.situation === "monitoring";
  const gradeConfirmed = Boolean(input.materialConfirmed && d.material && !input.risk.includes("unknownMaterial") && !/unconfirmed|unknown|not confirmed|to be confirmed|\btbd\b|\btbc\b/i.test(d.material));
  const critical: string[] = [];
  const useful: string[] = [];
  if (!d.component) critical.push("Identify the component or process under review.");
  if (!d.goal) critical.push("State the engineering decision or required outcome.");
  if (!gradeConfirmed) critical.push("Confirm the exact material grade and its source; a material family alone is insufficient.");
  if (!d.geometry) critical.push("Supply dimensions, relevant features and deposition or measurement access.");
  if (!monitoring && (!d.scope || /unmeasured|unconfirmed|not defined/i.test(d.scope))) critical.push(input.situation === "repair"
    ? "Map damage depth and extent, including any cracks and previous repairs."
    : "Define the build or coating area, thickness and required function.");
  if (monitoring && !d.signals) critical.push("Describe the available signals, anomaly, timing and toolpath location.");
  if (!d.service) critical.push(monitoring ? "Describe machine, process parameters and operating conditions." : "Describe service loads, temperature and wear or corrosion conditions.");
  if (!d.inspection || input.risk.includes("noInspection")) critical.push("Agree an inspection path and acceptance requirements with the responsible engineer.");
  if (!d.requirements || /to be supplied|unconfirmed/i.test(d.requirements)) useful.push("Provide numerical tolerances, surface targets and machining allowance.");
  if (!d.delivery) useful.push("Specify quantity, required date and any downtime constraint.");
  if (!input.info.includes("drawingAvailable")) useful.push("Prepare a drawing, CAD file or dimensioned sketch to share separately.");
  const risks: string[] = [];
  if (input.risk.includes("safetyCritical")) risks.push("Safety-critical use: agree formal inspection and qualification planning with the responsible authority.");
  if (input.risk.includes("unknownMaterial")) risks.push("Unknown material: resolve identification and compatibility before selecting a deposition process.");
  if (input.risk.includes("tightTolerance")) risks.push("Tight tolerance: include machining access, allowance and dimensional inspection.");
  if (input.risk.includes("highDowntime")) risks.push("High downtime cost: compare the complete repair or replacement lead time, including inspection.");
  if (input.risk.includes("noInspection")) risks.push("No inspection path: the enquiry cannot establish part acceptance.");
  if (input.materialConfirmed && !gradeConfirmed) risks.push("Material entries conflict: confirmation does not resolve a missing or unknown grade.");
  const hasProblem = Boolean(d.component && d.goal);
  const formal = input.risk.includes("safetyCritical") || input.risk.includes("noInspection");
  const completeness = formal ? "Requires formal inspection / qualification planning" : !hasProblem ? "Too vague for useful review" : critical.length || useful.length ? "Ready for preliminary discussion" : "Ready for expert review package";
  const nextAction = !hasProblem
    ? "Start with the component and the decision you need to make. Unknown values can remain blank."
    : formal
      ? "Agree the inspection and qualification responsibility first, then share this brief and the open questions with the technical reviewer."
      : critical.length
        ? `Resolve this first: ${critical[0]} Share the remaining open questions in a preliminary technical enquiry.`
        : "Check the entered specifications, attach the supporting files in your own email client and request a part-specific technical review.";
  const known = Object.entries(d).filter(([, value]) => value).map(([key, value]) => `${labels[key as ProblemField]}: ${value}`);
  return createDecisionBrief({
    situation: `${input.situation === "new-build" ? "New build" : input.situation === "rfq" ? "RFQ preparation" : input.situation[0].toUpperCase() + input.situation.slice(1)} enquiry${d.component ? `: ${d.component}` : ""}`,
    component: d.component || "Component not yet specified.", goal: d.goal || "Engineering question not yet specified.",
    material: d.material ? `${d.material}${gradeConfirmed ? " (grade confirmed by preparer; supporting evidence still requires review)" : " (grade not confirmed)"}` : "Material not yet specified.",
    geometryOrSize: d.geometry || "Dimensions and access not yet specified.",
    damageOrBuildArea: (monitoring ? d.signals : d.scope) || "Scope not yet specified.",
    knownFacts: [...(input.exampleId ? [`Origin: illustrative ${input.exampleId} example. Sample facts may remain; verify or replace them before sharing.`] : []), ...known, ...formatReviewContextFacts(input.role, input.phase)],
    availableData: input.info.filter((key) => key in attachments).map((key) => attachments[key]),
    missingCritical: critical, missingUseful: useful, missingOptional: [],
    riskFlags: risks, evidenceNeeded: evidence[input.situation], preliminaryRoute: routes[input.situation],
    reviewReadiness: completeness, briefCompleteness: completeness,
    expertReviewPackageStatus: formal ? "Requires formal qualification planning" : !hasProblem || critical.length ? "Not ready" : useful.length ? "Partially ready" : "Ready for expert review",
    evidenceBurden: formal ? "Formal qualification burden" : monitoring || input.risk.includes("unknownMaterial") || input.risk.includes("tightTolerance") ? "High inspection burden" : "Moderate review burden",
    nextAction, generatedFrom: "LMD Decision Cockpit — engineering enquiry",
    exafuseReviewRoute: "Use the email draft to request Exafuse technical and commercial review. Attach supporting files separately; the site does not receive them."
  });
}
