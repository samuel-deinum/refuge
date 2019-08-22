import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUp, emailCheck } from "../../store/actions/authActions";

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    name: "",
    phone: "",
    address: "",
    description: "",
    type: ""
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.signUp(this.state);
  };

  componentDidMount = () => {
    //Get Params from URL
    const url = new URL(window.location.href);
    const name = url.searchParams.get("name");
    const email = url.searchParams.get("email");
    const phone = url.searchParams.get("phone");
    const type = url.searchParams.get("type");

    this.setState({ name, email, phone, type });
  };

  render() {
    //Route Guard
    if (this.props.auth.uid) {
      return <Redirect to="/" />;
    }
    //Check if Proper link was used
    this.props.emailCheck(window.location.href);
    if (this.props.checkedEmail) {
      return (
        <div onSubmit={this.handleSubmit} className="container">
          <form actions="" className="card" style={{ marginTop: "5vh" }}>
            <div className="card-content">
              <div className=" card-title grey-text text-darken-3">
                Create Account
              </div>
              <div className="input-field" className="active">
                <label htmlFor="name">Organisation Name</label>
                <input
                  type="text"
                  id="name"
                  onChange={this.handleChange}
                  value={this.state.name}
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
                <label htmlFor="phone" className="active">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  onChange={this.handleChange}
                  value={this.state.phone}
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
                <label htmlFor="email" className="active">
                  Email
                </label>
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
                <button className="btn #7AC9C6 lighten-1 z-depth-0">
                  Create Account
                </button>
              </div>
              <div className="red-text center">
                {this.props.authError ? <p>{this.props.authError}</p> : null}
              </div>
            </div>
          </form>
        </div>
      );
    } else {
      return <Redirect to="/register" />;
    }
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
    checkedEmail: state.auth.checkedEmail
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: newUser => {
      dispatch(signUp(newUser));
    },
    emailCheck: href => {
      dispatch(emailCheck(href));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
