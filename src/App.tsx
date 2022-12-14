import React, { useState, useEffect } from 'react';
import Loader from './components/loader/Loader';
import IconButton from './components/IconButton/IconButton';
import Keyboard from './components/keyboard/Keyboard';
import ScrambleGame from './components/scrambleGame/ScrambleGame';
import GuessWhoGame from './components/guessWhoGame/GuessWhoGame';
import GameSelection from './components/gameSelection/GameSelection';
import Pokeball from './components/pokeball/Pokeball';
import TournamentGame from './components/tournamentGame/TournamentGame';
import Info from './components/info/Info';
import { ReactComponent as HomeIcon } from './assets/icons/home.svg';
import { ReactComponent as HelpIcon } from './assets/icons/help-circle.svg';
import { CharactersListProps, CurrentCharacterProps } from './types/Types';
import './App.css';

function App() {
  const [charactersList, setCharactersList] = useState<Array<CharactersListProps>>([]);
  const [currentCharacter, setCurrentCharacter] = useState<CurrentCharacterProps>();
  const [showInfo, setShowInfo] = useState(false);
  const [gameMode, setGameMode] = useState<string | null>(null);
  const [playerGuess, setPlayerGuess] = useState('');
  const [revealedLetters, setRevealedLetters] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState(false);
  const needCharacters = charactersList.length === 0;

  useEffect(() => {
    setIsLoading(true);
    const fetchCharacters = async () => {
      try {
        const charactersUrl = 'https://pokeapi.co/api/v2/pokemon?limit=151';
        const response = await fetch(charactersUrl);
        const data = await response.json();
        setCharactersList(data.results.sort(() => Math.random() - 0.5));
        setIsLoading(false);
      } catch (error) {
        setError(true);
        setIsLoading(false);
      }
    };
    fetchCharacters();
  }, [needCharacters]);

  useEffect(() => {
    setIsLoading(true);
    const fetchCurrentCharacterData = async (url: string) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        const character = {
          name: data.species.name,
          front_image: data.sprites.front_default,
          back_image: data.sprites.back_default,
        };
        setCurrentCharacter(character);
        setIsLoading(false);
      } catch (error) {
        setError(true);
        setIsLoading(false);
      }
    };
    if (charactersList.length) fetchCurrentCharacterData(charactersList[0].url);
  }, [charactersList]);

  const keyboardClick = (key: string) => {
    if (playerGuess === currentCharacter?.name) return;
    if (key === 'backspace') {
      setPlayerGuess((playerGuess) => {
        if (revealedLetters === playerGuess.length) return playerGuess;
        return playerGuess.slice(0, -1);
      });
    } else {
      setPlayerGuess((playerGuess) => {
        if (playerGuess.length === currentCharacter?.name.length) {
          return playerGuess;
        }
        return playerGuess + key;
      });
    }
  };

  const revealLetter = () => {
    if (!currentCharacter) return;
    if (playerGuess === currentCharacter.name) return;
    setPlayerGuess(currentCharacter.name.slice(0, revealedLetters + 1));
    setRevealedLetters((revealedLetters) => revealedLetters + 1);
  };

  const newRound = () => {
    if (!charactersList.length) return;
    setPlayerGuess('');
    setRevealedLetters(0);
    setCharactersList((charactersList) => {
      if (!charactersList) return [];
      return charactersList
        .filter((character) => character.name !== currentCharacter?.name)
        .sort(() => Math.random() - 0.5);
    });
  };

  const navigateHome = () => {
    if (!gameMode) return;
    newRound();
    setGameMode(null);
  };

  return (
    <div className="App">
      <main className="game">
        <div className="screen-wrap">
          <header className="header">
            <nav className="nav">
              <IconButton Icon={HomeIcon} size="22px" className="nav-btn" handler={navigateHome} />
              <IconButton
                Icon={HelpIcon}
                size="26px"
                className="nav-btn"
                handler={() => setShowInfo(!showInfo)}
              />
            </nav>
            <h1 className="title">Pok?? Fun</h1>
            <h2 className={`name ${gameMode ? gameMode : 'Welcome'}`}>
              {gameMode ? gameMode : 'Welcome!'}
            </h2>
          </header>
          <section className="screen">
            {error && <div className="error">Error Loading Pok??mon...</div>}
            {showInfo && <Info gameMode={gameMode} setShowInfo={setShowInfo} />}
            {isLoading && <Loader msg="loading" />}
            {!gameMode && !error && <GameSelection chooseGame={setGameMode} />}
            {gameMode === 'scramble' && currentCharacter && (
              <ScrambleGame
                character={currentCharacter}
                playerGuess={playerGuess}
                revealLetter={revealLetter}
                roundEnd={newRound}
              />
            )}
            {gameMode === 'guess who' && currentCharacter && (
              <GuessWhoGame
                character={currentCharacter}
                playerGuess={playerGuess}
                revealLetter={revealLetter}
                roundEnd={newRound}
              />
            )}
            {gameMode === 'tournament' && currentCharacter && (
              <TournamentGame
                character={currentCharacter}
                playerGuess={playerGuess}
                revealLetter={revealLetter}
                newRound={newRound}
                setGameMode={setGameMode}
              />
            )}
            {playerGuess === currentCharacter?.name && (
              <Pokeball pokemon={currentCharacter.front_image} />
            )}
          </section>
        </div>
        <section className="bottom">
          {gameMode && currentCharacter && <Keyboard keyboardClick={keyboardClick} />}
        </section>
      </main>
    </div>
  );
}

export default App;
