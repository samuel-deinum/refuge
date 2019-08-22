import React, { Component } from "react";
import { connect } from "react-redux";
import { createPost } from "../../store/actions/postActions";
import { Redirect } from "react-router-dom";
import Select from "react-select";

class CreatePost extends Component {
  state = {
    type: "",
    n: "",
    description: ""
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
    this.setState({ type: e.value });
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
        <form actions="" className="white">
          <h5 className="grey-text text-darken-3">New Post</h5>
          <Select
            options={[
              { value: "ROOM", label: "Room" },
              { value: "BED", label: "Bed" }
            ]}
            onChange={this.handleSelect}
          />
          <div className="input-field">
            <label htmlFor="n">Number of Beds</label>
            <input
              type="number"
              id="n"
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
            <button className="btn pink lighten-1 z-depth-0">Post</button>
          </div>
          <p className="red-text center">{postError}</p>
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
