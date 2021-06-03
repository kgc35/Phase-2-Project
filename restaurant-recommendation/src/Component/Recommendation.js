import React, { Component } from "react";

export default class Recommendation extends Component {
  render() {
    let realName =
      this.props.users[this.props.recommendation.user - 1].realname;
    let imgSrc =
      this.props.users[this.props.recommendation.user - 1].profileimg;
    return (
      <div className="row">
        <div className="col-md-10">
          <div className="col-md-2">
            <img className="img img-rounded img-fluid" src={imgSrc} />
          </div>
          <p className="float-left">
            <strong>Recommended by: </strong> {realName}{" "}
          </p>
          <p>{this.props.recommendation.text}</p>
          {this.props.loginUser.id === this.props.recommendation.user ? (
            <div>
              <button
                className="btn btn-sm btn-danger"
                onClick={() =>
                  this.props.removeReview(this.props.recommendation)
                }
              >
                Delete
              </button>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
