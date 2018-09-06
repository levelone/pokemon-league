import React, { Component } from 'react';
import './styles/PokeDetailView.css';

class PokeDetailView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      nickname: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.state.id) {
      this.setState({ ...nextProps.selectedPokemon });
    }
  }

  handleChange = (event) => {
    this.setState({
      id: this.props.selectedPokemon.id,
      nickname: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.nickname === "") {
      this.setState(this.state)
    } else {
      this.props.handlePokeDetailSubmit(this.state);
    }
  }

  renderDetails = ({ selectedPokemon, handlePokeDetailCancel }) => {
    return (
      <div className="poke-detail__card">
        <span className="poke-detail__close" onClick={handlePokeDetailCancel}>x</span>
        <img className="" src={selectedPokemon.sprite} alt="sprite" />
        <div className="">
          <h1 className="">ID: {selectedPokemon.id} - {selectedPokemon.name}</h1>
          <p className="">type: {selectedPokemon.type.join(", ")}</p>
          <p className="">abilities: {selectedPokemon.abilities.join(", ")}</p>
        </div>
      </div>
    )
  }

  renderForm = () => {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>nickname: </label>
          <input
            type="text"
            onChange={this.handleChange}
            defaultValue={this.state.nickname}
          />
        </div>

        <input type="submit" value="Submit" />
      </form>
    )
  }

  render() {
    return (
      <div className="poke-detail">
        {this.renderDetails({ ...this.props })}
        {this.renderForm()}
      </div>
    )
  }
}

export default PokeDetailView;
