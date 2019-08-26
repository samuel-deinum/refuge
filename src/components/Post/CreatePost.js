import React, { Component } from "react";
import { connect } from "react-redux";
import { createPost } from "../../store/actions/postActions";
import { Redirect } from "react-router-dom";
import Select from "react-select";

class CreatePost extends Component {
  state = {
    type: "",
    n: "",
    active: ""
  };

  componentWillUnmount = () => {
    this.props.clear();
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.createPost(this.state);
  };

  handleSelect = e => {
    let n = this.state.n;
    if (e.value !== "FAMILY") {
      n = "1";
    }
    this.setState({ type: e.value, n, active: "active" });
  };

  render() {
    //Grab props from post
    const { postSuccess, postError } = this.props;

    //RouteGuard (Can be added on any Component)
    if (!this.props.auth.uid) {
      return <Redirect to="/signin" />;
    } else if (postSuccess) {
      return (
        <div className="center" style={{ marginTop: "20px" }}>
          Post Complete
        </div>
      );
    }
    return (
      <div onSubmit={this.handleSubmit} className="container">
        <form actions="" className="card" style={{ marginTop: "20px" }}>
          <div className="card-content">
            <div className="card-title">New Post</div>
            <Select
              options={[
                { value: "FAMILY", label: "Family" },
                { value: "MALE", label: "Male" },
                { value: "FEMALE", label: "Female" }
              ]}
              onChange={this.handleSelect}
            />
            <div className="input-field">
              <label htmlFor="n" className={this.state.active}>
                Number of Beds
              </label>
              <input
                type="number"
                id="n"
                onChange={this.handleChange}
                value={this.state.n}
              />
            </div>
            <div className="input-field">
              <button className="btn #7AC9C6 lighten-1 z-depth-0">Post</button>
            </div>
            <p className="red-text center">{postError}</p>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    postSuccess: state.post.postSuccess,
    postError: state.post.postError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createPost: post => {
      dispatch(createPost(post));
    },
    clear: () => {
      dispatch({ type: "CLEAR_POST" });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePost);
