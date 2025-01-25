import React, { useState, useEffect } from 'react';

import styles from './Card.module.scss'; // Подключаем стили

const Card = () => {
  const [catImageUrl, setCatImageUrl] = useState('');
  const [catFact, setCatFact] = useState('');

  useEffect(() => {
    const fetchCatImage = async () => {
      try {
        const response = await fetch('https://cataas.com/cat?=:small');
        if (response.ok) {
          const imageBlob = await response.blob();
          const imageUrl = URL.createObjectURL(imageBlob);
          setCatImageUrl(imageUrl);
        } else {
          console.error('Failed to fetch cat image');
        }
      } catch (error) {
        console.error('Error fetching cat image:', error);
      }
    };

    const fetchCatFact = async () => {
      try {
        const response = await fetch('https://catfact.ninja/fact');
        if (response.ok) {
          const data = await response.json();
          setCatFact(data.fact);
        } else {
          console.error('Failed to fetch cat fact');
        }
      } catch (error) {
        console.error('Error fetching cat fact:', error);
      }
    };

    fetchCatImage();
    fetchCatFact();
  }, []);

  return (
    <div className={styles.card}>
      <div className={styles.front}>
        {catImageUrl && <img src={catImageUrl} alt="Cat" className={styles.catImage} />}
      </div>
      <div className={styles.back}>
        <p className={styles.factText}>{catFact}</p>
      </div>
    </div>
  );
};

export default Card;