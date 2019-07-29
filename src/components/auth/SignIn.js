import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { signIn } from "../../store/actions/authActions";
import { connect } from "react-redux";

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
      <div onSubmit={this.handleSubmit} className="container">
        <form actions="" className="white">
          <h5 className="grey-text text-darken-3">Sign In</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
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
            <button className="btn pink lighten-1 z-depth-0">Login</button>
          </div>
          <div className="red-text center">
            {authError ? <p>{authError}</p> : null}
          </div>
        </form>
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
