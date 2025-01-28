"use client";
import { useEffect, useState } from "react";
import "./page.css";

export default function App() {
  const [score, setScore] = useState(0);
  const [moles, setMoles] = useState(new Array(9).fill(false));
  const [timeLeft, setTimeLeft] = useState(30);
  const [isGameActive, setIsGameActive] = useState(false);
  const [scoreboard, setScoreboard] = useState([]);
  const [showScoreboard, setShowScoreboard] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setMoles(new Array(9).fill(false)); // Reset moles to default state
    setIsGameActive(true);
    setGameOver(false);
  };

  const popMole = (index) => {
    setMoles((curMoles) => {
      const newMoles = [...curMoles];
      newMoles[index] = true;
      return newMoles;
    });
  };

  const hideMole = (index) => {
    setMoles((curMoles) => {
      const newMoles = [...curMoles];
      newMoles[index] = false;
      return newMoles;
    });
  };

  const wackMole = (index) => {
    if (!moles[index]) return; // Prevent score from increasing if no mole is present
    hideMole(index);
    setScore((prevScore) => prevScore + 1);
  };

  useEffect(() => {
    let gameInterval;
    let timerInterval;

    if (isGameActive) {
      gameInterval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * moles.length);
        popMole(randomIndex);
        setTimeout(() => {
          hideMole(randomIndex);
        }, 900); // Mole stays up for 900ms
      }, 1000); // New mole every 1 second

      timerInterval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (timeLeft === 0) {
      setIsGameActive(false);
      setGameOver(true);
      setScoreboard((prevScoreboard) => [...prevScoreboard, score]);
    }

    return () => {
      clearInterval(gameInterval);
      clearInterval(timerInterval);
    };
  }, [isGameActive, timeLeft, moles]);

  if (showScoreboard) {
    return (
      <div className="center">
        <h1>Scoreboard</h1>
        <ul>
          {scoreboard.map((score, index) => (
            <li key={index}>
              Game {index + 1}: {score}
            </li>
          ))}
        </ul>
        <button onClick={() => setShowScoreboard(false)}>Back to Game</button>
      </div>
    );
  }

  return (
    <div className="game-container">
      <div className="game-content">
        <h1>Whack-a-Mole</h1>
        <h2>Score: {score}</h2>
        <h2>Time Left: {timeLeft}s</h2>
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
              <button onClick={() => setShowScoreboard(true)}>
                View Scoreboard
              </button>
              <button onClick={startGame}>Play Again</button>
            </div>
          </div>
        )}
        <div className="grid">
          {moles.map((isMole, index) => (
            <div key={index} className="hole">
              <img
                src={isMole ? "/mole.png" : "/hole.png"}
                alt={isMole ? "Mole" : "Hole"}
                onClick={() => wackMole(index)}
                className={`mole-hole ${isMole ? "active" : ""}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
