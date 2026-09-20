import { useState } from "react";
import type { Rule } from "../types";

interface FindingCardProps {
  rule: Rule;
  confirmed: boolean;
  gateQuestion?: string;
}

/** One ranked finding. Unconfirmed findings stay visible, down-weighted and
 * labeled. An unanswered context question never silently hides a rule. */
export function FindingCard({ rule, confirmed, gateQuestion }: FindingCardProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="finding">
      <button type="button" className="finding-head" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span className={`sev ${rule.severity}`}>{rule.severity}</span>
        <span className="finding-title">{rule.title}</span>
        <span className={`confirm-tag ${confirmed ? "" : "unconfirmed"}`}>
          {confirmed ? "confirmed" : "unconfirmed ×0.6"}
        </span>
      </button>
      {open && (
        <div className="finding-body">
          <div className="finding-ref">{rule.ref}</div>
          <dl>
            <dt>Trigger</dt>
            <dd>{rule.trigger}</dd>
            <dt>What a reviewer checks</dt>
            <dd>{rule.looksFor}</dd>
            <dt>Usual fix</dt>
            <dd>{rule.fix}</dd>
          </dl>
          {!confirmed && gateQuestion && (
            <div className="gap-note">
              <b>Why this is unconfirmed:</b> &ldquo;{gateQuestion}&rdquo; wasn&rsquo;t answered.
              The finding still appears, at reduced weight, instead of disappearing.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
