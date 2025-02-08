"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import useSound from "use-sound";
import styles from "./page.module.css";

export default function Home() {
  // State to manage the volume level
  const [volume, setVolume] = useState(50); // Default volume to 50
  const volumeRef = useRef(volume); // Ref to track volume value

  // Load volume from localStorage (under the whacAMoleSettings key)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSettings = localStorage.getItem("whacAMoleSettings");
      if (savedSettings) {
        const { volume: savedVolume } = JSON.parse(savedSettings);
        const newVolume = savedVolume || 50; // Default to 50 if volume is 0 or not set
        setVolume(newVolume);
        volumeRef.current = newVolume; // Update ref after loading from localStorage
      }
    }
  }, []);

  // Adjust the volume dynamically for hover and click sounds
  const [playHover] = useSound("hover.mp3", {
    volume: volumeRef.current / 100, // Use volume from ref
  });
  const [playClick] = useSound("click.mp3", {
    volume: volumeRef.current / 100, // Use volume from ref
  });

  // Function to play sound
  const playSound = (sound) => {
    if (volumeRef.current > 0) {
      sound(); // Only play sound if volume is greater than 0
    }
  };

  return (
    <div className={styles.container}>
      <img src="/menueMole.png" alt="Left Mole" className={styles.leftMole} />
      <img src="/menueMole2.png" alt="Right Mole" className={styles.rightMole} />
      <div className={styles.menuBox}>
        <h1 className={styles.title}>Whack-a-Mole</h1>
        <p className={styles.subtitle}>Are you ready to test your reflexes?</p>
        <div className={styles.buttonContainer}>
          <Link
            href="/game"
            className={styles.button}
            onMouseEnter={() => playSound(playHover)} // Play sound on hover
            onClick={() => playSound(playClick)} // Play sound on click
          >
            Play
          </Link>
          <Link
            href="/scoreboard"
            className={styles.button}
            onMouseEnter={() => playSound(playHover)} // Play sound on hover
            onClick={() => playSound(playClick)} // Play sound on click
          >
            Scoreboard
          </Link>
          <Link
            href="/guide"
            className={styles.button}
            onMouseEnter={() => playSound(playHover)} // Play sound on hover
            onClick={() => playSound(playClick)} // Play sound on click
          >
            Guide
          </Link>
          <Link
            href="/settings"
            className={styles.button}
            onMouseEnter={() => playSound(playHover)} // Play sound on hover
            onClick={() => playSound(playClick)} // Play sound on click
          >
            Settings
          </Link>
        </div>
      </div>
    </div>
  );
}
