import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { signIn } from "../../store/actions/authActions";
import { connect } from "react-redux";

import logo from "../../assets/images/refugiologo.svg";

class SignIn extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = e => {
    if (e.target.id === "email") {
      this.setState({ email: e.target.value });
    } else {
      this.setState({ password: e.target.value });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.signIn(this.state);
  };

  render() {
    const { auth, authError } = this.props;

    //RouteGuard (Can be added on any Component)
    if (auth.uid) {
      return <Redirect to="/" />;
    }

    return (
      <div
        onSubmit={this.handleSubmit}
        className="container"
        style={{ marginTop: "10%" }}
      >
        <div className="row">
          <div className="col l6 m6 s12">
            <img src={logo} />
          </div>
          <div className="col l5 m5 s12 offset-l1 offset-m1 card">
            <div className="card-content">
              <form actions="" className="white">
                <h5 className="grey-text text-darken-3">
                  Login to start searching
                </h5>
                <div className="input-field">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    onChange={this.handleChange}
                    value={this.state.email}
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    onChange={this.handleChange}
                    value={this.state.password}
                  />
                </div>
                <div className="input-field">
                  <button className="btn #7AC9C6 lighten-1 z-depth-0 col l12 m12 s12">
                    Login
                  </button>
                </div>
                <div className="red-text center">
                  {authError ? <p>{authError}</p> : null}
                </div>
                <div className="center">
                  <span className="grey-text ">Don't have an account?</span>{" "}
                  <Link to="/register" className="black-text bold">
                    Sign Up
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
        <p className="red-text center">
          This is an example site for display purposes. To login use email:
          example@refugio.com and password: 654321
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: credentials => {
      dispatch(signIn(credentials));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
