    "use client";
    import { useState } from "react";
    import "../ui/Navbar.module.css"; // Assuming you may want to style settings similarly

    export default function Settings() {
    const [difficulty, setDifficulty] = useState("medium");
    const [volume, setVolume] = useState(50);
    const [showGrid, setShowGrid] = useState(true);

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

        <button className="save-button">Save Settings</button>
        </div>
    );
    }
