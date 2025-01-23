import React from "react";
import themes from "../data/themes.json"; // 테마 데이터 불러오기

function ThemeSelector({ onSelectTheme }) {
  return (
    <div className="theme-selector">
      <h2 className="theme-title">테마를 선택하세요</h2>
      <div className="theme-list">
        {themes.map((theme) => (
          <div
            key={theme.id}
            className="theme-card"
            onClick={() => onSelectTheme(theme.id)} // 테마 ID 전달
            role="button" // 접근성 향상
            tabIndex={0} // 키보드 접근성
            aria-label={`${theme.name} 테마 선택`} // 접근성 향상
          >
            {theme.image && (
              <img
                src={theme.image}
                alt={theme.name}
                className="theme-image"
                loading="lazy" // 이미지 로딩 최적화
              />
            )}
            <h3 className="theme-name">{theme.name}</h3>
            {theme.description && ( // 테마 설명 추가
              <p className="theme-description">{theme.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ThemeSelector;