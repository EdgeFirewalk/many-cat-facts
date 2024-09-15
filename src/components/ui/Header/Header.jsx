import React, { useState } from 'react';

import styles from './Header.module.scss';

import CatIcon from '../../../img/icons/cat-icon.svg';

const Header = () => {
  const [factsNumber, setFactsNumber] = useState(0);
  const [isValidFactsNumber, setIsValidFactsNumber] = useState(true);

  const updateFactsNumber = (newValue) => {
    const parsedValue = parseInt(newValue);

    // Validation
    if (isNaN(parsedValue) || parsedValue < 0) {
      setIsValidFactsNumber(false);
    } else {
      setIsValidFactsNumber(true);
    }

    setFactsNumber(newValue);
  };

  return (
    <div className={styles.header}>
      <div className={styles.appLogo}>
        <img className={styles.logoImg} src={CatIcon} alt="App icon" />
        <p className={styles.logoText}>Many Cat Facts</p>
      </div>
      <div className={styles.inputBlock}>
        <input
          className={`${styles.input} ${!isValidFactsNumber ? styles.invalid : ''}`}
          type="number"
          min={0}
          placeholder="Number of facts"
          value={factsNumber}
          onChange={(e) => updateFactsNumber(e.target.value)}
          onClick={(e) => e.target.select()}
        />
        <button
          className={styles.button}
          onClick={
            (e) =>
              console.log(`Send number of facts (${factsNumber}) to App.js`) // TODO: Put a function from App.js here instead of console.log()
          }
          disabled={!isValidFactsNumber}
        >
          Get facts
        </button>
      </div>
    </div>
  );
};

export default Header;
