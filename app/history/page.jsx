"use client";
import "./page.css"; // Import the CSS file
import { useEffect, useState } from "react";

export default function Scoreboard() {
  const [scores, setScores] = useState({});
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedScores = JSON.parse(localStorage.getItem("gameScores")) || {};
      // Sort scores in descending order for each difficulty level
      Object.keys(savedScores).forEach((difficulty) => {
        savedScores[difficulty].sort((a, b) => b - a);
      });
      setScores(savedScores);
    }
  }, []);

  // Function to clear scores from localStorage
  const clearScores = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("gameScores");
      setScores({}); // Clear state
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">🏆 Whack-a-Mole Scoreboard 🏆</h1>
        
        <div className="difficulty-selector">
          <label htmlFor="difficulty">Select Difficulty: </label>
          <select id="difficulty" value={selectedDifficulty} onChange={(e) => setSelectedDifficulty(e.target.value)}>
            <option value="all">All</option>
            {Object.keys(scores).map((difficulty) => (
              <option key={difficulty} value={difficulty}>{difficulty.toUpperCase()}</option>
            ))}
          </select>
        </div>

        {Object.keys(scores).length > 0 ? (
          Object.keys(scores).map((difficulty) => (
            (selectedDifficulty === "all" || selectedDifficulty === difficulty) && (
              <div key={difficulty} className="difficulty-section">
                <h2 className={`difficulty-title ${difficulty}`}>{difficulty.toUpperCase()}</h2>
                <ul className="scoreboard-list">
                  {scores[difficulty].map((score, index) => {
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
              </div>
            )
          ))
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