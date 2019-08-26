import React, { Component } from "react";
import { connect } from "react-redux";

import { updateProfile } from "../../store/actions/authActions";
/*
TODO
Create authAction and Reducer to Update Profile information
Link to this component
*/

class EditProfile extends Component {
  state = {
    name: "",
    description: "",
    phone: "",
    address: ""
  };

  componentDidMount = () => {
    //Get Params from URL
    const url = new URL(window.location.href);
    const name = url.searchParams.get("name");
    const description = url.searchParams.get("description");
    const phone = url.searchParams.get("phone");
    const address = url.searchParams.get("address");

    this.setState({ name, description, phone, address });
  };

  componentWillUnmount = () => {
    this.props.exit();
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.updateProfile(this.state, this.props.match.params.userId);
  };

  render() {
    if (!this.props.updateSuccess) {
      return (
        <div onSubmit={this.handleSubmit} className="container">
          <form actions="" className="card" style={{ marginTop: "5vh" }}>
            <div className="card-content">
              <div className=" card-title grey-text text-darken-3">
                Update Profile
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
              <div className="input-field" className="active">
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
              <div className="input-field" className="active">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  className="materialize-textarea"
                  onChange={this.handleChange}
                  value={this.state.description}
                />
              </div>
              <div className="input-field">
                <button className="btn #7AC9C6 lighten-1 z-depth-0">
                  Update
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
      return (
        <p className="center" style={{ marginTop: "30px" }}>
          Update Complete
        </p>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    updateSuccess: state.auth.updateProfileSuccess
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateProfile: (info, id) => {
      dispatch(updateProfile(info, id));
    },
    exit: () => {
      dispatch({ type: "UPDATE_PROFILE_EXIT" });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile);
