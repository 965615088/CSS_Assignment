"use client";
import { useEffect, useState } from "react";
import "./page.css";

export default function App() {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [holes, setHoles] = useState(new Array(9).fill(null));
  const [timeLeft, setTimeLeft] = useState(45); // Increased time for larger game
  const [isGameActive, setIsGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);

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
    const isBomb = Math.random() < 0.1; // Lowered bomb probability to 10%
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
    }, 900);
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
      gameInterval = setInterval(() => {
        popItem();
      }, 1000);
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
  }, [isGameActive, timeLeft]);

  return (
    <div className="game-container">
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
              <button onClick={startGame}>Play Again</button>
            </div>
          </div>
        )}
        <div className="grid">
          {holes.map((content, index) => (
            <div key={index} className="hole" onClick={() => handleClick(index)}>
              <img
                src={
                  content === "mole"
                    ? "/mole.png"
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