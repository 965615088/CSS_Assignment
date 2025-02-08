"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import useSound from "use-sound";
import styles from "./page.module.css";

export default function Home() {
  // State to manage the volume level
  const [volume, setVolume] = useState(50); // Default volume to 50

  // Load volume from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSettings = localStorage.getItem("whacAMoleSettings");
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        setVolume(parsedSettings.volume || 50); // Set volume from saved settings
      }
    }
  }, []);

  // Adjust the volume dynamically for hover and click sounds
  const [playHover] = useSound("hover.mp3", {
    volume: volume / 100, // Set volume based on localStorage value
  });
  const [playClick] = useSound("click.mp3", {
    volume: volume / 100, // Set volume based on localStorage value
  });

  // Save volume to localStorage whenever it's updated
  const saveVolume = (newVolume) => {
    // Load existing settings and update volume
    const savedSettings = JSON.parse(localStorage.getItem("whacAMoleSettings")) || {};
    savedSettings.volume = newVolume;
    localStorage.setItem("whacAMoleSettings", JSON.stringify(savedSettings));

    // Update state with new volume
    setVolume(newVolume);
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
            onMouseEnter={playHover} // Play sound on hover
            onClick={playClick} // Play sound on click
          >
            Play
          </Link>
          <Link
            href="/scoreboard"
            className={styles.button}
            onMouseEnter={playHover}
            onClick={playClick}
          >
            Scoreboard
          </Link>
          <Link
            href="/guide"
            className={styles.button}
            onMouseEnter={playHover}
            onClick={playClick}
          >
            Guide
          </Link>
          <Link
            href="/settings"
            className={styles.button}
            onMouseEnter={playHover}
            onClick={playClick}
          >
            Settings
          </Link>
        </div>
      </div>
    </div>
  );
}
