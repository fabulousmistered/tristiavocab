import React from 'react';
import styled, { css, keyframes } from 'styled-components';

const flipAnimation = keyframes`
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(180deg);
  }
`;

const Card = styled.div`
  width: 100%;
  height: 200px;
  perspective: 1000px;
  cursor: pointer;
  border: 2px solid #ff69b4;
  border-radius: 10px;
`;

const CardInner = styled.div`
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  ${props => props.flipped && css`
    animation: ${flipAnimation} 0.6s forwards;
  `}
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #16213e;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  box-sizing: border-box;
`;

const CardFront = styled(CardFace)``;

const CardBack = styled(CardFace)`
  transform: rotateY(180deg);
`;

const Word = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #e0e0e0;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const Info = styled.p`
  font-size: 1rem;
  text-align: center;
  color: #b0b0b0;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const GrammarInfo = styled.span`
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 0.8rem;
  color: #add8e6;

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

const Derivatives = styled.p`
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 0.8rem;
  color: #b0b0b0;
  font-style: italic;

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

const StarContainer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  display: flex;
`;

const Star = styled.span`
  font-size: 1.2rem;
  color: ${props => props.filled ? '#ffd700' : '#b0b0b0'};
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #ffd700;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const Flashcard = ({ word, showAnswer, onFlip, onStarClick, starRating }) => {
  return (
    <Card onClick={onFlip}>
      <CardInner flipped={showAnswer}>
        <CardFront>
          <Derivatives>{word.derivatives}</Derivatives>
          <Word>{word.latin}</Word>
          <GrammarInfo>{word.type}</GrammarInfo>
          <StarContainer>
            {[1, 2, 3].map((star) => (
              <Star
                key={star}
                filled={star <= starRating}
                onClick={(e) => {
                  e.stopPropagation();
                  onStarClick(star);
                }}
              >
                ★
              </Star>
            ))}
          </StarContainer>
        </CardFront>
        <CardBack>
          <Word>{word.english}</Word>
        </CardBack>
      </CardInner>
    </Card>
  );
};

export default Flashcard;