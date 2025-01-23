import themes from "../data/themes"; // themes.js 기본 내보내기 불러오기

function ThemeSelector({ onSelectTheme, selectedThemeId }) {
  return (
    <div className="theme-selector">
      <h2 className="theme-title">테마를 선택하세요</h2>
      <div className="theme-list">
        {themes.map((theme) => (
          <div
            key={theme.id}
            className={`theme-card ${selectedThemeId === theme.id ? "active" : ""}`}
            onClick={() => onSelectTheme(theme.id)} // 테마 ID 전달
            role="button"
            tabIndex={0} // 키보드 접근성
            aria-label={`${theme.name} 테마 선택`}
          >
            {theme.image && (
              <img
                src={theme.image}
                alt={theme.name}
                className="theme-image"
                loading="lazy"
              />
            )}
            <h3 className="theme-name">{theme.name}</h3>
            {theme.description && (
              <p className="theme-description">{theme.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ThemeSelector;
