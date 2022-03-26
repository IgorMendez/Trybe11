import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MovieList from './MovieList';
import SearchBar from './SearchBar';
import AddMovie from './AddMovie';

class MovieLibrary extends Component {
  constructor(props) {
    super(props);
    const { movies } = this.props;
    this.state = {
      searchText: '',
      bookmarkedOnly: false,
      selectedGenre: '',
      movies,
    };

    this.onBookmarkedChange = this.onBookmarkedChange.bind(this);
    this.onSearchTextChange = this.onSearchTextChange.bind(this);
    this.onSelectedGenreChange = this.onSelectedGenreChange.bind(this);
    this.addMovie = this.addOneMovie.bind(this);
  }

  onSearchTextChange({ target }) {
    const { value } = target;
    const { movies } = this.props;
    this.setState({
      searchText: value,
      movies: movies.filter((movie) => movie.title.includes(value)
      || movie.subtitle.includes(value)
      || movie.storyline.includes(value)),
    });
  }

  onBookmarkedChange() {
    const { bookmarkedOnly } = this.state;
    const { movies } = this.props;
    this.setState({
      bookmarkedOnly: !bookmarkedOnly,
      movies: movies.filter((movie) => movie.bookmarked === true),
    });
  }

  onSelectedGenreChange({ target }) {
    const { value } = target;
    const { movies } = this.props;
    console.log(movies);
    this.setState({
      selectedGenre: value,
      movies: movies.filter((movie) => movie.genre === value),
    });
  }

  addOneMovie(movie) {
    const { movies } = this.props;
    console.log(movie);
    console.log(movies);
    this.setState({
      movies: movies.concat(movie),
    });
  }

  render() {
    const { searchText, bookmarkedOnly, selectedGenre } = this.state;
    const { movies } = this.state;
    return (
      <div>
        <h2> My awesome movie library </h2>
        <SearchBar
          searchText={ searchText }
          onSearchTextChange={ this.onSearchTextChange }
          bookmarkedOnly={ bookmarkedOnly }
          onBookmarkedChange={ this.onBookmarkedChange }
          selectedGenre={ selectedGenre }
          onSelectedGenreChange={ this.onSelectedGenreChange }
        />
        <MovieList movies={ movies } />
        <AddMovie onClick={ (movie) => this.addOneMovie(movie) } />
      </div>
    );
  }
}

export default MovieLibrary;

MovieLibrary.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};
