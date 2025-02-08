"use client";
import { useEffect, useState, useCallback } from "react";
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
  useEffect(() => { // empty dependency array [] means this effect runs only once when the component is first rendered.
    if (typeof window !== "undefined") { //ensures that the code only runs in the browser environment
      const savedSettings = localStorage.getItem(DEFAULT_STORAGE_KEY);//Retrieves saved game settings from local storage using the key DEFAULT_STORAGE_KEY
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);//Converts the JSON string from localStorage into a JavaScript object.
        setDifficulty(parsedSettings.difficulty || "medium");//Updates the difficulty state with the saved value, no update == medium
        setMoleSkin(parsedSettings.moleSkin || "mole.png");//Updates the moleSkin state with the saved value, defult mole.png
        setVolume(Number(parsedSettings.volume) ?? 50);//If parsedSettings.volume is undefined or null, it defaults to 50.
      }
    }
  }, []);

  const [play, { stop }] = useSound('explosion.mp3', {
    volume: volume / 100,
  });

  const [playHit] = useSound('hit.mp3', {
    volume: volume / 100,
  });

  const playExplosion = useCallback(() => {
    if (volume > 0) {
      play();
    } else {
      stop(); // Stops the sound if it's playing
    }
  }, [volume, play]);

  // Save score with difficulty
  const saveScore = (score, difficulty) => {
    const savedScores = JSON.parse(localStorage.getItem('gameScores')) || {};//retrieves previously saved scores from localStorage,
    //Uses JSON.parse() to convert the stored JSON string back into a JavaScript object.
    if (!savedScores[difficulty]) {
      savedScores[difficulty] = [];
    }
    savedScores[difficulty].push(score);//Adds the new score to the appropriate difficulty-based list.
    localStorage.setItem('gameScores', JSON.stringify(savedScores));//Converts savedScores back to a JSON string,Stores it in localStorage under the key gameScores.
  };

  // Retrieve scores by difficulty
  const getScoresByDifficulty = (difficulty) => {
    const savedScores = JSON.parse(localStorage.getItem('gameScores')) || {};//Uses localStorage.getItem('gameScores') to fetch saved scores.
    //Applies JSON.parse() to convert the JSON string back into an object.
    return savedScores[difficulty] || []; //Checks if scores exist for the given difficulty: yes:Returns the array of scores for that difficulty.else returns an empty array
  };

  // Game settings based on difficulty
  const getGameSettings = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return { bombProbability: 0.1, moleDuration: 1200, gameLoopInterval: 1000 };//bomb probability 10%, mole stays visiable time, mole frequency
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

  const startGame = () => { //resets all game-related states to their default values.
    setScore(0);
    setLives(3);
    setTimeLeft(45);
    setHoles(new Array(9).fill(null));
    setIsGameActive(true);
    setGameOver(false);
  };

  const popItem = () => {
    const randomIndex = Math.floor(Math.random() * holes.length);//chooses a random hole in which either a mole or a bomb will appear.
    const isBomb = Math.random() < bombProbability; //If the random number is less than bombProbability, the item will be a bomb, otherwise it is a mole.
    setHoles((curHoles) => {// Create a copy of the current holes array
      const newHoles = [...curHoles]; // Assign a bomb or mole.
      newHoles[randomIndex] = isBomb ? "bomb" : "mole";
      return newHoles;
    });

    // picks a random hole (using randomIndex) and, after moleDuration milliseconds, sets that hole to null, making it empty again. 
    setTimeout(() => {
      setHoles((curHoles) => {
        const newHoles = [...curHoles];
        newHoles[randomIndex] = null;
        return newHoles;
      });
    }, moleDuration);
  };

  const handleClick = (index) => {
    const holeContent = holes[index]; // Get the content of the hole at the given index
    if (holeContent === "mole") { // If the hole contains a mole
      if (volume > 0) {
        playHit();
      }
      setScore((prevScore) => prevScore + 1);// Increment the score by 1
      setHoles((curHoles) => {
        const newHoles = [...curHoles];  // Create a shallow copy of the current holes array
        newHoles[index] = null;// Set the clicked hole to null (remove the mole)
        return newHoles; // Return the updated array to update the state
      });
    } else if (holeContent === "bomb") {// If the hole contains a bomb
      if (volume > 0) {
        playExplosion(); // Play an explosion sound if the volume is greater than 0
      } else {
        stop();
      }
      setLives((prevLives) => prevLives - 1);// Decrease lives by 1
      if (lives - 1 <= 0) { // Check if the player has run out of lives
        setIsGameActive(false);// stop the game
        setGameOver(true);// Set the game over state to true
      }
    }
  };

  useEffect(() => { //useEffect hook runs whenever isGameActive, timeLeft, or gameLoopInterval changes.
    let gameInterval; 
    let timerInterval;
    if (isGameActive) {//when game is ongoing
      gameInterval = setInterval(popItem, gameLoopInterval);//triggers the popItem function at regular intervals based on the gameLoopInterval value.
      timerInterval = setInterval(() => setTimeLeft((prevTime) => prevTime - 1), 1000);//decreases the timeLeft by 1 every second, counting down the game time.
    }
    if (timeLeft === 0) {
      setIsGameActive(false);// it stops the game by setting setIsGameActive(false)
      setGameOver(true);//game over (setGameOver(true)).
    }
    return () => {
      clearInterval(gameInterval);
      clearInterval(timerInterval);
    };
  }, [isGameActive, timeLeft, gameLoopInterval]);

  useEffect(() => {// runs when gameOver, score, or difficulty changes.
    if (gameOver) {
      saveScore(score, difficulty); // saves the player's score to local storage, ensuring that the score is recorded for the current difficulty level.
    }
  }, [gameOver, score, difficulty]);

  return ( //JSX Layout of the Game UI
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
              <button className="scoreboard" onClick={() => window.location.href = "/scoreboard"}>Scoreboard</button>
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
