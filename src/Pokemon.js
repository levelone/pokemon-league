class Pokemon {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.sprite = data.sprites.front_default;
    this.type = data.types.map(function (type) { return type.type.name });
    this.abilities = data.abilities.map(function (ability) { return ability.ability.name });
    this.nickname = null;
  }
}

export default Pokemon;
