import ResultBar from "./ResultBar";

/**
 * QuestionView 컴포넌트
 * @param {Object} question - 현재 질문 객체 (id, title, optionA, optionB, imageA, imageB)
 * @param {Object} stats - 현재 질문의 통계 데이터 (A, B 선택지의 투표 수)
 * @param {Function} onSelect - 선택지 클릭 시 호출되는 함수 (questionId, choice)
 * @param {Function} onNext - 다음 질문으로 이동하는 함수
 * @param {boolean} isLast - 현재 질문이 마지막인지 여부
 * @param {string} animationClass - 애니메이션 클래스 (slide-in-right, slide-out-left 등)
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

  // 선택지 클릭 시 애니메이션과 함께 다음 질문으로 이동
  const handleChoiceClick = (choice) => {
    onSelect(question.id, choice); // 선택지 저장
    setTimeout(() => {
      onNext(); // 다음 질문으로 이동
    }, 300); // 애니메이션 시간과 동기화
  };

  return (
    <div className={`question-card ${animationClass}`}>
      <h2 className="question-title">{question.title}</h2>

      {!isAnswered ? (
        <div className="choices">
          <button
            className="choice-btn"
            onClick={() => handleChoiceClick("A")}
            aria-label={`선택지 A: ${question.optionA}`}
          >
            <img
              src={question.imageA}
              alt={question.optionA}
              className="choice-image"
            />
            <span>{question.optionA}</span>
          </button>
          <span className="vs">VS</span>
          <button
            className="choice-btn"
            onClick={() => handleChoiceClick("B")}
            aria-label={`선택지 B: ${question.optionB}`}
          >
            <img
              src={question.imageB}
              alt={question.optionB}
              className="choice-image"
            />
            <span>{question.optionB}</span>
          </button>
        </div>
      ) : (
        <div className="results">
          <ResultBar
            label={`${question.optionA} (${((stats.A / total) * 100).toFixed(1)}%)`}
            votes={stats.A}
            total={total}
            color="#3498db"
          />
          <ResultBar
            label={`${question.optionB} (${((stats.B / total) * 100).toFixed(1)}%)`}
            votes={stats.B}
            total={total}
            color="#e67e22"
          />

          {!isLast && (
            <button className="next-btn" onClick={onNext}>
              다음 질문
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default QuestionView;