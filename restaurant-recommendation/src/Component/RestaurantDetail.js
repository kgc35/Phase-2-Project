import React, { Component } from "react";
import Recommendation from "./Recommendation";
import NavBar from "./NavBar";

export default class RestaurantDetail extends Component {
  handleUserInput = (e) => {
    this.setState({
      userInput: e.target.value,
    });
  };

  render() {
    let restaurant = this.props.selectRestaurant;

    return (
      <div class="container py-4 my-4 mx-auto d-flex flex-column">
        <NavBar loginUser={this.props.loginUser} history={this.props.history} />

        {Object.keys(restaurant).length !== 0 ? (
          <div>
            <button
              className="btn btn-sm btn-primary"
              onClick={() => this.props.history.push("/home")}
            >
              Back
            </button>
            <div class="row">
              <h1>{restaurant.name}</h1>
              <div class="col-md-5">
                <img
                  className="image"
                  src={restaurant.image}
                  alt="restaurant image"
                />
              </div>
              <div class="col-md-5">
                <p> Description : {restaurant.description}</p>
                <p>Address : {restaurant.address}</p>
                <p>Phone: {restaurant.telephone}</p>
                <p>Website : {restaurant.website}</p>
              </div>
              <div>
                {restaurant.recommendations.map((recommendation, index) => {
                  if (
                    this.props.loginUser[0].friends.includes(
                      recommendation.user
                    ) ||
                    this.props.loginUser[0].id === recommendation.user
                  ) {
                    return (
                      <div class="card">
                        <div class="card-body">
                          <p className="clearfix">
                            <Recommendation
                              users={this.props.users}
                              key={index}
                              recommendation={recommendation}
                              loginUser={this.props.loginUser[0]}
                              removeReview={this.props.removeReview}
                            />
                          </p>
                        </div>
                      </div>
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
                   className="textarea"
                    rows="4"
                    cols="182"
                    name="recommendation"
                    placeholder="Share your recommendation"
                    onChange={(e) => this.handleUserInput(e)}
                  />
                  <br />
                  <button className="btn btn-sm btn-primary">Submit</button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          this.props.history.push("/")
        )}
      </div>
    );
  }
}
