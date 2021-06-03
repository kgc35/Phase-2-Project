import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Component/Login";
import UserProfile from "./Component/User Profile";
import NavBar from "./Component/NavBar";
import Home from "./Component/Home";
import Registration from "./Component/Registration";
import Recommendation from "./Component/Recommendation";
import RestaurantDetail from "./Component/RestaurantDetail";
import { Link } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default class App extends Component {
  state = {
    users: [],
    loginUser: {},
    restaurants: [],
    selectRestaurant: {},
  };

  componentDidMount() {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((users) => {
        this.setState({ users });
      });

    fetch("http://localhost:3000/restaurants")
      .then((res) => res.json())
      .then((restaurants) => this.setState({ restaurants: restaurants }));
  }

  addFriend = (friend) => {
    let updatedUser = [...this.state.loginUser][0]; //Kent's user object
    let LoginUserID = updatedUser.id;

    if (updatedUser.friends.includes(friend.id)) {
      alert("You are already friends");
    } else {
      updatedUser.friends = [...updatedUser.friends, friend.id];
      friend.friends = [...friend.friends, LoginUserID];
    }

    let updatedUsers = [...this.state.users]; // Array of all the users
    updatedUsers[updatedUser.id - 1] = updatedUser;

    this.setState({ loginUser: [updatedUser], users: updatedUsers });

    fetch(`http://localhost:3000/users/${this.state.loginUser[0].id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        friends: updatedUser.friends,
      }),
    })
      .then((res) => res.json())
      .then(
        fetch(`http://localhost:3000/users/${friend.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            friends: friend.friends,
          }),
        })
          .then((res) => res.json())
          .then((res) => console.log(res))
      );
  };

  removeFriend = (friend) => {
    console.log(friend);

    let updatedUser = [...this.state.loginUser][0]; //Kent's user object
    let LoginUserID = updatedUser.id;

    updatedUser.friends = updatedUser.friends.filter(
      (entry) => entry !== friend.id
    );
    friend.friends = [...friend.friends].filter(
      (entry) => entry !== LoginUserID
    );

    let updatedUsers = [...this.state.users]; // Array of all the users
    updatedUsers[updatedUser.id - 1] = updatedUser;

    this.setState({ loginUser: [updatedUser], users: updatedUsers });

    fetch(`http://localhost:3000/users/${this.state.loginUser[0].id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        friends: updatedUser.friends,
      }),
    });
    // .then((res) => res.json())
    // .then(() =>
    fetch(`http://localhost:3000/users/${friend.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        friends: friend.friends,
      }),
    });
    // );
  };

  handleLoginUser = (loginUser) => {
    this.setState({
      loginUser: loginUser,
    });
  };

  handleLogOut = () => {
    this.setState({
      loginUser: {},
      selectRestaurant: {},
    });
  };

  handleSelectRestaurant = (restaurantObj, props) => {
    this.setState({
      selectRestaurant: restaurantObj,
    });
    props.history.push("/restdetail");
  };

  submitReview = (e) => {
    e.preventDefault();

    let test = this.state.selectRestaurant.recommendations.filter(
      (obj) => obj.user === this.state.loginUser[0].id
    );

    if (test.length > 0) {
      alert("You have already added a review");
      return;
    }

    console.log(this.state.selectRestaurant);
    let newArray = [
      ...this.state.selectRestaurant.recommendations,
      { user: this.state.loginUser[0].id, text: e.target[0].value },
    ]; //add the new review to the existing recommendation array

    let newSelectRestaurant = { ...this.state.selectRestaurant };
    newSelectRestaurant.recommendations = newArray; // set the key of recommendation to the array we just made

    let newRestaurants = [...this.state.restaurants];
    newRestaurants[this.state.selectRestaurant.id - 1] = newSelectRestaurant;

    this.setState({
      selectRestaurant: newSelectRestaurant,
      restaurants: newRestaurants,
    }); //update the DOM.

    fetch(
      `http://localhost:3000/restaurants/${this.state.selectRestaurant.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recommendations: newArray }),
      }
    );
  };

  removeReview = (recommendationObj) => {
    let newRecommendations = [
      ...this.state.selectRestaurant.recommendations,
    ].filter((recommendation) => recommendation !== recommendationObj); //spread the existing recommendations, then remove the one we want to delete

    let newSelectRestaurant = { ...this.state.selectRestaurant }; //spread the selected restaurant
    newSelectRestaurant.recommendations = newRecommendations; //set the recommendation array to the new one

    let newRestaurants = [...this.state.restaurants];
    newRestaurants[this.state.selectRestaurant.id - 1] = newSelectRestaurant;

    this.setState({
      selectRestaurant: newSelectRestaurant,
      restaurants: newRestaurants,
    });

    fetch(
      `http://localhost:3000/restaurants/${this.state.selectRestaurant.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recommendations: newRecommendations }),
      }
    );
  };

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route
              exact
              path="/"
              component={(props) => (
                <Login
                  {...props}
                  user={this.state.users}
                  loginUser={this.handleLoginUser}
                />
              )}
            />
            <Route
              exact
              path="/register"
              component={(props) => (
                <Registration {...props} user={this.state.users} />
              )}
            />
            <Route
              exact
              path="/home"
              component={(props) => (
                <Home
                  {...props}
                  loginUser={this.state.loginUser}
                  user={this.state.users}
                  restaurants={this.state.restaurants}
                  handleSelectRestaurant={this.handleSelectRestaurant}
                />
              )}
            />
            <Route
              exact
              path="/profile"
              component={(props) => (
                <UserProfile
                  {...props}
                  user={this.state.users}
                  loginUser={this.state.loginUser}
                  logOut={this.handleLogOut}
                  addFriend={this.addFriend}
                  removeFriend={this.removeFriend}
                />
              )}
            />
            <Route
              exact
              path="/restdetail"
              component={(props) => (
                <RestaurantDetail
                  {...props}
                  users={this.state.users}
                  selectRestaurant={this.state.selectRestaurant}
                  loginUser={this.state.loginUser}
                  submitReview={this.submitReview}
                  removeReview={this.removeReview}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}
