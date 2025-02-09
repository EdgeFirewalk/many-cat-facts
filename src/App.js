import React, { useState } from 'react';

import './App.css';

import Header from './components/ui/Header/Header';
import LoadingBlock from './components/ui/LoadingBlock/LoadingBlock';
import Card from './components/ui/Card/Card';

function App() {
  const [isLoadingFacts, setIsLoadingFacts] = useState(false);

  // Состояние для хранения массива с данными о карточках
  const [catFacts, setCatFacts] = useState([]); // Убираем начальную заглушку
  const [hasFetched, setHasFetched] = useState(false); // Флаг для отслеживания выполнения запросов

  // Функция для обновления состояния catFacts
  const getCatFacts = async (number) => {
    try {
      if (number <= 0) {
        setCatFacts([]); // Если число меньше или равно нулю, очищаем состояние
        setHasFetched(true); // Устанавливаем флаг, что запрос был выполнен
        return;
      }

      const newCatFacts = [];
      setIsLoadingFacts(true);

      // Используем цикл for для последовательного выполнения запросов
      for (let i = 0; i < number; i++) {
        let imageUrl = null;
        let factText = null;

        // Получаем изображение кота
        try {
          const response = await fetch('https://cataas.com/cat?=:small');
          if (response.ok) {
            const imageBlob = await response.blob();
            imageUrl = URL.createObjectURL(imageBlob);
          } else {
            console.error('Failed to fetch cat image');
          }
        } catch (error) {
          console.error('Error fetching cat image:', error);
        }

        // Получаем факт о коте
        try {
          const response = await fetch('https://catfact.ninja/fact');
          if (response.ok) {
            const data = await response.json();
            factText = data.fact;
          } else {
            console.error('Failed to fetch cat fact');
          }
        } catch (error) {
          console.error('Error fetching cat fact:', error);
        }

        // Добавляем объект только если оба запроса успешны
        if (imageUrl && factText) {
          newCatFacts.push({ img: imageUrl, text: factText });
        }
      }

      // Обновляем состояние
      setCatFacts(newCatFacts);
      setHasFetched(true); // Устанавливаем флаг, что запрос был выполнен

      setIsLoadingFacts(false);
    } catch (error) {
      console.error('Error fetching cat data:', error);
      setHasFetched(true); // Устанавливаем флаг даже при ошибке
    }
  };

  return (
    <div className="wrapper">
      <div className="site-wrapper">
        <Header onGetFacts={getCatFacts} isLoading={isLoadingFacts} />
        <div className="cards-wrapper">
          <div className="cards-container">
            {
              isLoadingFacts ? (
                <LoadingBlock />
              ) : /* Рендерим карточки на основе данных из catFacts */
              catFacts.length > 0 ? (
                catFacts.map((fact, index) => <Card key={index} fact={fact} />)
              ) : hasFetched ? (
                /* Если были запросы, но результат пустой */
                <p className="no-cards-message">No facts were found...</p>
              ) : null
              /* Если запросов ещё не было, ничего не показываем */
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
