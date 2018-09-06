import React from 'react';
import sprites from '../assets/poke-sprites.png';
import './styles/PokeCell.css';

const PokeCell = ({ pokeClass, handlePokeListClick }) => {
  const { id, backgroundPosition } = pokeClass;
  const style = { backgroundImage: `url(${sprites})`, backgroundPosition };

  return (
    <button
      data-id={id}
      onClick={() => handlePokeListClick(id)}
      style={style}
      className="poke-cell">
    </button>
  )
};

export default PokeCell;
