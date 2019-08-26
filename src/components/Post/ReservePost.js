import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

import { reservePost } from "../../store/actions/postActions";

class ReservePost extends Component {
  state = {
    reservedOrg: "",
    description: ""
  };

  handleSelect = e => {
    this.setState({ reservedOrg: e.value });
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("Submit");
    this.props.reservePost(this.state, this.props.post);
  };

  componentWillUnmount = () => {
    this.props.exitReserve();
  };

  render() {
    if (!this.props.reserveSuccess) {
      //Filter Options
      const selectOptions = [];
      this.props.users.forEach(e => {
        if (e.id !== this.props.auth.uid) {
          selectOptions.push({ value: e.id, label: e.name });
        }
      });
      return (
        <div onSubmit={this.handleSubmit} className="container">
          <form actions="" className="card" style={{ marginTop: "20px" }}>
            <div className="card-content">
              <div className="card-title">Reserve Post</div>
              <label>Reserve for</label>
              <Select options={selectOptions} onChange={this.handleSelect} />
              <div className="input-field">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  onChange={this.handleChange}
                  value={this.state.description}
                />
              </div>
              <div className="input-field">
                <button className="btn #7AC9C6 lighten-1 z-depth-0">
                  Reserve
                </button>
              </div>
              <p className="red-text center">{this.props.reserveError}</p>
            </div>
          </form>
        </div>
      );
    } else {
      return (
        <p className="center" style={{ marginTop: "30px" }}>
          Reservation Complete
        </p>
      );
    }
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    users: state.firestore.ordered.users ? state.firestore.ordered.users : [],
    auth: state.firebase.auth,
    post: state.firestore.ordered.posts ? state.firestore.ordered.posts[0] : {},
    reserveError: state.post.reserveError,
    reserveSuccess: state.post.reserveSuccess
  };
};

const mapDispatchToProps = dispatch => {
  return {
    reservePost: (info, id) => {
      dispatch(reservePost(info, id));
    },
    exitReserve: () => {
      dispatch({ type: "RESERVE_POST_EXIT" });
    }
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(props => [
    { collection: "users" },
    { collection: "posts", doc: props.match.params.postId }
  ])
)(ReservePost);
