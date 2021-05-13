import React, { Component } from "react";

export default class Login extends Component {
  state = {
    users: [],
    userName: "",
    userPassword: "",
  };

  handleRegister = () => {
    this.props.history.push("./register");
  };

  handleLogin = (e) => {
    e.preventDefault();

    let filteredArray = this.props.user.filter(
      (user) =>
        user.username === e.target[0].value &&
        user.password === e.target[1].value
    );

    if (filteredArray.length > 0) {
      this.props.loginUser(filteredArray);
      this.props.history.push("./home");
    } else {
      alert("Invalid User, Please Sign up as new user");
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={(e) => this.handleLogin(e)}>
          <input
            type="text"
            name="username"
            value={this.state.userName}
            placeholder="Enter your username"
            onChange={(e) =>
              this.setState({ userName: e.target.value.toLowerCase() })
            }
          />
          <br />
          <input
            type="password"
            value={this.state.userPassword}
            placeholder="Enter your passwords"
            onChange={(e) => this.setState({ userPassword: e.target.value })}
          />
          <br />
          <button>Log in</button>
        </form>
        <button onClick={() => this.handleRegister()}>Register</button>
      </div>
    );
  }
}
