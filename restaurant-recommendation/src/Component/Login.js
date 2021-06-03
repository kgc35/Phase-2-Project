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
      <body className="text-center">
        <main className="form-signin">
          <form onSubmit={(e) => this.handleLogin(e)} className="login">
            <h1 className="h3 mb-3 fw-normal">Sign in</h1>
            <div className="form-floating">
              <input
                id="floatingInput"
                className="form-control"
                type="text"
                name="username"
                value={this.state.userName}
                placeholder="Enter your username"
                onChange={(e) =>
                  this.setState({ userName: e.target.value.toLowerCase() })
                }
              />
              <label for="floatingInput">Username</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                value={this.state.userPassword}
                placeholder="Enter your passwords"
                onChange={(e) =>
                  this.setState({ userPassword: e.target.value })
                }
              />
              <label for="floatingInput">Password</label>
            </div>
            <button className="w-100 btn btn-sm btn-primary">Log in</button>
          </form>
          <br />
          <button
            onClick={() => this.handleRegister()}
            className="w-100 btn btn-sm btn-success"
          >
            Sign Up
          </button>
          <p class="mt-5 mb-3">©2021</p>
        </main>
      </body>
    );
  }
}
