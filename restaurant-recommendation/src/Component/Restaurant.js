import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Restaurant extends Component {
  render() {
    let restaurant = this.props.restaurant;
    return (
      <div>
        <h3>{restaurant.name}</h3>
        <img
          src={restaurant.image}
          alt="restaurant image"
          onClick={() =>
            this.props.handleSelectRestaurant(restaurant, this.props)
          }
        />
      </div>
    );
  }
}
