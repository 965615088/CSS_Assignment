/*
Student Name: Ian Tan Jun Yang
Changes Made: Created a page where it shows the scores according to difficulty and allows user to clear scores.
*/

"use client";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import "./page.css"; // Import the CSS file

export default function Scoreboard() {
  const [scores, setScores] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [volume, setVolume] = useState(50); // Default volume to 50

  // Load volume from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSettings = localStorage.getItem("whacAMoleSettings");
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        setVolume(parsedSettings.volume || 50); // Set volume from saved settings
      }

      const savedScores = JSON.parse(localStorage.getItem("gameScores")) || {};
      let allScores = [];

      // Flatten scores with difficulty labels
      Object.keys(savedScores).forEach((difficulty) => {
        savedScores[difficulty].forEach((score) => {
          allScores.push({ score, difficulty });
        });
      });

      // Sort in descending order
      allScores.sort((a, b) => b.score - a.score);
      setScores(allScores);
    }
  }, []);

  // Function to clear scores from localStorage
  const clearScores = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("gameScores");
      setScores([]); // Clear state
    }
  };

  const [playHover] = useSound("hover.mp3", { volume: volume / 100 });
  const [playClick] = useSound("click.mp3", { volume: volume / 100 });

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">🏆 Scoreboard 🏆</h1>

        <div className="difficulty-selector">
          <label htmlFor="difficulty">Select Difficulty: </label>
          <select
            id="difficulty"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            onMouseEnter={playHover} // Play sound on hover
            onClick={playClick} // Play sound on click
          >
            <option value="all">All</option>
            {[...new Set(scores.map((s) => s.difficulty))].map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {scores.length > 0 ? (
          <ul className="scoreboard-list">
            {scores
              .filter(
                (s) => selectedDifficulty === "all" || s.difficulty === selectedDifficulty
              )
              .map((entry, index) => {
                const rankColors = ["gold", "silver", "bronze"];
                const colorClass = index < 3 ? rankColors[index] : "default";

                return (
                  <li key={index} className={`scoreboard-item ${colorClass}`}>
                    <span className="rank">🏅 Rank {index + 1}</span>
                    <span className="score">{entry.score} Points</span>
                    <span className="difficulty-label">({entry.difficulty.toUpperCase()})</span>
                  </li>
                );
              })}
          </ul>
        ) : (
          <p className="no-scores">No scores recorded yet.</p>
        )}

        <div className="button-container">
          <button
            className="button back-button"
            onClick={() => {
              playClick(); // Play sound on click
              window.location.href = "/";
            }}
            onMouseEnter={playHover} // Play sound on hover
          >
            ⬅️ Back to Menu
          </button>
          <button
            className="button clear-button"
            onClick={() => {
              playClick(); // Play sound on click
              clearScores();
            }}
            onMouseEnter={playHover} // Play sound on hover
          >
            🗑️ Clear Scoreboard
          </button>
        </div>
      </div>
    </div>
  );
}
