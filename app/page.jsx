"use client";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <img src="/menueMole.png" alt="Left Mole" className={styles.leftMole} />
      <img src="/menueMole2.png" alt="Right Mole" className={styles.rightMole} />
      <div className={styles.menuBox}>
        <h1 className={styles.title}>Whack-a-Mole</h1>
        <p className={styles.subtitle}>Are you ready to test your reflexes?</p>
        <div className={styles.buttonContainer}>
          <a href="/game" className={styles.button}>
            Play
          </a>
          <a href="/history" className={styles.button}>
            History
          </a>
          <a href="/guide" className={styles.button}>
            Guide
          </a>
          <a href="/settings" className={styles.button}>
            Settings
          </a>
        </div>
      </div>
    </div>
  );
}
