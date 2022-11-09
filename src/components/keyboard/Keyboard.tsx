import React, { useEffect } from 'react';
import { ReactComponent as BackspaceIcon } from '../../assets/icons/backspace-outline.svg';
import { keyboardKeys } from './keyboardKeys';
import './keyboard.css';

interface KeyboardProps {
  keyboardClick: (key: string) => void;
}

function Keyboard({ keyboardClick }: KeyboardProps) {
  useEffect(() => {
    const physicalKeyClick = (e: KeyboardEvent) => {
      const keyValue = e.key.toLowerCase();
      if (keyboardKeys.includes(keyValue)) return keyboardClick(keyValue);
    };
    window.addEventListener('keydown', physicalKeyClick);
    return () => window.removeEventListener('keydown', physicalKeyClick);
  }, [keyboardClick]);

  return (
    <section className="keyboard">
      {keyboardKeys.map((key) => {
        const gridName = key === '-' ? 'hyphen' : key;
        return (
          <button
            key={key}
            style={{ gridArea: gridName }}
            data-key={key}
            className="key"
            onClick={() => keyboardClick(key)}
          >
            {key === 'backspace' ? <BackspaceIcon width="30px" /> : key}
          </button>
        );
      })}
    </section>
  );
}

export default Keyboard;
