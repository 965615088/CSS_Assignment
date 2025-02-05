"use client"
import React, { useState } from 'react';
import Link from 'next/link';  // Import Link from next/link
import styles from './page.module.css';

const Guide = () => {
  const [page, setPage] = useState(0);

  const sections = [
    {
      title: 'Introduction',
      content: 'Welcome to Whack-a-Mole! In this game, you need to hit moles that pop up from their holes before they disappear. Try to score as high as possible!',
    },
    {
      title: 'Game Setup',
      content: 'The game consists of several holes, and moles will randomly pop up from them. Your goal is to hit as many moles as possible within the time limit.',
    },
    {
      title: 'Difficulty Levels',
      content: 'There are three difficulty levels: Easy, Medium, and Hard. As you increase the difficulty, moles pop up more frequently and stay visible for less time.',
    },
    {
      title: 'How to Play',
      content: 'When a mole pops up, click on it to score a point. If you miss it, you lose time. Try to hit as many moles as possible to achieve a high score.',
    },
    {
      title: 'Controls',
      content: 'Simply click on the moles when they appear. On mobile, tap the moles to hit them.',
    },
    {
      title: 'Tips for Success',
      content: 'Stay focused and try to predict where the moles will pop up. Higher difficulty levels will require faster reflexes!',
    },
  ];

  const nextPage = () => {
    if (page < sections.length - 1) {
      setPage(page + 1);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>{sections[page].title}</h1>
        <p className={styles.paragraph}>{sections[page].content}</p>
      </div>
      {page < sections.length - 1 ? (
        <button className={styles.nextButton} onClick={nextPage}>Next Page</button>
      ) : (
        <Link href="/" passHref>
          <button className={styles.nextButton}>Return to Main Menu</button>
        </Link>
      )}
    </div>
  );
};

export default Guide;
