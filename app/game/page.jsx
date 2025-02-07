"use client";
import { useEffect, useState } from "react";
import useSound from 'use-sound';
import "./page.css";

export default function App() {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [holes, setHoles] = useState(new Array(9).fill(null));
  const [timeLeft, setTimeLeft] = useState(45); // Increased time for larger game
  const [isGameActive, setIsGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // Default settings
  const DEFAULT_STORAGE_KEY = "whacAMoleSettings";
  const [difficulty, setDifficulty] = useState("medium");
  const [moleSkin, setMoleSkin] = useState("mole.png");
  const [volume, setVolume] = useState(50);
  const [explosion, { stop, setVolume: setExplosionVolume }] = useSound('explosion.mp3', {
    volume: volume / 100,
  });

  // Load saved settings only on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSettings = localStorage.getItem(DEFAULT_STORAGE_KEY);
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        setDifficulty(parsedSettings.difficulty || "medium");
        setMoleSkin(parsedSettings.moleSkin || "mole.png");
        setVolume(Number(parsedSettings.volume) || 50);
      }
    }
  }, []);

  useEffect(() => {
    if (setExplosionVolume) {
      setExplosionVolume(volume / 100);
    }
  }, [volume, setExplosionVolume]);

  // Initialize default difficulty
  let bombProbability = 0.2; 
  let moleDuration = 750; 
  let gameLoopInterval = 1000; // Default interval

  // Adjust difficulty settings
  useEffect(() => {
    switch (difficulty) {
      case "easy":
        bombProbability = 0.1; // Lower bomb probability for easy mode
        moleDuration = 1200; // Mole stays up for 1.2 seconds
        gameLoopInterval = 1500; // Slower game loop for easy mode
        break;
      case "medium":
        bombProbability = 0.2;
        moleDuration = 1000; // Mole stays up for 1 second
        gameLoopInterval = 1000; // Medium game loop interval
        break;
      case "hard":
        bombProbability = 0.4; // Increase bomb probability for hard mode
        moleDuration = 700; // Mole stays up for 0.7 seconds
        gameLoopInterval = 500; // Faster game loop for hard mode
        break;
      default:
        bombProbability = 0.2;
        moleDuration = 750;
        gameLoopInterval = 1000;
        break;
    }
  }, [difficulty]);

  const startGame = () => {
    setScore(0);
    setLives(3);
    setTimeLeft(45); // Reset time to 45 seconds
    setHoles(new Array(9).fill(null));
    setIsGameActive(true);
    setGameOver(false);
  };

  const popItem = () => {
    const randomIndex = Math.floor(Math.random() * holes.length);
    const isBomb = Math.random() < bombProbability; // Dynamically adjust bomb probability
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
    }, moleDuration); // Use the appropriate mole duration based on difficulty
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

  const handleReturn = () => {
    window.location.href = "/";
  };

  const handleScoreboard = () => {
    window.location.href = "/history";
  };

  const handleHome = () => {
    window.location.href = "/";
  };

  useEffect(() => {
    let gameInterval;
    let timerInterval;
    if (isGameActive) {
      gameInterval = setInterval(() => {
        popItem();
      }, gameLoopInterval); // Use the appropriate interval based on difficulty
      timerInterval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }
    if (timeLeft === 0) {
      setIsGameActive(false);
      setGameOver(true);
    }
    return () => {
      clearInterval(gameInterval);
      clearInterval(timerInterval);
    };
  }, [isGameActive, timeLeft, moleDuration, gameLoopInterval]);

  return (
    <div className="game-container">
      {/* Return Button */}
      <img src="/return.png" alt="Return" className="return-button" onClick={handleReturn} />
      {/* TOP-LEFT UI (Lives & Timer) */}
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
              <button className="scoreboard" onClick={handleScoreboard}>Scoreboard</button>
              <button className="home" onClick={handleHome}>Home</button>
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