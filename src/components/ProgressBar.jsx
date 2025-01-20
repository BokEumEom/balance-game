import React from "react";

function ProgressBar({ current, total }) {
  const percent = total ? Math.round((current / total) * 100) : 0;

  return (
    <div className="progress-container">
      <div className="progress-text">
        {current} / {total}
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
}

export default ProgressBar;
