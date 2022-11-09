import React, { useState, useEffect } from 'react';
import PlayerGuessDisplay from '../playerGuessDisplay/PlayerGuessDisplay';
import IconTextButton from '../iconTextButton/IconTextButton';
import { ReactComponent as EyeIcon } from '../../assets/icons/eye.svg';
import { ReactComponent as SpinIcon } from '../../assets/icons/refresh-outline.svg';
import { ReactComponent as BulbIcon } from '../../assets/icons/bulb-outline.svg';
import { CurrentCharacterProps } from '../../types/Types';
import './guessWhoGame.css';

interface GuessWhoGameProps {
  character: CurrentCharacterProps;
  playerGuess: string;
  revealLetter: () => void;
  roundEnd: () => void;
}

function GuessWhoGame({ character, playerGuess, revealLetter, roundEnd }: GuessWhoGameProps) {
  const [blur, setBlur] = useState(true);
  const [showFront, setShowFront] = useState(false);
  const correct = playerGuess === character.name;

  useEffect(() => {
    setBlur(true);
    setShowFront(false);
  }, [character]);

  useEffect(() => {
    if (correct) {
      setBlur(true);
      setTimeout(roundEnd, 4000);
    }
  }, [correct, roundEnd]);

  const spin = () => {
    if (showFront) return;
    setShowFront(true);
  };

  const unBlur = () => {
    if (!blur) return;
    setBlur(false);
  };
  return (
    <div className="guess-who">
      <PlayerGuessDisplay guess={playerGuess} answer={character} />
      <div className={`mystery-character ${blur && 'blur'}`}>
        <h3 className="heading">Guess Who?</h3>
        <img
          className="image"
          src={showFront ? character.front_image : character.back_image}
          alt="mystery character"
        />
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
          text="unblur"
          Icon={EyeIcon}
          size="20px"
          className="hint-btn"
          handler={unBlur}
        />
        <IconTextButton
          text="spin"
          Icon={SpinIcon}
          size="20px"
          className="hint-btn"
          handler={spin}
        />
      </div>
    </div>
  );
}

export default GuessWhoGame;
