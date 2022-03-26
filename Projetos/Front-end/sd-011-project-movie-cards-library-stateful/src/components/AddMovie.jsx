import React from 'react';
import PropTypes from 'prop-types';

class AddMovie extends React.Component {
  constructor() {
    super();
    this.state = {
      subtitle: '',
      title: '',
      imagePath: '',
      storyline: '',
      rating: 0,
      genre: 'action',
    };
    this.stateSet = this.stateSet.bind(this);
    this.bonClick = this.bonClick.bind(this);
  }

  bonClick() {
    const { onClick } = this.props;
    onClick(this.state);
    this.setState({ subtitle: '',
      title: '',
      imagePath: '',
      storyline: '',
      rating: 0,
      genre: 'action' });
  }

  stateSet({ target }) {
    const { name } = target;
    this.setState({
      [name]: target.value,
    });
  }

  inputTitle(title) {
    return (
      <label data-testid="title-input-label" htmlFor="text">
        Título
        <input
          name="title"
          value={ title }
          data-testid="title-input"
          type="text"
          onChange={ this.stateSet }
        />
      </label>
    );
  }

  inputSubtitle(subtitle) {
    return (
      <label data-testid="subtitle-input-label" htmlFor="text">
        Subtítulo
        <input
          name="subtitle"
          value={ subtitle }
          data-testid="subtitle-input"
          type="text"
          onChange={ this.stateSet }
        />
      </label>
    );
  }

  inputStoryline(storyline) {
    return (
      <label data-testid="storyline-input-label" htmlFor="text">
        Sinopse
        <textarea
          name="storyline"
          value={ storyline }
          data-testid="storyline-input"
          onChange={ this.stateSet }
        />
      </label>
    );
  }

  inputImage(imagePath) {
    return (
      <label data-testid="image-input-label" htmlFor="text">
        Imagem
        <input
          name="imagePath"
          value={ imagePath }
          data-testid="image-input"
          type="text"
          onChange={ this.stateSet }
        />
      </label>
    );
  }

  inputRating(rating) {
    return (
      <label data-testid="rating-input-label" htmlFor="text">
        Avaliação
        <input
          name="rating"
          value={ rating }
          data-testid="rating-input"
          type="number"
          onChange={ this.stateSet }
        />
      </label>
    );
  }

  inputGenre(genre) {
    return (
      <label data-testid="genre-input-label" htmlFor="genre-input">
        Gênero
        <select
          name="genre"
          value={ genre }
          data-testid="genre-input"
          onChange={ this.stateSet }
        >
          <option data-testid="genre-option" value="action">Ação</option>
          <option data-testid="genre-option" value="comedy">Comédia</option>
          <option data-testid="genre-option" value="thriller">Suspense</option>
        </select>
      </label>
    );
  }

  render() {
    const { title, subtitle, imagePath, storyline, rating, genre } = this.state;
    return (
      <form data-testid="add-movie-form">
        {this.inputTitle(title)}
        {this.inputSubtitle(subtitle)}
        {this.inputStoryline(storyline)}
        {this.inputImage(imagePath)}
        {this.inputRating(rating)}
        {this.inputGenre(genre)}
        <button
          type="button"
          data-testid="send-button"
          onClick={ this.bonClick }
        >
          Adicionar filme
        </button>
      </form>
    );
  }
}

AddMovie.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AddMovie;
