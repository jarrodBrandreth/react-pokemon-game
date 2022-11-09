import React, { useState } from 'react';
import GuessWhoGame from '../guessWhoGame/GuessWhoGame';
import ScrambleGame from '../scrambleGame/ScrambleGame';
import { CurrentCharacterProps } from '../../types/Types';
import TournamentIntro from './TournamentIntro';
import TournamentEnd from './TournamentEnd';
import './tournament.css';

interface TournamentGameProps {
  character: CurrentCharacterProps;
  playerGuess: string;
  revealLetter: () => void;
  newRound: () => void;
  setGameMode: React.Dispatch<React.SetStateAction<string | null>>;
}

function TournamentGame({
  character,
  playerGuess,
  revealLetter,
  newRound,
  setGameMode,
}: TournamentGameProps) {
  const [score, setScore] = useState(0);
  const [currentRound, setCurrentRound] = useState(0);
  const [numberOfRounds, setNumberOfRounds] = useState(2);
  const [start, setStart] = useState(false);
  const tournamentEnd = currentRound === numberOfRounds;
  const revealLetterCost = -Math.floor(50 / character.name.length);

  const startTournament = () => {
    setScore(0);
    setCurrentRound(0);
    setStart(true);
  };

  const updateScore = (points: number) => {
    setScore((score) => {
      if (points + score < 0) return 0;
      return score + points;
    });
  };

  const useRevealAsLetterHint = () => {
    updateScore(revealLetterCost);
    revealLetter();
  };

  const roundEnd = () => {
    updateScore(50);
    setCurrentRound((currentRound) => currentRound + 1);
    newRound();
  };
  return (
    <>
      {!start && (
        <TournamentIntro
          numberOfRounds={numberOfRounds}
          setNumberOfRounds={setNumberOfRounds}
          play={startTournament}
        />
      )}

      {start && !tournamentEnd && (
        <div className="scoreboard">
          <div className="score">
            <span className="text">Score:</span>
            <span className="number">{score}</span>
          </div>
          <div className="round">
            <span className="text">Rounds Left:</span>
            <span className={`number ${numberOfRounds - currentRound === 1 && 'last-round'}`}>
              {numberOfRounds - currentRound > 1 ? numberOfRounds - currentRound : 'final round'}
            </span>
          </div>
        </div>
      )}
      {start && !tournamentEnd && currentRound % 2 === 0 && (
        <ScrambleGame
          character={character}
          playerGuess={playerGuess}
          revealLetter={useRevealAsLetterHint}
          roundEnd={roundEnd}
        />
      )}
      {start && !tournamentEnd && currentRound % 2 !== 0 && (
        <GuessWhoGame
          character={character}
          playerGuess={playerGuess}
          revealLetter={useRevealAsLetterHint}
          roundEnd={roundEnd}
        />
      )}
      {tournamentEnd && start && (
        <TournamentEnd
          score={score}
          numberOfRounds={numberOfRounds}
          setStart={setStart}
          setNumberOfRounds={setNumberOfRounds}
          setGameMode={setGameMode}
        />
      )}
    </>
  );
}

export default TournamentGame;
