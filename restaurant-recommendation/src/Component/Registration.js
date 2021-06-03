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
      <body className="text-center">
        <main class="form-signin">
          <form onSubmit={(e) => this.handleRegister(e)}>
            <h1 class="h3 mb-3 fw-normal"> Sign Up</h1>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                value={this.state.username}
                placeholder="Enter your username"
                onChange={(e) =>
                  this.setState({ username: e.target.value.toLowerCase() })
                }
              />
              <label for="floatingInput">Username</label>
            </div>

            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                value={this.state.password}
                placeholder="Enter your passwords"
                onChange={(e) => this.setState({ password: e.target.value })}
              />
              <label for="floatingPassword">Password</label>
            </div>

            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                value={this.state.realname}
                placeholder="Enter your name here"
                onChange={(e) => this.setState({ realname: e.target.value })}
              />
              <label for="floatingInput">Your Name</label>
            </div>

            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                value={this.state.profileimg}
                placeholder="Your image"
                onChange={(e) => this.setState({ profileimg: e.target.value })}
              />
              <label for="floatingInput">Your Image</label>
            </div>

            <div>
              <button className="w-100 btn btn-sm btn-primary">Register</button>
            </div>
          </form>
        </main>
      </body>
    );
  }
}
