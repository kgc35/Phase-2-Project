import React, { Component } from "react";
import Restaurant from "./Restaurant";
import NavBar from "./NavBar";

export default class Home extends Component {
  render() {
    return (
      <div>
        <h2>This is Home Page</h2>
        <NavBar loginUser={this.props.loginUser} history={this.props.history} />
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
    );
  }
}
