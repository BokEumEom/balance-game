import { useState } from "react";
import ProgressBar from "../components/ProgressBar";
import QuestionView from "../components/QuestionView";
import Summary from "./Summary";
import ThemeSelector from "../components/ThemeSelector";

// 정적 데이터 불러오기
import { daily } from "../data/daily"; // `daily` 명시적으로 가져오기
import { food } from "../data/food";
import { games } from "../data/games";
import { psychology } from "../data/psychology";
import { imagination } from "../data/imagination";

function Home() {
  const [questions, setQuestions] = useState([]); // 현재 질문 데이터
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 질문 인덱스
  const [results, setResults] = useState({}); // 사용자 선택 결과
  const [showSummary, setShowSummary] = useState(false); // 요약 화면 표시 여부
  const [showThemeSelector, setShowThemeSelector] = useState(true); // 테마 선택 화면 표시 여부
  const [currentCardClass, setCurrentCardClass] = useState("slide-in-right"); // 애니메이션 클래스

  // 테마 선택 시 호출되는 함수
  const handleSelectTheme = (themeId) => {
    const themeData = getThemeData(themeId); // 테마 데이터 가져오기
    setQuestions(themeData); // 선택된 테마의 질문 데이터 설정
    setShowThemeSelector(false); // 테마 선택 화면 숨기기
    setCurrentIndex(0); // 첫 질문으로 초기화
  };

  // 테마 ID를 기반으로 정적 데이터 반환
  const getThemeData = (themeId) => {
    switch (themeId) {
      case 1:
        return food;
      case 2:
        return games;
      case 3:
        return daily;
      case 4:
        return psychology;
      case 5:
        return imagination;
      default:
        return food; // 기본값
    }
  };

  // 사용자 선택 처리 함수
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

  // 다음 질문으로 이동하는 함수
  const handleNext = () => {
    if (currentIndex >= questions.length - 1) {
      setShowSummary(true); // 요약 화면 표시
      return;
    }
    setCurrentCardClass("slide-out-left"); // 애니메이션 설정
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1); // 다음 질문으로 이동
      setCurrentCardClass("slide-in-right"); // 애니메이션 설정
    }, 300); // 애니메이션 시간과 동기화
  };

  if (showThemeSelector) {
    return <ThemeSelector onSelectTheme={handleSelectTheme} />;
  }

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
        animationClass={currentCardClass}
      />
    </div>
  );
}

export default Home;
