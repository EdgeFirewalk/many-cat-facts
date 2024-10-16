import React, { useState, useEffect, useRef } from 'react';
import styles from './Card.module.scss'; // Подключаем стили

const Card = () => {
  const [catImageUrl, setCatImageUrl] = useState('');
  const [catFact, setCatFact] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);
  const factTextRef = useRef(null);

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

  const handleClick = () => {
    if (factTextRef.current.scrollHeight > factTextRef.current.clientHeight) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleMouseEnter = () => {
    if (factTextRef.current.scrollHeight <= factTextRef.current.clientHeight) {
      setIsFlipped(true);
    }
  };

  const handleMouseLeave = () => {
    if (factTextRef.current.scrollHeight <= factTextRef.current.clientHeight) {
      setIsFlipped(false);
    }
  };

  return (
    <div
      className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.front}>
        <p ref={factTextRef} className={styles.factText}>{catFact}</p>
      </div>
      <div className={styles.back}>
        {catImageUrl && <img src={catImageUrl} alt="Cat" className={styles.catImage} />}
      </div>
    </div>
  );
};

export default Card;