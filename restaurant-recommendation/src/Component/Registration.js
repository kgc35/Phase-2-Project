import React, { Component } from "react";

export default class Registration extends Component {
  state = {
    username: "",
    password: "",
    realname: "",
    profileimg: "",
  };

  handleRegister = (e) => {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      password: this.state.password,
      realname: this.state.realname,
      profileimg: this.state.profileimg,
      friends: [],
    };

    let filterArr = this.props.user.filter((user) => {
      return user.username === e.target[0].value;
    });

    filterArr.length === 0 &&
    newUser.username !== "" &&
    newUser.password !== "" &&
    newUser.realname !== ""
      ? fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then(() => {
            this.props.history.push("/home");
          })
      : alert("Please try again");
  };

  render() {
    return (
      <div>
        <form onSubmit={(e) => this.handleRegister(e)}>
          <input
            type="text"
            value={this.state.username}
            placeholder="Enter your username"
            onChange={(e) =>
              this.setState({ username: e.target.value.toLowerCase() })
            }
          />
          <br />
          <input
            type="password"
            value={this.state.password}
            placeholder="Enter your passwords"
            onChange={(e) => this.setState({ password: e.target.value })}
          />
          <br />
          <input
            type="text"
            value={this.state.realname}
            placeholder="Enter your name here"
            onChange={(e) => this.setState({ realname: e.target.value })}
          />
          <br />
          <input
            type="text"
            value={this.state.profileimg}
            placeholder="Your image"
            onChange={(e) => this.setState({ profileimg: e.target.value })}
          />
          <br />
          <button>Register</button>
        </form>
      </div>
    );
  }
}
