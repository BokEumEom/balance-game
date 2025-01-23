import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import QuestionView from "../components/QuestionView";
import ThemeSelector from "../components/ThemeSelector";

import { daily } from "../data/daily";
import { food } from "../data/food";
import { games } from "../data/games";
import { psychology } from "../data/psychology";
import { imagination } from "../data/imagination";

function Home() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState({});
  const [showThemeSelector, setShowThemeSelector] = useState(true);
  const [currentCardClass, setCurrentCardClass] = useState("slide-in-right");
  const navigate = useNavigate();

  const handleSelectTheme = (themeId) => {
    const themeData = getThemeData(themeId);
    setQuestions(themeData);
    setShowThemeSelector(false);
    setCurrentIndex(0);
  };

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
        return food;
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
      const shareKey = `share_${Date.now()}`;
      sessionStorage.setItem(
        shareKey,
        JSON.stringify({ results, questions })
      );
      navigate(`/summary?key=${shareKey}`);
      return;
    }
    setCurrentCardClass("slide-out-left");
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setCurrentCardClass("slide-in-right");
    }, 300);
  };

  if (showThemeSelector) {
    return <ThemeSelector onSelectTheme={handleSelectTheme} />;
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