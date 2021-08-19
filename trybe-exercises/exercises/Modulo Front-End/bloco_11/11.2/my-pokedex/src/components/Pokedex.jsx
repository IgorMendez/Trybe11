import React from 'react';
import Pokemon from './Pokemon'

class Pokedex extends React.Component {
  render() {
    return (
      <section className="container-pokedex">
        {this.props.sectionPokedex.map((pokemon) => <Pokemon pokemonData={pokemon} />)}
      </section>
    )
  }
}

export default Pokedex;