import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Summary from "./pages/Summary";

const App = () => {
  const handleRestart = () => {
    // 세션 스토리지 초기화 (필요한 경우)
    sessionStorage.clear();
    // 홈으로 이동
    window.location.href = "/";
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/summary"
          element={<Summary onRestart={handleRestart} />}
        />
      </Routes>
    </Router>
  );
};

export default App;