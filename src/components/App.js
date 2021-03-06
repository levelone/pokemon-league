import React, { Component } from 'react';
import PokeList from './PokeList';
import PokeLineup from './PokeLineup';
import PokeDetailView from './PokeDetailView';
import Pokemon from '../Pokemon';
import './styles/App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      selectedPokemon: {},
      lineup: []
    };
  }

  findInLineup(id) {
    const lineup = Object.assign([], this.state.lineup);
    return lineup.find(pokemon => pokemon.id === Number(id));
  }

  findIndexInLineup(id) {
    const lineup = Object.assign([], this.state.lineup);
    return lineup.findIndex(pokemon => pokemon.id === Number(id));
  }

  isSelectedPokemon(id) {
    const selectedPokemon = Object.assign({}, this.state.selectedPokemon);
    return selectedPokemon.id === Number(id);
  }

  replaceInLineup(pokemon) {
    const index = this.findIndexInLineup(pokemon.id);
    const lineup = Object.assign([], this.state.lineup);
    lineup.splice(index, 1, pokemon);
    return lineup
  }

  removeInLineup(pokemon) {
    const index = this.findIndexInLineup(pokemon.id);
    const lineup = Object.assign([], this.state.lineup);
    lineup.splice(index, 1);
    return lineup
  }

  updatePokemonDetails(pokemon, data) {
    delete data['id'];
    return Object.assign({}, pokemon, data);
  }

  togglePokeListClick(id, disable = false) {
    const parentElement = document.getElementsByClassName('poke-list')[0];
    const targetClasses = parentElement.querySelectorAll("button[data-id='" + id + "']")[0].classList;
    disable ? targetClasses.remove("disabled") : targetClasses.add("disabled");
  }

  setPokemonAttrs(target) {
    return Object.assign({}, {
      id: target.dataset.id,
      name: target.querySelector('.poke-item__name').dataset.name,
      type: target.querySelector('.poke-item__type').dataset.type.split(','),
      abilities: target.querySelector('.poke-item__abilities').dataset.abilities.split(','),
      sprite: target.querySelector('.poke-item__image').src,
      movesets: target.querySelector('.poke-item__movesets').dataset.movesets.split(','),
      nickname: target.querySelector('.poke-item__nickname').dataset.nickname || '',
      favoriteMoves: target.querySelector('.poke-item__favorite-moves').dataset.favoriteMoves.split(',') || [],
      favoriteColor: target.querySelector('.poke-item__favorite-color').dataset.favoriteColor || '',
    });
  }

  addToLineup(pokemon) {
    const firstIndex = 0;
    const lineup = Object.assign([], this.state.lineup);
    const lastPokemon = lineup[lineup.length -1] || {};
    lineup.splice(firstIndex, 0, pokemon);

    if (lineup.length > 6) {
      lineup.splice((lineup.length - 1), 1);
      this.togglePokeListClick(lastPokemon.id, true);
    }

    if (this.isSelectedPokemon(lastPokemon.id)) {
      this.setState({ selectedPokemon: {}, lineup: lineup });
    } else {
      this.setState({ lineup: lineup });
    }
  }

  handlePokeListClick = (id) => {
    if (this.findInLineup(id) == null) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then(res => res.json())
        .then(data => {
          const pokemon = new Pokemon(data);
          this.addToLineup(pokemon);
          this.togglePokeListClick(pokemon.id);
        })
        .catch(error => { console.log(error) });
    }
  }

  handlePokeLineupItemRemoval = (id) => {
    const pokemon = this.findInLineup(id);
    const lineup = this.removeInLineup(pokemon);
    this.togglePokeListClick(id, true)

    if (this.isSelectedPokemon(id)) {
      this.setState({ selectedPokemon: {}, lineup })
    } else {
      this.setState({ lineup })
    }
  }

  handlePokeDetailShow = (event) => {
    const target = event.currentTarget;
    const selectedPokemon = this.setPokemonAttrs(target);
    this.setState({ selectedPokemon: selectedPokemon })
  }

  handlePokeDetailCancel = () => {
    this.setState({ selectedPokemon: {} })
  }

  handlePokeDetailSubmit = (formData) => {
    const pokemon = this.findInLineup(formData.id)
    const updatedPokemon = this.updatePokemonDetails(pokemon, formData)
    const newLineup = this.replaceInLineup(updatedPokemon);
    this.setState({ selectedPokemon: {}, lineup: newLineup })
  }

  renderLineup = () => {
    return (
      <PokeLineup
        handlePokeDetailShow={this.handlePokeDetailShow}
        handlePokeLineupItemRemoval={this.handlePokeLineupItemRemoval}
        lineup={this.state.lineup}
      />
    )
  }

  renderDetailView = () => {
    const selectedPokemon = this.state.selectedPokemon;
    const key = Math.random().toString(36).slice(2);

    if (selectedPokemon.id == null) {
      return <div/>;
    } else {
      return (
        <PokeDetailView
          key={key}
          lineup={this.state.lineup}
          selectedPokemon={this.state.selectedPokemon}
          handlePokeDetailCancel={this.handlePokeDetailCancel}
          handlePokeDetailSubmit={this.handlePokeDetailSubmit}
        />
      )
    }
  }

  renderList = () => {
    return (
      <PokeList
        handlePokeListClick={this.handlePokeListClick}
      />
    )
  }

  render() {
    return (
      <div className="App">
        <div className="top-container">
          <h1 className="title">POK&#201;MON LEAGUE</h1>
        </div>
        <div className="left-container">
          <div className="top-half-container">{this.renderLineup()}</div>
          <div className="bottom-half-container">{this.renderDetailView()}</div>
        </div>
        <div className="right-container">{this.renderList()}</div>
      </div>
    );
  }
}

export default App;
