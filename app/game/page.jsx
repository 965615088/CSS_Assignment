"use client";
import { useEffect, useState } from "react";
import useSound from 'use-sound';
import "./page.css";

export default function App() {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [holes, setHoles] = useState(new Array(9).fill(null));
  const [timeLeft, setTimeLeft] = useState(45);
  const [isGameActive, setIsGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // Storage key for settings
  const DEFAULT_STORAGE_KEY = "whacAMoleSettings";
  const [difficulty, setDifficulty] = useState("medium");
  const [moleSkin, setMoleSkin] = useState("mole.png");
  const [volume, setVolume] = useState(50);

  // Load settings from local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSettings = localStorage.getItem(DEFAULT_STORAGE_KEY);
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        setDifficulty(parsedSettings.difficulty || "medium");
        setMoleSkin(parsedSettings.moleSkin || "mole.png");
        setVolume(Number(parsedSettings.volume) ?? 50);
      }
    }
  }, []);

  // Sound effect setup
  const [explosion, { stop, setVolume: setExplosionVolume }] = useSound('explosion.mp3', {
    volume: volume / 100,
  });

  useEffect(() => {
    if (setExplosionVolume) {
      setExplosionVolume(volume / 100);
    }
  }, [volume, setExplosionVolume]);

  // Game settings based on difficulty
  const getGameSettings = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return { bombProbability: 0.1, moleDuration: 1200, gameLoopInterval: 1500 };
      case "medium":
        return { bombProbability: 0.2, moleDuration: 1000, gameLoopInterval: 1000 };
      case "hard":
        return { bombProbability: 0.4, moleDuration: 700, gameLoopInterval: 500 };
      default:
        return { bombProbability: 0.2, moleDuration: 750, gameLoopInterval: 1000 };
    }
  };

  // Apply difficulty settings
  const { bombProbability, moleDuration, gameLoopInterval } = getGameSettings(difficulty);

  const startGame = () => {
    setScore(0);
    setLives(3);
    setTimeLeft(45);
    setHoles(new Array(9).fill(null));
    setIsGameActive(true);
    setGameOver(false);
  };

  const popItem = () => {
    const randomIndex = Math.floor(Math.random() * holes.length);
    const isBomb = Math.random() < bombProbability;
    setHoles((curHoles) => {
      const newHoles = [...curHoles];
      newHoles[randomIndex] = isBomb ? "bomb" : "mole";
      return newHoles;
    });
    setTimeout(() => {
      setHoles((curHoles) => {
        const newHoles = [...curHoles];
        newHoles[randomIndex] = null;
        return newHoles;
      });
    }, moleDuration);
  };

  const handleClick = (index) => {
    const holeContent = holes[index];
    if (holeContent === "mole") {
      setScore((prevScore) => prevScore + 1);
      setHoles((curHoles) => {
        const newHoles = [...curHoles];
        newHoles[index] = null;
        return newHoles;
      });
    } else if (holeContent === "bomb") {
      explosion();
      setLives((prevLives) => prevLives - 1);
      if (lives - 1 <= 0) {
        setIsGameActive(false);
        setGameOver(true);
      }
    }
  };

  useEffect(() => {
    let gameInterval;
    let timerInterval;
    if (isGameActive) {
      gameInterval = setInterval(popItem, gameLoopInterval);
      timerInterval = setInterval(() => setTimeLeft((prevTime) => prevTime - 1), 1000);
    }
    if (timeLeft === 0) {
      setIsGameActive(false);
      setGameOver(true);
    }
    return () => {
      clearInterval(gameInterval);
      clearInterval(timerInterval);
    };
  }, [isGameActive, timeLeft, gameLoopInterval]);

  return (
    <div className="game-container">
      <img src="/return.png" alt="Return" className="return-button" onClick={() => window.location.href = "/"} />
      <div className="top-left-container">
        <div className="lives-container">
          <img src="/heart.png" alt="Heart" className="heart-icon" />
          <span>{lives}</span>
        </div>
        <div className="timer-container">
          <img src="/hourglass.png" alt="Hourglass" className="hourglass-icon" />
          <span>{timeLeft}s</span>
        </div>
      </div>
      <div className="game-content">
        <h1>Whack-a-Mole</h1>
        <h2>Score: {score}</h2>
        {!isGameActive && !gameOver && (
          <button className="start-button" onClick={startGame}>
            Start Game
          </button>
        )}
        {gameOver && (
          <div className="game-over-overlay">
            <div className="game-over">
              <h2>Game Over!</h2>
              <p>Your Score: {score}</p>
              <button className="play-again" onClick={startGame}>Play Again</button>
              <button className="scoreboard" onClick={() => window.location.href = "/history"}>Scoreboard</button>
              <button className="home" onClick={() => window.location.href = "/"}>Home</button>
            </div>
          </div>
        )}
        <div className="difficulty-box">
          <span>
            Current Difficulty: <span className={`difficulty-level ${difficulty}`}>{difficulty}</span>
          </span>
        </div>
        <div className="grid">
          {holes.map((content, index) => (
            <div key={index} className="hole" onClick={() => handleClick(index)}>
              <img
                src={
                  content === "mole"
                    ? `/${moleSkin}`
                    : content === "bomb"
                    ? "/bomb.png"
                    : "/hole.png"
                }
                alt={content || "Hole"}
                className={`mole-hole ${content ? "active" : ""}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
