import React, { useState } from 'react';
import IconButton from '../IconButton/IconButton';
import { ReactComponent as CaretBackIcon } from '../../assets/icons/caret-back-outline.svg';
import { ReactComponent as CaretForwardIcon } from '../../assets/icons/caret-forward-outline.svg';
import './gameSelection.css';

// move to file if gets any bigger
const gameOptions = [
  {
    name: 'scramble',
    image: '/images/7.png',
    description: 'Test your knowledge by going through and unscrambling the pokemon names given',
  },
  {
    name: 'guess who',
    image: '/images/4.png',
    description: 'Test your knowledge by going through and naming the pokemon shown',
  },
  {
    name: 'tournament',
    image: '/images/25.png',
    description:
      'Put your knowledge to the test with 10 rounds of each game. See how many points you can get!',
  },
];

interface GameSelectionProps {
  chooseGame: (gameType: string) => void;
}

function GameSelection({ chooseGame }: GameSelectionProps) {
  const [currentlyShown, setCurrentlyShown] = useState(0);

  const showPrev = () => {
    setCurrentlyShown((currentlyShown) => {
      if (currentlyShown === 0) return gameOptions.length - 1;
      return currentlyShown - 1;
    });
  };
  const showNext = () => {
    setCurrentlyShown((currentlyShown) => {
      if (currentlyShown === gameOptions.length - 1) return 0;
      return currentlyShown + 1;
    });
  };

  return (
    <div className="game-selection">
      <h3 className="heading">Please Make A Selection</h3>
      <div className="option-container">
        <img
          className="image"
          src={process.env.PUBLIC_URL + gameOptions[currentlyShown].image}
          alt={gameOptions[currentlyShown].name}
        />
        <p className="option">{gameOptions[currentlyShown].name}?</p>
      </div>
      <p className="description">{gameOptions[currentlyShown].description}</p>
      <div className="controls">
        <div className="toggles">
          <IconButton
            Icon={CaretBackIcon}
            size="26px"
            className="toggle back hint-btn"
            handler={showPrev}
          />
          <IconButton
            Icon={CaretForwardIcon}
            size="26px"
            className="toggle forward hint-btn"
            handler={showNext}
          />
        </div>
        <button
          className="start hint-btn"
          onClick={() => chooseGame(gameOptions[currentlyShown].name)}
        >
          Start
        </button>
      </div>
    </div>
  );
}

export default GameSelection;
