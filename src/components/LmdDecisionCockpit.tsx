import { useEffect, useMemo, useState } from "react";
import { internalHref } from "@utils/urlPolicy.mjs";
import DecisionBriefCard from "./DecisionBriefCard";
import type { DecisionBrief } from "../lib/decisionBrief";
import {
  COCKPIT_PRESETS,
  REVIEW_PHASE_OPTIONS,
  REVIEW_ROLE_OPTIONS,
  WORN_SHAFT_SCENARIO,
  getCockpitPreset
} from "../lib/decisionBrief";
import { createEngineeringBrief, emptyProblem, problemFromPreset, updateEngineeringDetail } from "../lib/engineeringEnquiry";
import type { EngineeringInput, ProblemField } from "../lib/engineeringEnquiry";
import EngineeringBriefPanel from "./EngineeringBriefPanel";

const DEFAULT_EXAFUSE_URL = "/contact";
const DEFAULT_EXAFUSE_LABEL = "Contact routes";
const OUTPUT_BOUNDARY_LABELS = ["Confidence is not approval", "Missing information", "Risk flags", "Evidence needed"];

const situations = [
  {
    id: "repair",
    label: "Repair damaged/worn part",
    route: "/tools#repairability-module",
    tool: "LMD Repairability Quick Check",
    action: "Screen repairability before asking for expert review."
  },
  {
    id: "new-build",
    label: "Build new metal feature/part",
    route: "/tools#route-module",
    tool: "LMD vs SLM Advisor",
    action: "Compare process route signals before choosing LMD, SLM/LPBF, hybrid manufacturing, or review."
  },
  {
    id: "cladding",
    label: "Add coating/cladding",
    route: "/tools#lmd-decision-cockpit",
    tool: "LMD Decision Brief",
    action: "Structure coating function, base material, surface target, finishing, and inspection needs."
  },
  {
    id: "compare",
    label: "Compare LMD vs SLM",
    route: "/tools#route-module",
    tool: "LMD vs SLM Advisor",
    action: "Start with size, local addition, complexity, tolerance, and internal-feature constraints."
  },
  {
    id: "rfq",
    label: "Prepare RFQ",
    route: "/tools#rfq-module",
    tool: "RFQ Prompt-to-Structure Converter",
    action: "Convert vague text into known facts, missing fields, risk flags, and an RFQ summary."
  },
  {
    id: "monitoring",
    label: "Understand monitoring/evidence",
    route: "/frameworks/lmd-quality-evidence-ladder",
    tool: "LMD Quality Evidence Ladder",
    action: "Separate process signals from inspection evidence and release proof."
  }
] as const;

const infoOptions = [
  ["drawingAvailable", "Drawing / CAD available"],
  ["photosAvailable", "Photos available"],
  ["measurementsAvailable", "Measurement / inspection records available"]
] as const;

const riskOptions = [
  ["safetyCritical", "Safety critical?"],
  ["highDowntime", "High downtime cost?"],
  ["tightTolerance", "Tight tolerance?"],
  ["unknownMaterial", "Unknown material?"],
  ["noInspection", "No inspection path?"]
] as const;

interface CockpitProps {
  exafuseUrl?: string;
  exafuseLabel?: string;
  compact?: boolean;
  defaultMode?: "example" | "blank";
}

type CockpitState = EngineeringInput;
const emptyState: CockpitState = {
  situation: "repair", details: { ...emptyProblem }, materialConfirmed: false,
  info: [], risk: [], role: null, phase: null
};
const stateFromPreset = problemFromPreset;

