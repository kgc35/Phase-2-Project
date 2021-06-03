import React, { Component } from "react";

export default class AllPeople extends Component {
  render() {
    return (
      <div className="allUser">
        <p className="user-name">{this.props.user.realname}</p>
        <img src={this.props.user.profileimg} className="userImage" />
        <br />
        {this.props.currentUser.friends.includes(this.props.user.id) ? (
          <button
            className="w-100 btn btn-sm btn-danger"
            onClick={() => this.props.removeFriend(this.props.user)}
          >
            Remove Friend
          </button>
        ) : (
          <button
            className="w-100 btn btn-sm btn-primary"
            onClick={() => this.props.addFriend(this.props.user)}
          >
            Add Friend
          </button>
        )}
      </div>
    );
  }
}
