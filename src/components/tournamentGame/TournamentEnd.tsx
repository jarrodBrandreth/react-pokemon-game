import React from 'react';
import IconTextButton from '../iconTextButton/IconTextButton';
import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg';
import { ReactComponent as CircleRightIcon } from '../../assets/icons/circle-right.svg';

interface TournamentEndProps {
  score: number;
  numberOfRounds: number;
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  setNumberOfRounds: React.Dispatch<React.SetStateAction<number>>;
  setGameMode: React.Dispatch<React.SetStateAction<string | null>>;
}

function TournamentEnd({
  score,
  numberOfRounds,
  setStart,
  setNumberOfRounds,
  setGameMode,
}: TournamentEndProps) {
  const backToTournamentHome = () => {
    setStart(false);
    setNumberOfRounds(2);
  };

  return (
    <div className="tournament-end">
      <h3 className="heading">Final Results</h3>
      <div className="details">
        <p>Congratulations, Thanks for playing!</p>
        <p>
          You played {numberOfRounds} rounds with an average of {Math.floor(score / numberOfRounds)}{' '}
          points per round.
        </p>
        <p className="final-score">Final Score: {score} pts</p>
      </div>
      <div className="options">
        <IconTextButton
          className="go-home"
          text="home"
          Icon={HomeIcon}
          size="20px"
          handler={() => setGameMode(null)}
        />
        <IconTextButton
          className="play-again"
          text="play again"
          Icon={CircleRightIcon}
          size="20px"
          handler={backToTournamentHome}
        />
      </div>
    </div>
  );
}

export default TournamentEnd;
