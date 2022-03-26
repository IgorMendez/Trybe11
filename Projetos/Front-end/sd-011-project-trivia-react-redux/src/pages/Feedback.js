import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/Feedback.css';

class Feedback extends Component {
  constructor() {
    super();
    this.alertScore = this.alertScore.bind(this);
    this.addPlayerLocalStorage = this.addPlayerLocalStorage.bind(this);
  }

  componentWillUnmount() {
    this.addPlayerLocalStorage();
  }

  addPlayerLocalStorage() {
    const getPlayer = JSON.parse(localStorage.getItem('state'));
    const arr = Object.values(getPlayer);
    localStorage.setItem('key', JSON.stringify(arr));
  }

  alertScore() {
    const getAssertion = JSON.parse(localStorage.getItem('state'));
    const { player } = getAssertion;
    const { assertions } = player;
    const num = 3;

    if (assertions < num) {
      return ('Podia ser melhor...');
    }
    return ('Mandou bem!');
  }

  render() {
    const getAssertion = JSON.parse(localStorage.getItem('state'));
    const { player } = getAssertion;
    return (
      <section className="section">
        <Header />
        <h1 data-testid="feedback-text">{ this.alertScore() }</h1>
        <h2 data-testid="feedback-total-score">
          { player.score }
          {' '}
          pontos
        </h2>
        <h3 data-testid="feedback-total-question">
          { player.assertions }
          {' '}
          acertos
        </h3>
        <div>Outras Seções</div>
        <div className="buttons">
          <Link to="/ranking">
            <button
              className="btn-ranking"
              data-testid="btn-ranking"
              type="button"
            // className="settings-button"
            >
              Ver Ranking
            </button>
          </Link>
          <Link to="/triviaquestions">
            <button
              className="btn-play-again"
              data-testid="btn-play-again"
              type="button"
            // className="settings-button"
            >
              Jogar Novamente
            </button>
          </Link>
        </div>
      </section>
    );
  }
}

// const mapStateToProps = (state) => ({
// });

export default connect()(Feedback);
