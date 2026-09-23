import { formatTechnicalDecisionBrief } from "./decisionBrief";
import type { DecisionBrief } from "./decisionBrief";

export function briefPrintDocument(brief: DecisionBrief) {
  const text = formatTechnicalDecisionBrief(brief).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>LMD Decision Brief</title><style>@page{margin:18mm}body{color:#111;background:#fff;font:11pt/1.5 Arial,sans-serif}pre{font:inherit;white-space:pre-wrap;overflow-wrap:anywhere}</style></head><body><pre>${text}</pre></body></html>`;
}

export function printDecisionBrief(brief: DecisionBrief) {
  document.getElementById("selected-brief-print-frame")?.remove();
  const frame = document.createElement("iframe");
  frame.id = "selected-brief-print-frame";
  frame.title = "Print selected LMD Decision Brief";
  frame.setAttribute("aria-hidden", "true");
  frame.style.cssText = "position:fixed;width:0;height:0;border:0;bottom:0;right:0";
  frame.onload = () => {
    const target = frame.contentWindow;
    if (!target) return;
    target.addEventListener("afterprint", () => frame.remove(), { once: true });
    target.focus();
    target.print();
  };
  frame.srcdoc = briefPrintDocument(brief);
  document.body.appendChild(frame);
}
