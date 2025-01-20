// src/components/QuestionView.jsx
import React from "react";
import ResultBar from "./ResultBar";

/**
 * @param question
 * @param stats
 * @param onSelect
 * @param onNext
 * @param isLast
 * @param animationClass (slide-in-right, slide-out-left 등)
 */
function QuestionView({
  question,
  stats,
  onSelect,
  onNext,
  isLast,
  animationClass,
}) {
  const total = stats.A + stats.B;
  const isAnswered = total > 0;

  return (
    <div className={`question-card ${animationClass}`}>
      <h2 className="question-title">{question.title}</h2>

      {!isAnswered ? (
        <div className="choices">
          <button
            className="choice-btn"
            onClick={() => onSelect(question.id, "A")}
          >
            {question.optionA}
          </button>
          <span className="vs">VS</span>
          <button
            className="choice-btn"
            onClick={() => onSelect(question.id, "B")}
          >
            {question.optionB}
          </button>
        </div>
      ) : (
        <div className="results">
          <ResultBar
            label={question.optionA}
            votes={stats.A}
            total={total}
            color="#3498db"
          />
          <ResultBar
            label={question.optionB}
            votes={stats.B}
            total={total}
            color="#e67e22"
          />

          <button className="next-btn" onClick={onNext}>
            {isLast ? "결과 보기" : "다음 질문"}
          </button>
        </div>
      )}
    </div>
  );
}

export default QuestionView;
