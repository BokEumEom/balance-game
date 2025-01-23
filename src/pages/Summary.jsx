import ResultBar from "../components/ResultBar";
import { shareResults } from "../utils/share";

/**
 * Summary 컴포넌트
 * @param {Array} questions - 모든 질문 배열
 * @param {Object} results - 모든 질문의 결과 데이터 (questionId: { A: number, B: number })
 * @param {Function} onRestart - 다시 시작하기 버튼 클릭 시 호출되는 함수
 */
function Summary({ questions, results, onRestart }) {
  // 결과 공유 함수
  const handleShare = () => {
    shareResults(results);
  };

  // 성향 분석 함수 (예시)
  const analyzeTendency = () => {
    const totalQuestions = questions.length;
    let matchCount = 0;

    questions.forEach((q) => {
      const stats = results[q.id] || { A: 0, B: 0 };
      const total = stats.A + stats.B;
      if (total > 0) {
        const userChoice = stats.A > stats.B ? "A" : "B";
        if (userChoice === "A") matchCount++;
      }
    });

    const matchPercentage = ((matchCount / totalQuestions) * 100).toFixed(1);
    return `당신은 대중적 선택과 ${matchPercentage}% 일치합니다!`;
  };

  return (
    <div className="summary-container">
      <h2 className="summary-title">전체 결과 요약</h2>

      {/* 성향 분석 결과 표시 */}
      <div className="tendency-analysis">
        <p>{analyzeTendency()}</p>
      </div>

      {/* 각 질문의 결과 표시 */}
      {questions.map((q) => {
        const stats = results[q.id] || { A: 0, B: 0 };
        const total = stats.A + stats.B;

        return (
          <div key={q.id} className="question-card fade-in">
            <h3 className="question-title">{q.title}</h3>
            {total === 0 ? (
              <div className="no-votes">
                <p>아직 투표가 없습니다.</p>
              </div>
            ) : (
              <div className="results">
                <ResultBar
                  label={`${q.optionA} (${((stats.A / total) * 100).toFixed(1)}%)`}
                  votes={stats.A}
                  total={total}
                  color="#3498db"
                />
                <ResultBar
                  label={`${q.optionB} (${((stats.B / total) * 100).toFixed(1)}%)`}
                  votes={stats.B}
                  total={total}
                  color="#e67e22"
                />
              </div>
            )}
          </div>
        );
      })}

      {/* 버튼 그룹 (결과 공유 및 다시 시작) */}
      <div className="button-group">
        <button className="share-btn" onClick={handleShare}>
          결과 공유하기
        </button>
      </div>
    </div>
  );
}

export default Summary;