export default function LmdDecisionCockpit({
  exafuseUrl = DEFAULT_EXAFUSE_URL,
  exafuseLabel = DEFAULT_EXAFUSE_LABEL,
  compact = false,
  defaultMode = "example"
}: CockpitProps) {
  const defaultPresetId = defaultMode === "example" ? "worn-shaft" : null;
  const [state, setState] = useState<CockpitState>(defaultMode === "example" ? stateFromPreset("worn-shaft") : emptyState);
  const [activePresetId, setActivePresetId] = useState<string | null>(defaultPresetId);
  const [controlsExpanded, setControlsExpanded] = useState(!compact);

  useEffect(() => {
    const loadHashPreset = () => {
      const match = window.location.hash.match(/preset=([^&]+)/);
      let preset;
      try { preset = match ? getCockpitPreset(decodeURIComponent(match[1])) : undefined; }
      catch { return; }
      if (!preset) return;
      setState(stateFromPreset(preset.id));
      setActivePresetId(preset.id);
    };

    loadHashPreset();
    window.addEventListener("hashchange", loadHashPreset);
    return () => window.removeEventListener("hashchange", loadHashPreset);
  }, []);

  const result = useMemo(() => {
    const situation = situations.find((item) => item.id === state.situation) ?? situations[0];
    const brief = createEngineeringBrief(state);
    return { brief, decisionSignal: brief.preliminaryRoute, reviewReadiness: brief.reviewReadiness, toolRoute: situation.route };
  }, [state]);

  function updateDetail(key: ProblemField, value: string) {
    updateState(updateEngineeringDetail(state, key, value));
  }

  function loadPreset(id: string) {
    const preset = getCockpitPreset(id);
    if (!preset) return;
    setState(stateFromPreset(preset.id));
    setActivePresetId(preset.id);
    if (compact) setControlsExpanded(true);
  }

  function startBlank() {
    setState(emptyState);
    setActivePresetId(null);
    setControlsExpanded(true);
  }

  function updateState(nextState: CockpitState) {
    setState(nextState);
    setActivePresetId(null);
  }

  const activePreset = activePresetId ? getCockpitPreset(activePresetId) : undefined;
  const activeExampleText =
    activePreset?.id === "worn-shaft"
      ? "worn steel shaft near bearing seat."
      : activePreset?.scenario;

  return (
    <section id="lmd-decision-cockpit" className="decision-cockpit ordered-card-strong tool-app-frame scroll-mt-24 p-5 md:p-7">
      <div className="tool-window-bar mb-5">
        <div>
          <p className="metric-label">Active module</p>
          <p className="tool-window-title">Decision Cockpit</p>
        </div>
        <ul className="tool-window-status" aria-label="Decision Cockpit status">
          <li>Local session</li>
          <li>Browser-local</li>
          <li>Decision-support only</li>
        </ul>
      </div>
      <div className="tool-workbench-grid">
        <div className="tool-control-rail">
          <div className="flex flex-wrap gap-2">
            <span className="chip">LMD Decision Cockpit</span>
            <span className="chip chip--steel">LMD Decision Brief v1.0</span>
            <span className="chip chip--amber">Conservative output</span>
          </div>
          <h2 className="cockpit-title mt-4 text-3xl font-black leading-tight text-white md:text-4xl">
            Start with a rough LMD question. Leave with a brief.
          </h2>
          <p className="mt-4 text-sm leading-6 text-slate-300 md:text-base md:leading-7">
            Describe the part, the problem and the constraints. Get the questions to resolve first, a route for technical review and an editable enquiry draft. Inputs stay in this browser session only.
          </p>
          {!compact && (
            <div className="cockpit-output-modes mt-4 flex flex-wrap gap-2">
              <span className="chip chip--steel">Technical Decision Brief</span>
              <span className="chip chip--steel">Exafuse-ready email draft</span>
              <span className="chip chip--steel">AI summary</span>
            </div>
          )}

          <div className="mt-5 rounded-lg border border-cyan-300/22 bg-cyan-300/8 p-4" data-example-scenario={WORN_SHAFT_SCENARIO}>
            <ul className="flex flex-wrap gap-2" aria-label="Example controls">
              <li>
                <button
                  type="button"
                  onClick={() => loadPreset("worn-shaft")}
                  aria-pressed={Boolean(state.exampleId)}
                  aria-label="Show example: worn-shaft example"
                  className={`btn min-h-10 px-4 py-2 text-sm ${state.exampleId ? "btn-primary" : "btn-secondary"}`}
                >
                  Show example
                </button>
                <span className="sr-only">; </span>
              </li>
              <li>
                <button
                  type="button"
                  onClick={startBlank}
                  aria-pressed={!state.exampleId}
                  aria-label="Start blank: LMD Decision Brief"
                  className={`btn min-h-10 px-4 py-2 text-sm ${state.exampleId ? "btn-secondary" : "btn-primary"}`}
                >
                  {compact ? "Start your own brief" : "Start blank"}
                </button>
                <span className="sr-only">; </span>
              </li>
            </ul>
            {activePreset ? (
              <p className="mt-3 text-sm font-semibold leading-6 text-cyan-50">
                Example scenario: {activeExampleText}
              </p>
            ) : state.exampleId ? (
              <p className="mt-3 text-sm font-semibold leading-6 text-cyan-50">Modified example: sample facts remain in this brief. Replace them before sharing, or start blank for a real enquiry.</p>
            ) : (
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-300">
                Blank mode: describe your engineering problem below. The brief updates in this browser session.
              </p>
            )}
            {compact && !controlsExpanded && (
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Review the worked output, start your own brief here, or <a href={internalHref("/tools#lmd-decision-cockpit")} className="font-black text-cyan-100 hover:text-white">open the full workbench</a>.
              </p>
            )}
          </div>

          {(!compact || controlsExpanded) && <div className="mt-6 grid gap-5">
            <fieldset>
              <legend className="metric-label">1. What is the situation?</legend>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2" aria-label="Situation choices">
                {situations.map((situation) => (
                  <li key={situation.id}>
                    <button
                      type="button"
                      onClick={() => updateState({ ...state, situation: situation.id })}
                      aria-pressed={state.situation === situation.id}
                      aria-label={`Choose situation: ${situation.label}`}
                      className={`h-full w-full rounded-lg border p-3 text-left text-sm font-bold leading-5 transition ${
                        state.situation === situation.id
                          ? "border-cyan-300/70 bg-cyan-300/14 text-white"
                          : "border-white/10 bg-white/[0.035] text-slate-300 hover:border-cyan-300/35 hover:text-white"
                      }`}
                    >
                      {situation.label}
                    </button>
                    <span className="sr-only">; </span>
                  </li>
                ))}
              </ul>
            </fieldset>

            <fieldset className="grid gap-4">
              <legend className="metric-label mb-3">2. Describe the engineering problem</legend>
              <ProblemInput field="component" label="Component or process" placeholder="e.g. Drive shaft, worn bearing seat" state={state} onChange={updateDetail} />
              <ProblemInput field="goal" label="What needs to change or be decided?" placeholder="e.g. Restore the seat and compare repair with replacement" state={state} onChange={updateDetail} multiline />
              <ProblemInput field="material" label="Material grade and condition" placeholder="e.g. 42CrMo4, quenched and tempered; or leave unknown" state={state} onChange={updateDetail} />
              <Toggle label="Exact grade confirmed from a drawing, certificate or test" checked={state.materialConfirmed} onChange={(checked) => updateState({ ...state, materialConfirmed: checked })} />
              <ProblemInput field="geometry" label="Dimensions and access" placeholder="Include units, feature size and access restrictions" state={state} onChange={updateDetail} multiline />
              {state.situation === "monitoring" ?
                <ProblemInput field="signals" label="Signals and observed anomaly" placeholder="Which sensor, when, which track or layer, and what changed?" state={state} onChange={updateDetail} multiline /> :
                <ProblemInput field="scope" label={state.situation === "repair" ? "Damage depth and extent" : "Build or coating area and function"} placeholder={state.situation === "repair" ? "Extent, measured depth, cracks and previous repairs" : "Feature or coating area, thickness and intended function"} state={state} onChange={updateDetail} multiline />}
            </fieldset>

            <details className="ordered-card p-4" open>
              <summary className="min-h-11 cursor-pointer text-sm font-black text-white">3. Define requirements and supporting evidence</summary>
              <div className="mt-4 grid gap-4 border-t border-white/10 pt-4">
                <ProblemInput field="service" label={state.situation === "monitoring" ? "Machine and operating conditions" : "Service conditions"} placeholder={state.situation === "monitoring" ? "Machine, process settings, baseline and acquisition conditions" : "Loads, temperature, wear or corrosion exposure"} state={state} onChange={updateDetail} multiline />
                <ProblemInput field="requirements" label="Tolerances and surface targets" placeholder="Numerical targets, machining allowance and finishing access" state={state} onChange={updateDetail} multiline />
                <ProblemInput field="inspection" label="Inspection and acceptance requirements" placeholder="Required checks, acceptance criteria and responsible reviewer" state={state} onChange={updateDetail} multiline />
                <ProblemInput field="delivery" label="Quantity, target date and downtime" placeholder="e.g. 2 parts, needed by 30 November; two-week shutdown" state={state} onChange={updateDetail} />
                <fieldset>
                  <legend className="text-sm font-bold text-white">Files available to share separately</legend>
                  <p className="mt-1 text-sm leading-6 text-slate-400">No files are uploaded here. Mark only what you can include with your enquiry.</p>
                  <div className="mt-3 grid gap-2">
                    {infoOptions.map(([id, label]) => <Toggle key={id} label={label} checked={state.info.includes(id)} onChange={(checked) => updateState({ ...state, info: checked ? [...state.info, id] : state.info.filter((item) => item !== id) })} />)}
                  </div>
                </fieldset>
              </div>
            </details>

            <details className="ordered-card p-4">
              <summary className="flex min-h-11 items-center justify-between gap-3 text-sm font-black text-white">
                <span>4. What is the risk?</span>
                <span className="chip chip--amber">{state.risk.length}/{riskOptions.length} flagged</span>
              </summary>
              <fieldset className="mt-4 border-t border-white/10 pt-4">
                <legend className="sr-only">What is the risk?</legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {riskOptions.map(([id, label]) => (
                    <Toggle
                      key={id}
                      label={label}
                      checked={state.risk.includes(id)}
                      onChange={(checked) =>
                        updateState({
                          ...state,
                          risk: checked ? [...state.risk, id] : state.risk.filter((item) => item !== id)
                        })
                      }
                      risk
                    />
                  ))}
                </div>
              </fieldset>
            </details>

            <details className="ordered-card p-4" data-review-context>
              <summary className="flex min-h-11 items-center justify-between gap-3 text-sm font-black text-white">
                <span>5. What is the review context? <span className="font-semibold text-slate-400">Optional</span></span>
                <span className="chip chip--steel">{Number(Boolean(state.role)) + Number(Boolean(state.phase))}/2 marked</span>
              </summary>
              <div className="mt-4 grid gap-5 border-t border-white/10 pt-4">
                <fieldset>
                  <legend className="text-sm font-bold text-white">Who is preparing the brief?</legend>
                  <p className="mt-1 text-xs leading-5 text-slate-400">This only gives the reviewer context; it does not change technical evidence requirements.</p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {REVIEW_ROLE_OPTIONS.map((option) => (
                      <Toggle
                        key={option.id}
                        label={option.label}
                        checked={state.role === option.id}
                        inputType="radio"
                        name="review-role"
                        onChange={(checked) => checked && updateState({ ...state, role: option.id })}
                      />
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="text-sm font-bold text-white">What needs to happen next?</legend>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {REVIEW_PHASE_OPTIONS.map((option) => (
                      <Toggle
                        key={option.id}
                        label={option.label}
                        checked={state.phase === option.id}
                        inputType="radio"
                        name="review-phase"
                        onChange={(checked) => checked && updateState({ ...state, phase: option.id })}
                      />
                    ))}
                  </div>
                </fieldset>
                {(state.role || state.phase) && (
                  <button
                    type="button"
                    className="btn btn-secondary w-fit"
                    onClick={() => updateState({ ...state, role: null, phase: null })}
                  >
                    Clear optional context
                  </button>
                )}
              </div>
            </details>

            {!compact && (
              <div>
                <p className="metric-label">Example presets</p>
                <ul className="mt-3 flex flex-wrap gap-2" aria-label="Example presets">
                  {COCKPIT_PRESETS.map((preset) => (
                    <li key={preset.id}>
                      <button
                        type="button"
                        onClick={() => loadPreset(preset.id)}
                        aria-pressed={activePresetId === preset.id}
                        aria-label={`Load example preset: ${preset.label}`}
                        className={`btn min-h-10 px-4 py-2 text-sm ${activePresetId === preset.id ? "btn-primary" : "btn-secondary"}`}
                      >
                        {preset.label}
                      </button>
                      <span className="sr-only">; </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <ul className="flex flex-wrap gap-3" aria-label="Cockpit utility links">
              <li>
                <button type="button" onClick={startBlank} className="btn btn-secondary">
                  Reset blank
                </button>
                <span className="sr-only">; </span>
              </li>
              <li>
                <a href={internalHref("/demo")} className="btn btn-secondary">
                  90-second demo
                </a>
                <span className="sr-only">; </span>
              </li>
              <li>
                <a href={internalHref("/brief-template")} className="btn btn-secondary">
                  Brief template
                </a>
                <span className="sr-only">; </span>
              </li>
            </ul>
          </div>}
        </div>

        <p className="sr-only" aria-live="polite">
          {result.decisionSignal} {result.reviewReadiness}. Missing information and risk flags remain visible in the brief.
        </p>
        <aside className="ordered-card tool-output-rail h-fit p-5 md:p-6" aria-label={OUTPUT_BOUNDARY_LABELS.join(" / ")}>
          <div className="tool-pane-heading mb-5">
            <p className="metric-label">Output pane</p>
            <p className="tool-pane-title">Engineering review brief</p>
            <p className="tool-pane-copy">Your entered facts and open questions stay together in the copied brief and email draft.</p>
          </div>
          {compact && !controlsExpanded ? <DecisionBriefCard
            brief={result.brief as DecisionBrief}
            eyebrow="Cockpit output" title={result.brief.briefVersion}
            matchingToolHref={activePresetId ? `/tools/#preset=${activePresetId}` : undefined}
            compact
          /> : <EngineeringBriefPanel brief={result.brief} exafuseUrl={exafuseUrl} exafuseLabel={exafuseLabel} />}

        </aside>
      </div>
    </section>
  );
}

function Toggle({
  label,
  checked,
  onChange,
  risk = false,
  inputType = "checkbox",
  name
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  risk?: boolean;
  inputType?: "checkbox" | "radio";
  name?: string;
}) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm font-semibold leading-5 transition ${
        checked
          ? risk
            ? "border-orange-300/55 bg-orange-500/12 text-orange-50"
            : "border-cyan-300/55 bg-cyan-300/10 text-white"
          : "border-white/10 bg-white/[0.035] text-slate-300 hover:border-white/20 hover:text-white"
      }`}
    >
      <input
        type={inputType}
        name={name}
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 accent-cyan-300"
      />
      <span>{label}<span className="sr-only">; </span></span>
    </label>
  );
}

function ProblemInput({ field, label, placeholder, state, onChange, multiline = false }: {
  field: ProblemField; label: string; placeholder: string; state: CockpitState;
  onChange: (field: ProblemField, value: string) => void; multiline?: boolean;
}) {
  const className = "mt-2 w-full min-w-0 rounded-lg border border-white/20 bg-slate-950 p-3 text-base leading-6 text-white placeholder:text-slate-500 focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/40";
  return <label className="block min-w-0 text-sm font-bold text-slate-200">
    {label}
    {multiline ? <textarea rows={3} maxLength={1500} value={state.details[field]} onChange={(event) => onChange(field, event.target.value)} placeholder={placeholder} className={className} /> :
      <input type="text" maxLength={500} value={state.details[field]} onChange={(event) => onChange(field, event.target.value)} placeholder={placeholder} className={className} />}
  </label>;
}
