import React from "react";
import ResultBar from "../components/ResultBar";

function Summary({ questions, results }) {
  const handleShare = async () => {
    const currentUrl = window.location.href;

    if (navigator.share) {
      // 모바일 등에서 Web Share API 지원 시
      try {
        await navigator.share({
          title: "밸런스 게임 결과",
          text: "내 밸런스 게임 결과를 공유합니다.",
          url: currentUrl,
        });
      } catch (err) {
        console.log("공유 취소 or 에러:", err);
      }
    } else {
      // PC 등 Web Share API 미지원 환경
      // URL 클립보드로 복사
      try {
        await navigator.clipboard.writeText(currentUrl);
        alert("URL이 복사되었습니다. 친구에게 공유해보세요!");
      } catch (err) {
        alert("URL 복사 실패. 수동으로 복사해주세요.");
      }
    }
  };

  return (
    <div className="home-container">
      <h2 className="summary-title">전체 결과 요약</h2>

      {questions.map((q) => {
        const stats = results[q.id] || { A: 0, B: 0 };
        const total = stats.A + stats.B;

        return (
          <div key={q.id} className="question-card fade-in" style={{ marginBottom: "1rem" }}>
            <h3 className="question-title" style={{ marginBottom: "0.8rem" }}>{q.title}</h3>
            {total === 0 ? (
              <p>아직 투표가 없습니다.</p>
            ) : (
              <div className="results">
                <ResultBar label={q.optionA} votes={stats.A} total={total} color="#3498db" />
                <ResultBar label={q.optionB} votes={stats.B} total={total} color="#e67e22" />
              </div>
            )}
          </div>
        );
      })}

      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <button className="next-btn" onClick={handleShare}>
          결과 공유하기
        </button>
      </div>
    </div>
  );
}

export default Summary;
