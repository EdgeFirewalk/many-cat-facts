import React from 'react';
import styles from './Card.module.scss'; // Подключаем стили

const Card = ({ fact }) => {
  return (
    <div className={styles.card}>
      <div className={styles.front}>
        {fact.img && (
          <img src={fact.img} alt="Cat" className={styles.catImage} />
        )}
      </div>
      <div className={styles.back}>
        <p className={styles.factText}>{fact.text}</p>
      </div>
    </div>
  );
};

export default Card;
