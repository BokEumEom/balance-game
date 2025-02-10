import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="balance-header">
      <div className="balance-header-container">
        {/* 데스크탑에서는 로고 영역 표시, 모바일에서는 CSS 미디어 쿼리로 숨김 */}
        <div className="logo" onClick={() => navigate("/")}>
          <img src="/assets/logo.png" alt="밸런스 게임" className="logo-img" />
          <h1>밸런스 게임</h1>
        </div>
        <nav className="nav">
          <ul>
            <li>
              <Link to="/">홈</Link>
            </li>
            {/* 필요시 추가 메뉴 항목을 여기에 추가 */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
