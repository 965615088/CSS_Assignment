"use client";
import "./page.css"; // Import the CSS file

export default function Scoreboard() {
  // Fetch scores from localStorage
  let scores = [];
  if (typeof window !== "undefined") {
    scores = JSON.parse(localStorage.getItem("scoreboard")) || [];
    scores.sort((a, b) => b - a); // Sort scores in descending order
  }

  // Function to clear scores from localStorage
  const clearScores = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("scoreboard");
      // Refresh the page to clear the scoreboard statically
      window.location.reload();
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">🏆 Whack-a-Mole Scoreboard 🏆</h1>

        {scores.length > 0 ? (
          <ul className="scoreboard-list">
            {scores.map((score, index) => {
              const rankColors = ["gold", "silver", "bronze"];
              const colorClass = index < 3 ? rankColors[index] : "default";

              return (
                <li key={index} className={`scoreboard-item ${colorClass}`}>
                  <span className="rank">🏅 Rank {index + 1}</span>
                  <span className="score">{score} Points</span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="no-scores">No scores recorded yet.</p>
        )}

        <div className="button-container">
          <button className="button back-button" onClick={() => (typeof window !== "undefined" ? window.history.back() : null)}>
            ⬅️ Back to Menu
          </button>
          <button className="button clear-button" onClick={clearScores}>
            🗑️ Clear Scoreboard
          </button>
        </div>
      </div>
    </div>
  );
}
