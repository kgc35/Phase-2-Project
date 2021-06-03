import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class NavBar extends Component {
  handleClick = () => {
    this.props.history.push("/profile");
  };

  render() {
    return (
      <nav className="navbar">
        {this.props.loginUser.length > 0 ? (
          <li className="nav-link">
            <img
              src={this.props.loginUser[0].profileimg}
              onClick={() => this.handleClick()}
            />
            <p onClick={() => this.handleClick()}>
              {this.props.loginUser[0].realname}
            </p>
          </li>
        ) : (
          this.props.history.push("/")
        )}
        <li className="nav-link">
          <Link className="nav-link" to="/home">
            Home
          </Link>
        </li>
        <li className="nav-link">
          <Link className="nav-link" to="/">
            Logout
          </Link>
        </li>
      </nav>
    );
  }
}
