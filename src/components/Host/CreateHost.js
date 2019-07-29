import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../../store/actions/authActions";

class CreateHost extends Component {
  state = {
    email: "",
    password: "",
    organisation: "",
    address: "",
    description: "",
    restrictions: ""
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.signUp(this.state);
  };

  render() {
    //RouteGuard (Can be added on any Component)
    if (this.props.auth.uid) {
      return <Redirect to="/" />;
    }
    return (
      <div onSubmit={this.handleSubmit} className="container">
        <form actions="" className="white">
          <h5 className="grey-text text-darken-3">Register</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="text"
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
            <label htmlFor="organisation">Organisation</label>
            <input
              type="text"
              id="organisation"
              onChange={this.handleChange}
              value={this.state.organisation}
            />
          </div>
          <div className="input-field">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              onChange={this.handleChange}
              value={this.state.address}
            />
          </div>
          <div className="input-field">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              className="materialize-textarea"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="restrictions">Restrictions</label>
            <input
              type="text"
              id="restrictions"
              onChange={this.handleChange}
              value={this.state.restrictions}
            />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Register</button>
          </div>
          <div className="red-text center">
            {this.props.authError ? <p>{this.props.authError}</p> : null}
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: newUser => {
      dispatch(signUp(newUser));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateHost);
