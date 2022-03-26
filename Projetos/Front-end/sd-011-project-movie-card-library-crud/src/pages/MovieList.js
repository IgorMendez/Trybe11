import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';
import * as movieAPI from '../services/movieAPI';

class MovieList extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      load: true,
    };
  }

  componentDidMount() {
    this.funcMovie();
  }

  async funcMovie() {
    const movies = await movieAPI.getMovies();
    this.setState({
      movies,
      load: false,
    });
  }

  render() {
    const { movies, load } = this.state;
    return (
      <div data-testid="movie-list">
        { load === true ? <Loading /> : movies
          .map((movie) => <MovieCard key={ movie.title } movie={ movie } />) }
        <Link to="/movies/new">ADICIONAR CARTÃO</Link>
      </div>
    );
  }
}

export default MovieList;

MovieList.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
};
