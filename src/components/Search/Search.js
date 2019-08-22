import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import Select from "react-select";

import PostList from "../Post/PostList";

class Search extends Component {
  state = {
    filter: null
  };

  handleSelect = e => {
    let filter = e.value === "ALL" ? null : { type: "type", value: e.value };

    this.setState({ filter });
  };

  render() {
    const { auth, posts } = this.props;

    //RouteGuard (Can be added on any Component)
    if (!auth.uid) {
      return <Redirect to="/signin" />;
    }

    return (
      <div className="container">
        <div style={{ marginTop: "10px" }}>
          <Select
            options={[
              { value: "FAMILY", label: "Family Only" },
              { value: "MALE", label: "Male Only" },
              { value: "FEMALE", label: "Female Only" },
              { value: "ALL", label: "View All" }
            ]}
            onChange={this.handleSelect}
            defaultInputLabel="ALL"
          />
        </div>
        <PostList posts={posts} filter={this.state.filter} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.firestore.ordered.posts ? state.firestore.ordered.posts : [],
    auth: state.firebase.auth,
    users: state.firestore.users ? state.firestore.users : {}
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "posts" }, { collection: "users" }])
)(Search);
