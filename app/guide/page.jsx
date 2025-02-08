"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Page.module.css';

const Guide = () => {
  const [page, setPage] = useState(0);

  const sections = [
    {
      title: 'Introduction',
      content: 'Welcome to Whack-a-Mole! In this game, you need to hit moles that pop up from their holes before they disappear.',
    },
    {
      title: 'Game Setup',
      content: 'The game takes place on a 3x3 grid, with a total of 9 holes, and moles will randomly pop up from them. Your goal is to hit as many moles as possible within the time limit. However, bombs may also appear out of the holes! Watch out for them and if you hit 3 bombs and lose all 3 lives, it\'s game over!',
    },
    {
      title: 'Difficulty Levels',
      content: 'There are three difficulty levels: Easy, Medium, and Hard. As you increase the difficulty, moles and BOMBS pop up more frequently so try not to hit the wrong target!',
    },
    {
      title: 'How to Play',
      content: 'When a mole pops up, click on it to score a point. Try to hit as many moles as possible to achieve a high score!',
    },
    {
      title: 'Controls',
      content: 'Left click on the mole when it appears out the hole to score a point, while clicking on a bomb loses you one life point. Press the \'Esc\' Key at any point in time to return to the Main Menu.',
    },
    {
      title: 'Tips for Success',
      content: 'Stay focused and try to predict where the moles will pop up without exploding. Higher difficulty levels will require faster reflexes!',
    },
  ];

  const nextPage = () => {
    if (page < sections.length - 1) {
      setPage(page + 1);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentBox}>
        <h1 className={styles.titleText}>{sections[page].title}</h1>
        <p className={styles.bodyText}>{sections[page].content}</p>
      </div>
      {page < sections.length - 1 ? (
        <button className={styles.actionButton} onClick={nextPage}>Next Page</button>
      ) : (
        <Link href="/" passHref>
          <button className={styles.actionButton}>Return to Main Menu</button>
        </Link>
      )}
    </div>
  );
};

export default Guide;
