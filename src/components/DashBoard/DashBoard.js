import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

import PostList from "../Post/PostList";
class DashBoard extends Component {
  state = {};
  render() {
    const { auth } = this.props;

    //RouteGuard (Can be added on any Component)
    if (!auth.uid) {
      return <Redirect to="/signin" />;
    }

    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <PostList posts={this.props.posts} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.firestore.ordered.posts,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "posts" }])
)(DashBoard);
