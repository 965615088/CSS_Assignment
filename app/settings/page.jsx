"use client";
import { useState, useEffect } from "react";
import "../ui/Navbar.module.css";
import "../settings/styles.css";

export default function Settings() {
  const DEFAULT_STORAGE_KEY = "whacAMoleSettings";
  const savedSettings = localStorage.getItem(DEFAULT_STORAGE_KEY);
  const initialSettings = savedSettings
    ? JSON.parse(savedSettings)
    : { difficulty: "medium", volume: 50, showGrid: true };

  const [difficulty, setDifficulty] = useState(initialSettings.difficulty);
  const [volume, setVolume] = useState(initialSettings.volume);
  const [showGrid, setShowGrid] = useState(initialSettings.showGrid);

  const handleSave = () => {
    const settings = { difficulty, volume, showGrid };
    localStorage.setItem(DEFAULT_STORAGE_KEY, JSON.stringify(settings));
    alert("Settings saved!");
  };

  return (
    <div className="settings-container">
      <h1>Game Settings</h1>
      <div className="settings-option">
        <label>Difficulty:</label>
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div className="settings-option">
        <label>Volume:</label>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
        />
      </div>
      <div className="settings-option">
        <label>Show Grid:</label>
        <input
          type="checkbox"
          checked={showGrid}
          onChange={(e) => setShowGrid(e.target.checked)}
        />
      </div>
      <button className="save-button" onClick={handleSave}>
        Save Settings
      </button>
    </div>
  );
}