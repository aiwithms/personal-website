import type { DecisionBrief } from "../lib/decisionBrief";
import DecisionBriefExport from "./DecisionBriefExport";

export default function EngineeringBriefPanel({ brief, exafuseUrl, exafuseLabel }: {
  brief: DecisionBrief; exafuseUrl?: string; exafuseLabel?: string;
}) {
  return <div className="print-brief grid min-w-0 gap-6 break-words" data-brief-version={brief.briefVersion}>
    <div>
      <p className="metric-label">{brief.briefVersion}</p>
      <h3 className="mt-2 text-2xl font-black text-white">Your technical enquiry</h3>
      <p className="mt-3 text-base font-bold text-cyan-100">{brief.reviewReadiness}</p>
      <p className="mt-2 text-sm leading-6 text-slate-400">This describes the enquiry's completeness. It does not establish manufacturing feasibility.</p>
    </div>
    <section>
      <h4 className="text-sm font-bold text-white">Decision signal</h4>
      <p className="mt-2 text-base leading-7 text-slate-200">{brief.preliminaryRoute}</p>
    </section>
    <section className="rounded-lg border border-cyan-300/25 bg-cyan-300/5 p-4">
      <h4 className="text-sm font-bold text-cyan-100">Next action</h4>
      <p className="mt-2 text-base leading-7 text-white">{brief.nextAction}</p>
    </section>
    <section>
      <h4 className="text-sm font-bold text-white">Missing information</h4>
      <QuestionList title="Top 3 critical gaps" items={brief.missingCritical.slice(0, 3)} empty="No missing critical fields detected. A reviewer must still verify the entered specifications." />
      {brief.missingCritical.length > 3 && <details className="mt-3">
        <summary className="cursor-pointer py-2 text-sm font-bold text-cyan-100">Show {brief.missingCritical.length - 3} more critical questions</summary>
        <QuestionList title="Remaining critical gaps" items={brief.missingCritical.slice(3)} />
      </details>}
      <QuestionList title="Useful gaps" items={brief.missingUseful} empty="No additional fields requested." />
      {brief.missingOptional.length > 0 && <QuestionList title="Optional context" items={brief.missingOptional} />}
    </section>
    <QuestionList title="Top 3 risk flags" items={brief.riskFlags.slice(0, 3)} empty="No risk flags selected. This does not establish that the part is low risk." />
    {brief.riskFlags.length > 3 && <QuestionList title="Further risk flags" items={brief.riskFlags.slice(3)} />}
    <DecisionBriefExport brief={brief} exafuseUrl={exafuseUrl} exafuseLabel={exafuseLabel} engineerMode />
    <details className="border-t border-white/10 pt-4" open>
      <summary className="cursor-pointer py-2 text-sm font-black text-white">Review the facts carried into your enquiry</summary>
      <p className="mt-2 text-sm leading-6 text-slate-400">Entered by the preparer; supporting files have not been reviewed.</p>
      <QuestionList title="Known facts" items={brief.knownFacts} empty="Describe the part and your engineering question to begin." />
      <QuestionList title="Available data" items={brief.availableData} empty="No supporting files marked available." />
    </details>
    <details className="border-t border-white/10 pt-4">
      <summary className="cursor-pointer py-2 text-sm font-black text-white">Evidence needed and brief details</summary>
      <QuestionList title="Evidence needed" items={brief.evidenceNeeded} />
      <dl className="mt-4 grid gap-3 text-sm leading-6">
        <div><dt className="font-bold text-white">Expert-review package status</dt><dd className="text-slate-300">{brief.expertReviewPackageStatus}</dd></div>
        <div><dt className="font-bold text-white">Evidence burden</dt><dd className="text-slate-300">{brief.evidenceBurden}. {brief.evidenceBurdenNote}</dd></div>
        <div><dt className="font-bold text-white">Prepared for</dt><dd className="text-slate-300">{brief.preparedFor}</dd></div>
        <div><dt className="font-bold text-white">Not valid for</dt><dd className="text-slate-300">{brief.notValidFor.join(", ")}</dd></div>
      </dl>
    </details>
    <p className="text-sm leading-6 text-slate-400">{brief.boundaryStatement} {brief.noBackendNote}</p>
  </div>;
}

function QuestionList({ title, items, empty }: { title: string; items: string[]; empty?: string }) {
  return <div className="mt-3">
    <h4 className="text-sm font-bold text-white">{title}</h4>
    {items.length ? <ul className="mt-2 list-disc space-y-2 pl-5 text-base leading-7 text-slate-300">
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul> : <p className="mt-2 text-sm leading-6 text-slate-400">{empty}</p>}
  </div>;
}
