import React, { useState } from 'react';
import './App.css';
import Header from './components/ui/Header/Header';
import Card from './components/ui/Card/Card';

function App() {
  const [cardsNumber, setCardsNumber] = useState(0);

  const handleGetFacts = (number) => {
    setCardsNumber(number);
  };

  return (
    <div className="site-wrapper">
      <Header onGetFacts={handleGetFacts} />
      <div className="cards-wrapper">
        <div className="cards-container">
          {Array.from({ length: cardsNumber }).map((_, index) => (
            <Card key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
