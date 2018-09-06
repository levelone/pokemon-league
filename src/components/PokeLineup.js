import React from 'react';
import PokeLineupItem from './PokeLineupItem';
import './styles/PokeLineup.css';

const PokeLineup = ({ handlePokeDetailShow, handlePokeLineupItemRemoval, lineup }) => {
  const lineupList = lineup.map(pokeItem => {
    return(
      <PokeLineupItem
        key={pokeItem.id}
        pokeItem={pokeItem}
        handlePokeLineupItemRemoval={handlePokeLineupItemRemoval}
        handlePokeDetailShow={handlePokeDetailShow}
      />
    )
  });

  return(
    <ul className="poke-lineup">
      {lineupList}
    </ul>
  )
}

export default PokeLineup;
