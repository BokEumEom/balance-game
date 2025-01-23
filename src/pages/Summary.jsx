import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ResultBar from "../components/ResultBar";
import { shareResults } from "../utils/share";

function Summary({ onRestart }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState({});
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const key = searchParams.get("key");

    if (key) {
      const savedData = sessionStorage.getItem(key);
      if (savedData) {
        const { results, questions } = JSON.parse(savedData);
        setResults(results);
        setQuestions(questions);
      } else {
        alert("유효하지 않은 데이터 키입니다.");
        navigate("/");
      }
    } else {
      alert("유효하지 않은 링크입니다.");
      navigate("/");
    }
    setLoading(false);
  }, [location, navigate]);

  const handleShare = async () => {
    try {
      const searchParams = new URLSearchParams(location.search);
      const key = searchParams.get("key");
      if (!key) throw new Error("유효하지 않은 공유 키입니다.");

      await shareResults(key);
    } catch (err) {
      console.error("결과 공유 중 오류 발생:", err);
      alert("결과를 공유하는 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  };

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

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="summary-container">
      <h2 className="summary-title">전체 결과 요약</h2>

      <div className="tendency-analysis">
        <p>{analyzeTendency()}</p>
      </div>

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

      <div className="button-group">
        <button className="share-btn" onClick={handleShare}>
          결과 공유하기
        </button>
        <button className="restart-btn" onClick={onRestart}>
          다시 하기
        </button>
      </div>
    </div>
  );
}

export default Summary;