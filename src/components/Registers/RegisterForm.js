import React, { Component } from "react";
import { connect } from "react-redux";
import { sendSignUp } from "../../store/actions/authActions";
import Select from "react-select";

class RegisterForm extends Component {
  state = {
    name: this.props.info ? this.props.info.name : "",
    email: this.props.info ? this.props.info.email : "",
    phone: this.props.info ? this.props.info.phone : "",
    contact: this.props.info ? this.props.info.contact : "",
    type: ""
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSignUp = () => {
    const info = { ...this.state };
    let check = true;
    Object.keys(info).forEach(k => {
      if (info[k] === "" || info[k] === null) {
        alert(k + " Needs to be filled");
        check = false;
      }
    });
    if (check) {
      this.props.sendSignUp(info, this.props.info.id);
    }
  };

  handleSelect = e => {
    this.setState({ type: e.value });
  };

  render() {
    if (!this.props.sendSignUpSuccess) {
      return (
        <div className="white">
          <div className="input-field">
            <label htmlFor="name" className="active">
              Organisation Name
            </label>
            <input
              type="text"
              id="name"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </div>
          <div className="input-field">
            <label htmlFor="email" className="active">
              Organisation Email
            </label>
            <input
              type="email"
              id="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </div>
          <div className="input-field">
            <label htmlFor="phone" className="active">
              Organisation Phone
            </label>
            <input
              type="text"
              id="phone"
              onChange={this.handleChange}
              value={this.state.phone}
            />
          </div>
          <div className="input-field">
            <label htmlFor="contact" className="active">
              Request Made By
            </label>
            <input
              type="text"
              id="contact"
              onChange={this.handleChange}
              value={this.state.contact}
            />
          </div>
          <Select
            options={[
              { value: "HOST", label: "Host" },
              { value: "SEEKER", label: "Seeker" }
            ]}
            onChange={this.handleSelect}
          />
          <div className="input-field">
            <button
              className="btn blue lighten-1 z-depth-0"
              onClick={this.handleSignUp}
            >
              Register
            </button>
            <button
              className="btn red z-depth-0"
              onClick={this.props.cancel}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </button>
          </div>
          {console.log(this.props.sendSignUpError)}
          {this.state.sendSignUpError ? (
            <p className="red-text center">{this.props.sendSignUpError}</p>
          ) : null}
        </div>
      );
    } else {
      return (
        <div className="White">
          <p>An email containing a sign up link has been sent.</p>
          <br />
          <div className="btn red" onClick={this.props.cancel}>
            Exit
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    authError: state.auth.authError,
    sendSignUpSuccess: state.auth.sendSignUpSuccess,
    sendSignUpError: state.auth.sendSignUpError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendSignUp: (info, id) => {
      dispatch(sendSignUp(info, id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterForm);
