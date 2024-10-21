import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Flashcard from './components/Flashcard';
import { latinWords } from './data/latinWords';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #1a1a2e;
  color: #e0e0e0;
  font-family: 'Playfair Display', serif;
  padding: 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 2rem 0;
  color: #e0e0e0;
  font-family: 'Cinzel', serif;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const TristiaText = styled.span`
  font-family: 'Tangerine', cursive;
  color: #ff69b4;
  font-size: 1.5em;
  font-weight: 700;
`;

const FlashcardContainer = styled.div`
  margin-bottom: 3rem;
  width: 100%;
  max-width: 300px;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const Button = styled.button`
  background-color: #0f3460;
  color: #e0e0e0;
  border: none;
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  font-family: 'Playfair Display', serif;

  &:hover {
    background-color: #16213e;
  }

  @media (max-width: 480px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
`;

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [starRatings, setStarRatings] = useState({});

  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % latinWords.length);
    setShowAnswer(false);
  };

  const prevCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + latinWords.length) % latinWords.length);
    setShowAnswer(false);
  };

  const toggleAnswer = () => {
    setShowAnswer((prev) => !prev);
  };

  const handleStarClick = (rating) => {
    setStarRatings((prevRatings) => ({
      ...prevRatings,
      [currentIndex]: rating,
    }));
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'ArrowRight') {
        nextCard();
      } else if (event.key === 'ArrowLeft') {
        prevCard();
      } else if (event.key === ' ') {
        toggleAnswer();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <AppContainer>
      <Title>Ovid's <TristiaText>Tristia</TristiaText></Title>
      <FlashcardContainer>
        <Flashcard
          word={latinWords[currentIndex]}
          showAnswer={showAnswer}
          onFlip={toggleAnswer}
          onStarClick={handleStarClick}
          starRating={starRatings[currentIndex] || 0}
        />
      </FlashcardContainer>
      <Controls>
        <Button onClick={prevCard}>Previous</Button>
        <Button onClick={toggleAnswer}>Flip</Button>
        <Button onClick={nextCard}>Next</Button>
      </Controls>
    </AppContainer>
  );
}

export default App;