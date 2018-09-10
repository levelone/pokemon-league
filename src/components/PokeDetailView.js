import React, { Component } from 'react';
import './styles/PokeDetailView.css';

class PokeDetailView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.selectedPokemon.id || 0,
      nickname: props.selectedPokemon.nickname || '',
      favoriteColor: props.selectedPokemon.favoriteColor || '',
      favoriteMoves: props.selectedPokemon.favoriteMoves || []
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handlePokeDetailSubmit(this.state);
  }

  handleNicknameChange = (event) => {
    this.setState({ nickname: event.target.value });
  }

  handleFavoriteColorChange = (event) => {
    const classname = event.target.classList[0];
    const selector = document.querySelector("." + classname);
    this.setState({ favoriteColor: selector.value });
  }

  handleFavoriteMovesChange = (event) => {
    const firstIndex = 0;
    const favoriteMoves = this.state.favoriteMoves;
    favoriteMoves.splice(firstIndex, 0, event.target.value);

    if (favoriteMoves.length > 4) {
      favoriteMoves.splice((favoriteMoves.length - 1), 1);
    }

    this.setState({ favoriteMoves: favoriteMoves })
  }

  renderSelectMovesetBox = ({ selectedPokemon }) => {
    const movesets = selectedPokemon.movesets.map((moveset, index) => {
      return <option key={index} value={moveset}>{moveset}</option>
    })
    return <select onChange={this.handleFavoriteMovesChange} >{movesets}</select>
  }

  renderFavoriteMoves = ({ selectedPokemon }) => {
    const moves = Object.assign([], selectedPokemon.favoriteMoves);
    const moveList = moves.map((move, index) => {
      if (move == '') {
        return
      } else {
        return <li key={index}>{move}</li>
      }
    })

    return(
      <ul className="poke-detail__move-list">
        {moveList}
      </ul>
    )
  }

  renderDetails = ({ selectedPokemon }) => {
    return (
      <div className="poke-detail__card">
        <img src={selectedPokemon.sprite} alt="sprite" />
        <div className="poke-detail__info">
          <h2>ID: {selectedPokemon.id} - {selectedPokemon.name}</h2>
          <p>type: {selectedPokemon.type.join(", ")}</p>
          <p>abilities: {selectedPokemon.abilities.join(", ")}</p>
        </div>
      </div>
    )
  }

  renderSelectColorBox = () => {
    return(
      <select
        className="poke-detail__select-color"
        onChange={this.handleFavoriteColorChange}
        value={this.state.favoriteColor}>
        <option value=""></option>
        <option value="green">Green</option>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="yellow">Yellow</option>
      </select>
    )
  }

  renderForm = ({ selectedPokemon }) => {
    return (
      <form className="poke-detail__form" onSubmit={this.handleSubmit}>
        <div className="poke-detail__form-data">
          <label>nickname</label>
          <input
            type="text"
            onChange={this.handleNicknameChange}
            value={this.state.nickname}
          />
        </div>

        <div className="poke-detail__form-data">
          <label>favorite color</label>
          {this.renderSelectColorBox()}
        </div>

        <div className="poke-detail__form-data">
          <label>favorite moves</label>
          {this.renderSelectMovesetBox({ selectedPokemon })}
          {this.renderFavoriteMoves({ selectedPokemon })}
        </div>

        <input
          className="poke-detail__form-submit"
          type="submit"
          value="Submit"
        />
      </form>
    )
  }

  render() {
    return (
      <div className="poke-detail">
        <span
          className="poke-detail__close"
          onClick={this.props.handlePokeDetailCancel}
        >x</span>

        {this.renderDetails({ ...this.props })}
        {this.renderForm({ ...this.props })}
      </div>
    )
  }
}

export default PokeDetailView;
