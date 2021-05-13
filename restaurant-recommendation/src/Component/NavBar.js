import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class NavBar extends Component {
  handleClick = () => {
    this.props.history.push("/profile");
  };

  render() {
    return (
      <div>
        {this.props.loginUser.length > 0 ? (
          <ul>
            <p>{this.props.loginUser[0].realname} is logged in</p>
            <img
              src={this.props.loginUser[0].profileimg}
              onClick={() => this.handleClick()}
            />
          </ul>
        ) : (
          this.props.history.push("/")
        )}
        <li>Contact</li>
      </div>
    );
  }
}
