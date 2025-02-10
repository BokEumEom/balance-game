
function ResultBar({ label, votes, total, color }) {
  const percent = total ? Math.round((votes / total) * 100) : 0;
  return (
    <div className="result-option">
      <div className="option-label">{label}</div>
      <div className="bar-container">
        <div
          className="bar-fill"
          style={{ width: `${percent}%`, backgroundColor: color }}
        />
      </div>
      <span className="percentage">
        {percent}% ({votes}표)
      </span>
    </div>
  );
}

export default ResultBar;
