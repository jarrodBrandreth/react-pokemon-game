import React, { useEffect, useState } from 'react';
import PlayerGuessDisplay from '../playerGuessDisplay/PlayerGuessDisplay';
import IconTextButton from '../iconTextButton/IconTextButton';
import { ReactComponent as ShuffleIcon } from '../../assets/icons/shuffle.svg';
import { ReactComponent as BulbIcon } from '../../assets/icons/bulb-outline.svg';
import { CurrentCharacterProps } from '../../types/Types';
import './scrambleGame.css';

const getScrambledWord = (name: string): string => {
  return name
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
};

interface ScrambleGameProps {
  character: CurrentCharacterProps;
  playerGuess: string;
  revealLetter: () => void;
  roundEnd: () => void;
}

function ScrambleGame({ character, playerGuess, revealLetter, roundEnd }: ScrambleGameProps) {
  const [scrambledWord, setScrambledWord] = useState<string>();
  const correct = playerGuess === character.name;

  useEffect(() => {
    setScrambledWord(getScrambledWord(character.name));
  }, [character]);

  useEffect(() => {
    if (correct) {
      setTimeout(roundEnd, 4000);
    }
  }, [correct, roundEnd]);

  const shuffle = () => {
    setScrambledWord((scrambledWord) => {
      if (!scrambledWord) return;
      return getScrambledWord(scrambledWord);
    });
  };

  return (
    <div className="scramble">
      <PlayerGuessDisplay guess={playerGuess} answer={character} />
      <div className="scrambled-letters-container">
        <h3 className="heading">Unscramble Me!</h3>
        <div className="scrambled-letters">
          {scrambledWord?.split('').map((letter, index) => {
            return (
              <span
                key={index}
                className={`letter ${playerGuess.includes(letter) && 'included-in-guess'}`}
              >
                {letter}
              </span>
            );
          })}
        </div>
      </div>
      <div className="hints">
        <IconTextButton
          text="reveal letter"
          Icon={BulbIcon}
          size="20px"
          className="hint-btn"
          handler={revealLetter}
        />
        <IconTextButton
          text="shuffle"
          Icon={ShuffleIcon}
          size="20px"
          className="hint-btn"
          handler={shuffle}
        />
      </div>
    </div>
  );
}

export default ScrambleGame;
