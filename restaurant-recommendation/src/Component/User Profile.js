import React, { Component } from "react";
import AllPeople from "./AllPeople";
import NavBar from "./NavBar";

export default class userProfile extends Component {
  state = {
    searchText: "",
  };

  handleSearch = (e) => {
    this.setState({
      searchText: e,
    });
  };

  render() {
    let currentUser = this.props.loginUser[0];
    const removeSelf = this.props.user.filter((user) => user !== currentUser);
    const searchFilter = removeSelf.filter((user) =>
      user.realname.toLowerCase().includes(this.state.searchText.toLowerCase())
    );

    return (
      <div>
        <NavBar history={this.props.history} loginUser={this.props.loginUser} />
        <div>
          {this.props.loginUser.length > 0 ? (
            <ul>
              <img src={currentUser.profileimg} alt="user profile image" />
              <li>User name: {currentUser.username} </li>
              <li>Real name: {currentUser.realname}</li>
              <button onClick={() => this.props.logOut()}>Logout</button>
              <button onClick={() => this.props.history.push("/home")}>
                Home
              </button>
            </ul>
          ) : (
            this.props.history.push("/")
          )}
        </div>
        <form className="search">
          <input
            type="text"
            value={this.state.searchText}
            onChange={(e) => this.handleSearch(e.target.value)}
          />
        </form>
        <div>
          {this.props.loginUser.length > 0
            ? searchFilter.map((user) => {
                return (
                  <AllPeople
                    user={user}
                    currentUser={currentUser}
                    key={user.id}
                    addFriend={this.props.addFriend}
                    removeFriend={this.props.removeFriend}
                  />
                );
              })
            : this.props.history.push("/")}
        </div>
      </div>
    );
  }
}
