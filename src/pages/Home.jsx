// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import questionsData from "../data/questions.json";
import ProgressBar from "../components/ProgressBar";
import QuestionView from "../components/QuestionView";
import Summary from "./Summary";

function Home() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState({});
  const [showSummary, setShowSummary] = useState(false);

  // 애니메이션 관련 상태
  // currentCardClass: "slide-in-right", "slide-out-left", 등
  const [currentCardClass, setCurrentCardClass] = useState("slide-in-right");

  useEffect(() => {
    setQuestions(questionsData);
  }, []);

  const handleSelect = (questionId, choice) => {
    setResults((prev) => {
      const currentStats = prev[questionId] || { A: 0, B: 0 };
      if (choice === "A") {
        return {
          ...prev,
          [questionId]: { A: currentStats.A + 1, B: currentStats.B },
        };
      }
      return {
        ...prev,
        [questionId]: { A: currentStats.A, B: currentStats.B + 1 },
      };
    });
  };

  // '다음 질문' 눌렀을 때 슬라이드 아웃 → 인덱스 변경 → 슬라이드 인
  const handleNext = () => {
    // 마지막 질문이면 요약
    if (currentIndex >= questions.length - 1) {
      setShowSummary(true);
      return;
    }
    // 1) 슬라이드 아웃 클래스로 변경
    setCurrentCardClass("slide-out-left");
    // 2) 약간의 시간 후 인덱스 변경 + 다시 슬라이드 인
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setCurrentCardClass("slide-in-right");
    }, 300); // CSS 애니메이션 시간과 맞춤
  };

  if (showSummary) {
    return <Summary questions={questions} results={results} />;
  }
  if (questions.length === 0) return <div>Loading...</div>;

  const currentQuestion = questions[currentIndex];
  const currentStats = results[currentQuestion.id] || { A: 0, B: 0 };
  const isLast = currentIndex === questions.length - 1;

  return (
    <div className="home-container">
      <ProgressBar current={currentIndex + 1} total={questions.length} />

      <QuestionView
        question={currentQuestion}
        stats={currentStats}
        onSelect={handleSelect}
        onNext={handleNext}
        isLast={isLast}
        animationClass={currentCardClass} // 새로운 prop
      />
    </div>
  );
}

export default Home;
