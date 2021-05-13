import React, { Component } from "react";
import Recommendation from "./Recommendation";

export default class RestaurantDetail extends Component {
  handleUserInput = (e) => {
    this.setState({
      userInput: e.target.value,
    });
  };

  render() {
    let restaurant = this.props.selectRestaurant;

    return (
      <div>
        {Object.keys(restaurant).length !== 0 ? (
          <div>
            <h3>{restaurant.name}</h3>
            <img src={restaurant.image} alt="restaurant image" />
            <p> Description : {restaurant.description}</p>
            <p>Address : {restaurant.address}</p>
            <p>Phone: {restaurant.telephone}</p>
            <p>Website : {restaurant.website}</p>
            <div>
              {restaurant.recommendations.map((recommendation, index) => {
                if (
                  this.props.loginUser[0].friends.includes(
                    recommendation.user
                  ) ||
                  this.props.loginUser[0].id === recommendation.user
                ) {
                  return (
                    <Recommendation
                      users={this.props.users}
                      key={index}
                      recommendation={recommendation}
                      loginUser={this.props.loginUser[0]}
                      removeReview={this.props.removeReview}
                    />
                  );
                } else {
                  return null;
                }
              })}
              <form
                className="recommendation"
                onSubmit={(e) => this.props.submitReview(e)}
              >
                <textarea
                  name="recommendation"
                  placeholder="Share your recommendation"
                  onChange={(e) => this.handleUserInput(e)}
                />
                <br />
                <button>Submit</button>
              </form>
            </div>
            <button onClick={() => this.props.history.push("/home")}>
              Home
            </button>
          </div>
        ) : (
          this.props.history.push("/")
        )}
      </div>
    );
  }
}
