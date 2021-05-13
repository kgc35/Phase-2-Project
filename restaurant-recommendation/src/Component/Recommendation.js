import React, { Component } from "react";

export default class Recommendation extends Component {
  render() {
    let realName =
      this.props.users[this.props.recommendation.user - 1].realname;
    return (
      <div>
        <p>Recommended by: {realName} </p>
        <p>{this.props.recommendation.text}</p>
        {this.props.loginUser.id === this.props.recommendation.user ? (
          <div>
            <button
              onClick={() => this.props.removeReview(this.props.recommendation)}
            >
              Delete
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}
