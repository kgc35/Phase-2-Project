import React, { Component } from "react";

export default class AllPeople extends Component {
  render() {
    // let removeSelfArray = this.props.user[0];
    // console.log(removeSelfArray);
    return (
      <div>
        <p>{this.props.user.realname}</p>
        <img src={this.props.user.profileimg} />
        {this.props.currentUser.friends.includes(this.props.user.id) ? (
          <button onClick={() => this.props.removeFriend(this.props.user)}>
            Remove Friend
          </button>
        ) : (
          <button onClick={() => this.props.addFriend(this.props.user)}>
            Add Friend
          </button>
        )}
      </div>
    );
  }
}
