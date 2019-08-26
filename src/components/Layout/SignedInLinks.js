import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { signOut } from "../../store/actions/authActions";
import M from "materialize-css";

class SignedInLinks extends Component {
  componentDidMount = () => {
    console.log("component did mount");
    let elems = document.querySelectorAll(".dropdown-trigger");
    M.Dropdown.init(elems, { inDuration: 300, outDuration: 225 });
  };

  render() {
    const { profile } = this.props;
    return (
      <React.Fragment>
        <ul className="right hide-on-med-and-down">
          {profile.admin ? (
            <li>
              <NavLink to="/registers">
                <span className="black-text">Request</span>
                {this.props.registerLength > 0 ? (
                  <span className="badge orange white-text">
                    {this.props.registerLength}
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
            <NavLink to={"/user/" + this.props.auth.uid}>
              <span className="black-text">Profile</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/user/" + this.props.auth.uid}
              className="btn btn-floating #7AC9C6 lighten-1 dropdown-trigger"
              href="#!"
              data-target="dropdown1"
            >
              {profile.name ? profile.name.charAt(0).toUpperCase() : null}
            </NavLink>
          </li>
        </ul>
        <ul className="right hide-on-large-only">
          <li>
            <NavLink
              to={"/user/" + this.props.auth.uid}
              className="btn btn-floating #7AC9C6 lighten-1 dropdown-trigger"
              href="#!"
              data-target="dropdown2"
            >
              {profile.name ? profile.name.charAt(0).toUpperCase() : null}
            </NavLink>
          </li>
        </ul>
        {/*FOR MY DROP DOWN MENU*/}
        <ul id="dropdown1" className="dropdown-content">
          <li>
            <NavLink to="/">
              <span className="black-text">Search</span>
            </NavLink>
          </li>
          <li className="divider" />
          <li>
            <a href="#!">
              <span className="black-text">Members</span>
            </a>
          </li>
          <li className="divider" />
          <li>
            <a href="#!">
              <span className="black-text">Archive</span>
            </a>
          </li>
          <li className="divider" />
          <li>
            <a onClick={this.props.signOut}>
              <span className="black-text">Logout</span>
            </a>
          </li>
          <li className="divider" />
        </ul>
        <ul id="dropdown2" className="dropdown-content">
          <li>
            <NavLink to={"/user/" + this.props.auth.uid}>
              <span className="black-text">Profile</span>
            </NavLink>
          </li>
          <li className="divider" />
          {profile.type === "HOST" ? (
            <li>
              <NavLink to="/newpost">
                <span className="black-text">New Post</span>
              </NavLink>
            </li>
          ) : null}
          <li className="divider" />
          {profile.admin ? (
            <li>
              <NavLink to="/registers">
                <span className="black-text">Request</span>
                {this.props.registerLength > 0 ? (
                  <span className="badge orange white-text">
                    {this.props.registerLength}
                  </span>
                ) : null}
              </NavLink>
            </li>
          ) : null}
          <li className="divider" />
          <li>
            <NavLink to="/">
              <span className="black-text">Search</span>
            </NavLink>
          </li>
          <li className="divider" />
          <li>
            <a href="#!">
              <span className="black-text">Members</span>
            </a>
          </li>
          <li className="divider" />
          <li>
            <a href="#!">
              <span className="black-text">Archive</span>
            </a>
          </li>
          <li className="divider" />
          <li>
            <a onClick={this.props.signOut}>
              <span className="black-text">Logout</span>
            </a>
          </li>
          <li className="divider" />
        </ul>
      </React.Fragment>
    );
  }
}

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
)(SignedInLinks);
