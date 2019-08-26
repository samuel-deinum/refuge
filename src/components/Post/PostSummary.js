import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { deletePost } from "../../store/actions/postActions";

class PostSummary extends Component {
  handleDelete = e => {
    e.preventDefault();
    if (window.confirm("Do you want to delete this post? ")) {
      this.props.deletePost(this.props.info.id);
    }
  };

  render() {
    const { info } = this.props;

    //Grab orgName
    const orgName = info.orgName ? info.orgName : "NAME REQUIRED";

    //Grab Plural
    const plur = parseInt(info.n) > 1 ? "s" : "";

    //Values with Bed
    let icon = "hotel";
    let title = info.n + " Bed" + plur;

    //Values with Room
    if (info.type === "FAMILY") {
      icon = "meeting_room";
      title = "1 Room, " + title;
    }

    //Get Type
    const type =
      info.type.charAt(0) + info.type.slice(1).toLowerCase() + " only";

    //ADD Post Actions
    let postActions = null;
    if (this.props.postActions) {
      postActions = (
        <div className="card-action">
          <a href="#delete" onClick={this.handleDelete}>
            Delete
          </a>
          <Link to={"/reservepost/" + info.id}>Reserve</Link>
        </div>
      );
    }

    return (
      <div className="card col l12 m12 s12">
        <div className="card-content">
          <div className="row">
            <i className="material-icons circle col l2 m2 s2">{icon}</i>
            <div className="col l5 m5 s10">
              <span className="title" style={{ fontWeight: "bold" }}>
                {orgName}
              </span>
              <div>{title}</div>
              <div>{type}</div>
            </div>
            <div className="col l5 m5 s12 offset-s2">
              <span style={{ fontSize: ".7em" }}>
                <div>{"Posted: " + info.datePosted}</div>
                <div>{"ID: " + info.id}</div>
              </span>
            </div>
          </div>
        </div>
        {postActions}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deletePost: id => {
      dispatch(deletePost(id));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(PostSummary);
