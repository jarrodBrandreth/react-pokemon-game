import React from 'react';
import './pokeball.css';

interface PokeballProps {
  pokemon: string;
}

function Pokeball({ pokemon }: PokeballProps) {
  return (
    <div className="pokeball-wrapper">
      <div className="pokeball">
        <div className="top">
          <span className="circle"></span>
        </div>
        <div className="image-container">
          <img src={pokemon} alt="pokemon" />
        </div>
        <div className="bottom"></div>
      </div>
    </div>
  );
}

export default Pokeball;
