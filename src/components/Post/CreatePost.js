import React, { Component } from "react";
import { connect } from "react-redux";
import { createPost } from "../../store/actions/postActions";

class CreatePost extends Component {
  state = {
    type: "",
    beds: "",
    description: "",
    restrictions: ""
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.createPost(this.state);
    this.props.history.push("/");
  };

  render() {
    return (
      <div onSubmit={this.handleSubmit} className="container">
        <form actions="" className="white">
          <h5 className="grey-text text-darken-3">New Post</h5>
          <div className="input-field">
            <label htmlFor="type">Type</label>
            <input
              type="text"
              id="type"
              onChange={this.handleChange}
              value={this.state.organisation}
            />
          </div>
          <div className="input-field">
            <label htmlFor="beds">Beds</label>
            <input
              type="text"
              id="beds"
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
            <button className="btn pink lighten-1 z-depth-0">Post</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createPost: post => {
      dispatch(createPost(post));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CreatePost);
