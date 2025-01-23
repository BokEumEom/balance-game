import { useState } from "react";
import ProgressBar from "../components/ProgressBar";
import QuestionView from "../components/QuestionView";
import Summary from "./Summary";
import ThemeSelector from "../components/ThemeSelector"; // 테마 선택 컴포넌트 추가

function Home() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(true); // 테마 선택 화면 표시 상태
  const [currentCardClass, setCurrentCardClass] = useState("slide-in-right");

  // 테마 선택 시 호출되는 함수
  const handleSelectTheme = async (themeId) => {
    try {
      // 테마별 데이터 동적 불러오기
      const themeData = await import(`../data/${getThemeFileName(themeId)}`);
      setQuestions(themeData.questions); // 선택된 테마의 질문 데이터 설정
      setShowThemeSelector(false); // 테마 선택 화면 숨기기
      setCurrentIndex(0); // 첫 질문으로 초기화
    } catch (error) {
      console.error("테마 데이터를 불러오는 중 오류 발생:", error);
    }
  };

  // 테마 ID를 기반으로 파일 이름 반환
  const getThemeFileName = (themeId) => {
    switch (themeId) {
      case 1:
        return "food.json";
      case 2:
        return "game.json";
      case 3:
        return "daily.json";
      case 4:
        return "psychology.json";
      case 5:
        return "imagination.json";
      default:
        return "food.json"; // 기본값
    }
  };

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

  const handleNext = () => {
    if (currentIndex >= questions.length - 1) {
      setShowSummary(true);
      return;
    }
    setCurrentCardClass("slide-out-left");
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setCurrentCardClass("slide-in-right");
    }, 300);
  };

  // 테마 선택 화면 표시
  if (showThemeSelector) {
    return <ThemeSelector onSelectTheme={handleSelectTheme} />;
  }

  // 요약 화면 표시
  if (showSummary) {
    return <Summary questions={questions} results={results} />;
  }

  // 질문 데이터 로딩 중
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