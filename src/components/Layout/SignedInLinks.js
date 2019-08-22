import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { signOut } from "../../store/actions/authActions";

const signedInLinks = props => {
  const { profile } = props;
  return (
    <ul className="right">
      {profile.admin ? (
        <li>
          <NavLink to="/registers">
            <span className="black-text">Request</span>
            {props.registerLength > 0 ? (
              <span className="badge blue white-text">
                {props.registerLength}
              </span>
            ) : null}
          </NavLink>
        </li>
      ) : null}
      {profile.type === "HOST" ? (
        <li>
          <NavLink to="/newpost">
            <span className="black-text">New Post</span>
          </NavLink>
        </li>
      ) : null}

      <li>
        <a onClick={props.signOut}>
          <span className="black-text">Logout</span>
        </a>
      </li>
      <li>
        <NavLink
          to={"/user/" + props.auth.uid}
          className="btn btn-floating #7AC9C6 lighten-1"
        >
          {profile.name ? profile.name.charAt(0).toUpperCase() : null}
        </NavLink>
      </li>
    </ul>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    registerLength: state.firestore.ordered.register
      ? state.firestore.ordered.register.length
      : null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => {
      dispatch(signOut());
    }
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "register" }])
)(signedInLinks);
