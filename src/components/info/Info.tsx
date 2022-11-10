import React from 'react';
import IconButton from '../IconButton/IconButton';
import { ReactComponent as CloseIcon } from '../../assets/icons/x-mark.svg';
import './info.css';

interface InfoProps {
  setShowInfo: React.Dispatch<React.SetStateAction<boolean>>;
  gameMode: string | null;
}

function Info({ setShowInfo, gameMode }: InfoProps) {
  return (
    <div className="info">
      <h3 className="title">{gameMode ? gameMode + ' Info' : 'Selection Info'}</h3>
      {!gameMode && (
        <ul className="description">
          <li>Select type of game mode to play</li>
        </ul>
      )}
      {gameMode === 'scramble' && (
        <ul className="description">
          <li>Unscramble given letters to form pokémon name</li>
          <li>Shuffle button to re-arrange letters</li>
          <li>Reveal letter for addition help</li>
        </ul>
      )}
      {gameMode === 'guess who' && (
        <ul className="description">
          <li>Guess the name of the blurred pokémon</li>
          <li>Use the spin button and unblur to help</li>
          <li>Reveal letter for addition help</li>
        </ul>
      )}
      {gameMode === 'tournament' && (
        <ul className="description">
          <li>Alternates between scramble and guess who games</li>
          <li>Scramble Game Shuffle Hint is free</li>
          <li>Reveal letter will cost points based on pokémons name</li>
          <li>Spin and Unblur will cost 10 points</li>
        </ul>
      )}
      <IconButton
        className="close-info"
        Icon={CloseIcon}
        size="20px"
        handler={() => setShowInfo(false)}
      />
    </div>
  );
}

export default Info;
