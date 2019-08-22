import React, { Component } from "react";
import { connect } from "react-redux";
import { register } from "../../store/actions/authActions";
import { Link } from "react-router-dom";
class RegisterRequest extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    contact: ""
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const info = { ...this.state };
    let check = true;
    Object.keys(info).forEach(k => {
      if (info[k] === "" || info[k] === null) {
        alert(k.toUpperCase() + " needs to be filled");
        check = false;
      }
    });
    if (check) {
      this.props.register(info);
    }
  };

  render() {
    if (!this.props.regSuccess) {
      return (
        <div
          onSubmit={this.handleSubmit}
          className="container"
          style={{ marginTop: "4%" }}
        >
          <form actions="" className="white card">
            <div className="card-content">
              <h5 className="grey-text text-darken-3">Request Account</h5>
              <div className="input-field">
                <label htmlFor="name">Organisation Name</label>
                <input
                  type="text"
                  id="name"
                  onChange={this.handleChange}
                  value={this.state.name}
                />
              </div>
              <div className="input-field">
                <label htmlFor="email">Organisation Email</label>
                <input
                  type="email"
                  id="email"
                  onChange={this.handleChange}
                  value={this.state.email}
                />
              </div>
              <div className="input-field">
                <label htmlFor="phone">Organisation Phone</label>
                <input
                  type="text"
                  id="phone"
                  onChange={this.handleChange}
                  value={this.state.phone}
                />
              </div>
              <div className="input-field">
                <label htmlFor="contact">Request Made By</label>
                <input
                  type="text"
                  id="contact"
                  onChange={this.handleChange}
                  value={this.state.contact}
                />
              </div>
              <div className="input-field">
                <button
                  className="btn #7AC9C6 lighten-1 z-depth-0"
                  style={{ width: "100%" }}
                >
                  Request
                </button>
              </div>
              <div className="center">
                <span className="grey-text">Already have an Account? </span>
                <Link to="/signin" className="black-text">
                  Login
                </Link>
              </div>
            </div>
          </form>
          {this.props.regError ? (
            <p className="red-text center">{this.props.regError}</p>
          ) : null}
        </div>
      );
    } else {
      return (
        <div className="container center" style={{ marginTop: "60px" }}>
          <p className="black-text">
            You're request has been sent. A Sign Up link will be sent to you if
            you are approved.
          </p>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    regError: state.auth.regError,
    regSuccess: state.auth.regSuccess
  };
};

const mapDispatchToProps = dispatch => {
  return {
    register: info => {
      dispatch(register(info));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterRequest);
