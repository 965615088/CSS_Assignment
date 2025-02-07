"use client";
import { useState, useEffect } from "react";
import "../settings/styles.css";

export default function Settings() {
  const DEFAULT_STORAGE_KEY = "whacAMoleSettings";
  const [difficulty, setDifficulty] = useState("medium");
  const [volume, setVolume] = useState(50);
  const [showGrid, setShowGrid] = useState(true);
  const [moleSkin, setMoleSkin] = useState("mole.png");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem(DEFAULT_STORAGE_KEY);
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        setDifficulty(parsedSettings.difficulty || "medium");
        setVolume(parsedSettings.volume || 50);
        setShowGrid(parsedSettings.showGrid || true);
        setMoleSkin(parsedSettings.moleSkin || "mole.png");
      }
      setLoading(false);
    } catch (err) {
      setError("Error loading settings.");
      setLoading(false);
    }
  }, []);

  const handleSave = () => {
    try {
      const settings = { difficulty, volume, showGrid, moleSkin };
      localStorage.setItem(DEFAULT_STORAGE_KEY, JSON.stringify(settings));
      alert("Settings saved successfully!");
      // Redirect back to the game page to reload settings
      window.location.href = "/";
    } catch (err) {
      setError("Error saving settings.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
          onChange={(e) => setVolume(Number(e.target.value))}
        />
        <span>{volume}%</span>
      </div>
      <div className="settings-option">
        <label>Show Grid:</label>
        <input
          type="checkbox"
          checked={showGrid}
          onChange={(e) => setShowGrid(e.target.checked)}
        />
      </div>
      <div className="settings-option">
        <label>Mole Skin:</label>
        <select value={moleSkin} onChange={(e) => setMoleSkin(e.target.value)}>
          <option value="mole.png">Mole 1</option>
          <option value="mole2.png">Mole 2</option>
          <option value="mole3.png">Mole 3</option>
        </select>
      </div>
      <button className="save-button" onClick={handleSave}>
        Save Settings
      </button>
    </div>
  );
}