import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect, Link } from "react-router-dom";

import PostList from "../Post/PostList";

const userProfile = props => {
  const { info, auth, posts } = props;
  //Add Guard
  if (!auth.uid) {
    return <Redirect to="/signin" />;
  }

  //Set Info Actions
  let infoActions = null;
  let postActions = false;
  if (auth.uid === props.match.params.userId) {
    infoActions = (
      <div className="card-action">
        <Link
          to={
            "/edituser/" +
            auth.uid +
            "?name=" +
            info.name +
            "&address=" +
            info.address +
            "&description=" +
            info.description +
            "&phone=" +
            info.phone
          }
        >
          Edit
        </Link>
      </div>
    );
    postActions = true;
  }
  return (
    <div className="container">
      <div className="row" style={{ marginTop: "10%" }}>
        <div className="card col l5 m12 s12">
          <div className="card-content ">
            <span className="card-title">{info.name}</span>
            <p>
              Address: {info.address}
              <br />
              Email: {info.email}
              <br />
              Phone: {info.phone}
              <br />
              <span className="grey-text">{info.description}</span>
            </p>
          </div>
          {infoActions}
        </div>
        {info.type === "HOST" ? (
          <div className="col l6 m12 s12 offset-l1 offset-m0 offset-s0">
            <h4 style={{ marginTop: 0 }}>My Postings</h4>
            <PostList
              posts={posts}
              filter={{ type: "orgId", value: auth.uid }}
              postActions
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.userId;
  return {
    info: state.firestore.data.users ? state.firestore.data.users[id] : {},
    posts: state.firestore.ordered.posts ? state.firestore.ordered.posts : [],
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "users" }, { collection: "posts" }])
)(userProfile);
