import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/Ranking.css';
import * as userActions from '../actions';

class Ranking extends Component {
  render() {
    const getget = localStorage.getItem('getPlayer');
    console.log(getget);
    return (
      <section>
        <div>
          <h1 data-testid="ranking-title" className="ranking-title">Ranking</h1>
        </div>
        <div className="div-button">
          <Link to="/triviaquestions">
            <button
              className="btn-go-home"
              data-testid="btn-go-home"
              type="button"
            >
              Jogar Novamente
            </button>
          </Link>
        </div>
      </section>

    );
  }
}

const mapStateToProps = (state) => ({
  getScore: state,
});

// const mapDispatchToProps = {
// }

export default connect(null, mapStateToProps)(Ranking);
