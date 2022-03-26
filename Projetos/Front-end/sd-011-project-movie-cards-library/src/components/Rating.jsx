import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Rating extends Component {
  render() {
    const { rating } = this.props;
    return (
      <div>
        <p className="movie-card-rating">
          <span className="rating">{ rating }</span>
        </p>
      </div>
    );
  }
}

Rating.defaultProps = {
  rating: 1,
};

Rating.propTypes = {
  rating: PropTypes.number,
};
