/*
Student Name: Wyse Lee Hong Yao
Changes Made: Created a guide page to explain the game rules and controls to the player. Added sound effects for hover and click events.
*/

"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import useSound from "use-sound";
import styles from "./Page.module.css";

export default function Guide() {
  const [page, setPage] = useState(0);
  const [volume, setVolume] = useState(50); // Default volume to 50
  const volumeRef = useRef(volume); // Ref to track volume value

  // Load volume from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSettings = localStorage.getItem("whacAMoleSettings");
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        const newVolume = parsedSettings.volume ?? 50; // Default to 50 if volume is undefined
        setVolume(newVolume);
        volumeRef.current = newVolume; // Ensure ref is updated
      }
    }
  }, []);

  const sections = [
    {
      title: "Introduction",
      content:
        "Welcome to Whack-a-Mole! In this game, you need to hit moles that pop up from their holes before they disappear.",
    },
    {
      title: "Game Setup",
      content:
        "The game takes place on a 3x3 grid, with a total of 9 holes, and moles will randomly pop up from them. Your goal is to hit as many moles as possible within the time limit. However, bombs may also appear out of the holes! Watch out for them and if you hit 3 bombs and lose all 3 lives, it's game over!",
    },
    {
      title: "Difficulty Levels",
      content:
        "There are three difficulty levels: Easy, Medium, and Hard. As you increase the difficulty, moles and BOMBS pop up more frequently so try not to hit the wrong target!",
    },
    {
      title: "How to Play",
      content:
        "When a mole pops up, click on it to score a point. Try to hit as many moles as possible to achieve a high score!",
    },
    {
      title: "Controls",
      content:
        "Left click on the mole when it appears out the hole to score a point, while clicking on a bomb loses you one life point. Press the 'Esc' Key at any point in time to return to the Main Menu.",
    },
    {
      title: "Tips for Success",
      content:
        "Stay focused and try to predict where the moles will pop up without exploding. Higher difficulty levels will require faster reflexes!",
    },
  ];

  const nextPage = () => {
    if (page < sections.length - 1) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const [playHover] = useSound("hover.mp3", {
    volume: volumeRef.current / 100,
  });

  const [playClick] = useSound("click.mp3", {
    volume: volumeRef.current / 100,
  });

  const playSound = (sound) => {
    if (volumeRef.current > 0) {
      sound(); // Only play sound if volume is greater than 0
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentBox}>
        <h1 className={styles.titleText}>{sections[page].title}</h1>
        <p className={styles.bodyText}>{sections[page].content}</p>
      </div>
      <div className={styles.buttonContainer}>
        {page > 0 ? (
          <button
            className={styles.actionButton}
            onClick={() => {
              prevPage();
              playSound(playClick);
            }}
            onMouseEnter={() => playSound(playHover)}
          >
            Previous Page
          </button>
        ) : (
          <Link href="/" passHref>
            <button
              className={styles.actionButton}
              onClick={() => playSound(playClick)}
              onMouseEnter={() => playSound(playHover)}
            >
              Return to Main Menu
            </button>
          </Link>
        )}

        {page < sections.length - 1 ? (
          <button
            className={styles.actionButton}
            onClick={() => {
              nextPage();
              playSound(playClick);
            }}
            onMouseEnter={() => playSound(playHover)}
          >
            Next Page
          </button>
        ) : (
          <Link href="/" passHref>
            <button
              className={styles.actionButton}
              onClick={() => playSound(playClick)}
              onMouseEnter={() => playSound(playHover)}
            >
              Return to Main Menu
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
