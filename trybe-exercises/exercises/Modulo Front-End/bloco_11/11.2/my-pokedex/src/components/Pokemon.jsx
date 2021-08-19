import React from 'react'

export default class Pokemon extends React.Component {
  render() {
    const { id, name, type, averageWeight, image, moreInfo } = this.props.pokemonData
    return (
      <div className ="each-pokemon">
        <div className="text-pokemon">
          <p>{ name }</p>
          <p>{ type }</p>
          <p>Average Weigth: { averageWeight.value }{ averageWeight.measurementUnit }</p>
        </div>
        <img src={ image } />
      </div>
    )
  }
}
