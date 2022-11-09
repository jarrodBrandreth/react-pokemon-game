import React from 'react';
import { CurrentCharacterProps } from '../../types/Types';
import './playerGuessDisplay.css';

interface PlayerGuessProps {
  guess: string;
  answer: CurrentCharacterProps;
}

function PlayerGuess({ guess, answer }: PlayerGuessProps) {
  const difference = answer.name.length - guess.length;
  const correctGuess = answer.name === guess;
  return (
    <div className="player-guess">
      <div className={`display ${correctGuess && 'correct'}`}>{guess}</div>
      <div className={`letters-remaining ${difference === 0 && 'max-letters'}`}>
        {correctGuess && <span className="correct">Correct!</span>}
        {!correctGuess && (
          <>
            {' '}
            {difference > 0 && <span className="number">{difference}</span>}
            <span className="text">
              {difference === 0 && 'try again!'}
              {difference === 1 && 'Letter Remaining'}
              {difference > 0 && difference !== 1 && 'Letters Remaining'}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export default PlayerGuess;
