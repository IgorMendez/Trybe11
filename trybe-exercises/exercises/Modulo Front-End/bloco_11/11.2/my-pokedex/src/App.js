import React from 'react';
import Pokedex from './components/Pokedex';
import pokemons from './data'
import './App.css';

class App extends React.Component {
  render() {
    return (
      <main>
        <h1>Pokedex</h1>
        <Pokedex sectionPokedex={pokemons}/>
      </main>
    )
  }
}

export default App;
