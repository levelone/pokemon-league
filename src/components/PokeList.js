import React from 'react';
import PokeCell from './PokeCell';
import { pokeClasses } from '../pokeClasses';
import './styles/PokeList.css';

const PokeList = ({ handlePokeListClick }) => {
  const cells = pokeClasses.map(pokeClass => {
    return (
      <PokeCell
        key={pokeClass.id}
        pokeClass={pokeClass}
        handlePokeListClick={handlePokeListClick}
      />
    )
  })

  return (
    <section className="poke-list">
      {cells}
    </section>
  )
}

export default PokeList;
