import React, { Component } from 'react';
import PokeList from './PokeList';
import PokeLineUp from './PokeLineUp';
import DetailView from './DetailView';
import Pokemon from '../Pokemon';
import './styles/App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      pokemon: {},
      lineUp: []
    };

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then(res => res.json())
      .then(data => {
        const pokemon = new Pokemon(data);
        this.state.lineUp.unshift(pokemon);
        this.setState({ lineUp: [...this.state.lineUp.slice(0, 6)] });
        console.log("LINE UP: " + this.state.lineUp.map(n => n.id) );
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <PokeList handleOnClick={this.handleOnClick} />
        <PokeLineUp lineup={this.state.lineup} />
        <DetailView pokemon={this.state.pokemon} />
      </div>
    );
  }
}

export default App;
