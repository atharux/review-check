import { useMemo, useState } from "react";
import { ContextRow } from "./components/ContextRow";
import { ScreenChip } from "./components/ScreenChip";
import { FindingCard } from "./components/FindingCard";
import { CONTEXT_QUESTIONS, RULES, EXAMPLE_SCREENS, CLASSIFIER_KEYWORDS } from "./data";
import type { ContextAnswer } from "./types";

const SEVERITY_WEIGHT = { blocker: 10, likely: 6, watch: 3 };

export default function App() {
  const [answers, setAnswers] = useState<Record<string, ContextAnswer>>({});

  const screenTypes = useMemo(() => new Set(EXAMPLE_SCREENS.map((s) => s.type)), []);

  const findings = useMemo(() => {
    return RULES.filter((rule) => {
      const applies =
        rule.appliesTo === "*" || rule.appliesTo.some((t) => screenTypes.has(t));
      if (!applies) return false;
      if (rule.gatedBy && answers[rule.gatedBy] === "no") return false;
      return true;
    })
      .map((rule) => {
        const confirmed = !rule.gatedBy || answers[rule.gatedBy] === "yes";
        const score = SEVERITY_WEIGHT[rule.severity] * (confirmed ? 1 : 0.6);
        return { rule, confirmed, score };
      })
      .sort((a, b) => b.score - a.score);
  }, [answers, screenTypes]);

  const confirmedCount = findings.filter((f) => f.confirmed).length;

  return (
    <div className="wrap">
      <header>
        <div className="kicker">
          <span className="dot" aria-hidden="true" /> OPEN-SOURCE STARTER · NOT THE FULL AUDIT
        </div>
        <h1>Review Check</h1>
        <p className="thesis">
          A deterministic engine for pre-submission App Store audits: screenshots get typed,
          context gates decide which rules apply, and an unanswered question down-weights a
          finding instead of hiding it.
        </p>

        <ul className="mentalmap">
          <li><span className="mm-n">1</span> Answer a few questions about the app</li>
          <li><span className="mm-n">2</span> Screenshots get typed automatically</li>
          <li><span className="mm-n">3</span> Findings rank by severity, gaps stay visible</li>
        </ul>
      </header>

      <div className="step-label">STEP 1 · CONTEXT</div>
      <div className="panel context-list">
        {CONTEXT_QUESTIONS.map((q) => (
          <ContextRow
            key={q.key}
            question={q.question}
            answer={answers[q.key] ?? null}
            onAnswer={(a) => setAnswers((prev) => ({ ...prev, [q.key]: a }))}
          />
        ))}
      </div>

      <div className="step-label">STEP 2 · SCREENS</div>
      <div className="panel">
        <p className="hood-note" style={{ marginBottom: 14 }}>
          Example filenames, typed by keyword. No real screenshots are uploaded in this demo.
        </p>
        <div className="screen-grid">
          {EXAMPLE_SCREENS.map((s) => (
            <ScreenChip key={s.filename} filename={s.filename} type={s.type} />
          ))}
        </div>
      </div>

      <div className="step-label">
        STEP 3 · FINDINGS ({confirmedCount}/{findings.length} confirmed)
      </div>
      <div className="finding-list">
        {findings.map((f) => (
          <FindingCard
            key={f.rule.id}
            rule={f.rule}
            confirmed={f.confirmed}
            gateQuestion={f.rule.gatedBy ? CONTEXT_QUESTIONS.find((q) => q.key === f.rule.gatedBy)?.question : undefined}
          />
        ))}
      </div>

      <details className="hood" style={{ marginTop: 28 }}>
        <summary>
          Under the hood <span className="hood-note" style={{ margin: 0 }}>classifier + scoring</span>
        </summary>
        <div className="hood-body">
          <p className="hood-note">
            Screen type comes from filename keywords. A real tool would look at the image too, but
            keyword matching is the baseline this starts from:
          </p>
          <table className="kwtable">
            <thead>
              <tr><th>Type</th><th>Keywords</th></tr>
            </thead>
            <tbody>
              {Object.entries(CLASSIFIER_KEYWORDS).map(([type, kw]) => (
                <tr key={type}><td>{type}</td><td>{kw}</td></tr>
              ))}
            </tbody>
          </table>
          <p className="hood-note" style={{ marginTop: 16 }}>
            Severity score: blocker = 10, likely = 6, watch = 3, &times; 0.6 if the finding's
            gating question was never answered. Findings are ranked by that score. Confirmed
            blockers float to the top; unconfirmed ones stay visible, lower.
          </p>
        </div>
      </details>

      <div className="cta">
        <p>
          This ships with 6 illustrative rules, written fresh for this demo. It is not the real
          rule set. The paid audit runs against 27+ rules built from real client rejections, each
          carrying its own verified/stale field so nothing stale reaches a client report.{" "}
          <a href="https://appreview.atharux.com" target="_blank" rel="noopener noreferrer">
            appreview.atharux.com
          </a>
        </p>
      </div>

      <footer>
        <p>
          Guideline references point at the public App Store Review Guidelines and Human
          Interface Guidelines. Wording here is original, not quoted from Apple's text. This is
          an interaction-design prototype for a pre-submission audit workflow, not an
          official Apple tool, and passing it is not a guarantee of App Store approval.
        </p>
      </footer>
    </div>
  );
}
