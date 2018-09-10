import React from 'react';
import './styles/PokeLineupItem.css';

const PokeLineupItem = ({ handlePokeDetailShow, handlePokeLineupItemRemoval, pokeItem }) => {
  const { id, name, type, sprite, abilities, movesets, nickname, favoriteMoves, favoriteColor } = pokeItem;
  const removeItem = (event, id) => {
    event.stopPropagation();
    handlePokeLineupItemRemoval(id);
  }

  return (
    <li className="poke-item__card" data-id={id} onClick={handlePokeDetailShow}>
      <input className="poke-item__movesets" type="hidden" data-movesets={movesets} />
      <input className="poke-item__nickname" type="hidden" data-nickname={nickname} />
      <input className="poke-item__favorite-color" type="hidden" data-favorite-color={favoriteColor} />
      <input className="poke-item__favorite-moves" type="hidden" data-favorite-moves={favoriteMoves} />

      <span className="poke-item__remove" onClick={(e) => removeItem(e, id)}>x</span>
      <img className="poke-item__image" src={sprite} alt="sprite" />
      <div className="poke-item__info">
        <h1 className="poke-item__name" data-name={name}>{name}</h1>
        <p className="poke-item__type" data-type={type}>type: {type.join(", ")}</p>
        <p className="poke-item__abilities" data-abilities={abilities}>abilities: {abilities.join(", ")}</p>
      </div>
    </li>
  )
};

export default PokeLineupItem;
