import React, { Component } from "react";
import Restaurant from "./Restaurant";
import NavBar from "./NavBar";

export default class Home extends Component {
  render() {
    return (
      <div class="container container mt-4 mb-5">
        <h3 class="display-4 text-center"> Home Page </h3>
        <NavBar loginUser={this.props.loginUser} history={this.props.history} />
        <div className="row">
          {this.props.restaurants.map((restaurant) => {
            return (
              <Restaurant
                key={restaurant.id}
                restaurant={restaurant}
                handleSelectRestaurant={this.props.handleSelectRestaurant}
                history={this.props.history}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
