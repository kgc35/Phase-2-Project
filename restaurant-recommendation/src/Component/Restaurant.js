import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Restaurant extends Component {
  render() {
    let restaurant = this.props.restaurant;
    return (
      <div className="col-md-4">
        <div className="card">
          <img
            className="card-img-top"
            src={restaurant.image}
            alt="restaurant image"
            onClick={() =>
              this.props.handleSelectRestaurant(restaurant, this.props)
            }
          />
          <div className="card-block p-3">
            <h3 className="card-title">{restaurant.name}</h3>{" "}
          </div>
        </div>
      </div>
    );
  }
}
