import type { ContextAnswer } from "../types";

interface ContextRowProps {
  question: string;
  answer: ContextAnswer;
  onAnswer: (answer: ContextAnswer) => void;
}

/** One yes/no context question. Leaving it unanswered is a valid, honest state —
 * it doesn't force a guess, it just down-weights and labels whatever depends on it. */
export function ContextRow({ question, answer, onAnswer }: ContextRowProps) {
  return (
    <div className="context-row">
      <p>{question}</p>
      <div className="answer-group">
        <button
          type="button"
          className={`answer-btn ${answer === "yes" ? "active-yes" : ""}`}
          aria-pressed={answer === "yes"}
          onClick={() => onAnswer(answer === "yes" ? null : "yes")}
        >
          Yes
        </button>
        <button
          type="button"
          className={`answer-btn ${answer === "no" ? "active-no" : ""}`}
          aria-pressed={answer === "no"}
          onClick={() => onAnswer(answer === "no" ? null : "no")}
        >
          No
        </button>
      </div>
    </div>
  );
}
