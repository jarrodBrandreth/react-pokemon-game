import React from 'react';
import IconButton from '../IconButton/IconButton';
import { ReactComponent as CaretSquareUpIcon } from '../../assets/icons/caret-square-up.svg';
import { ReactComponent as CaretSquareDownIcon } from '../../assets/icons/caret-square-down.svg';

interface TournamentIntroProps {
  numberOfRounds: number;
  setNumberOfRounds: React.Dispatch<React.SetStateAction<number>>;
  play: () => void;
}

function TournamentIntro({ numberOfRounds, setNumberOfRounds, play }: TournamentIntroProps) {
  return (
    <div className="tournament-intro">
      <h3 className="heading">Tournament Setup</h3>
      <div className="round-num-choice">
        <p>Number of Rounds:</p>
        <div className="set-rounds">
          <IconButton
            className="btn"
            Icon={CaretSquareDownIcon}
            size="20px"
            disabled={numberOfRounds === 2 ? true : false}
            handler={() => setNumberOfRounds((numberOfRounds) => numberOfRounds - 2)}
          />
          <span className="number">{numberOfRounds}</span>
          <IconButton
            className="btn"
            Icon={CaretSquareUpIcon}
            size="20px"
            disabled={numberOfRounds === 100 ? true : false}
            handler={() => setNumberOfRounds((numberOfRounds) => numberOfRounds + 2)}
          />
        </div>
      </div>
      <button className="play" onClick={play}>
        Play
      </button>
    </div>
  );
}

export default TournamentIntro;
