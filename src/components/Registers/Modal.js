import React, { Component } from "react";
import { connect } from "react-redux";

import RegisterForm from "./RegisterForm";
import "./Modal.css";
import { deleteRegister } from "../../store/actions/authActions";

class Modal extends Component {
  state = {
    translateY: -200,
    opacity: 0
  };

  componentDidMount = () => {
    this.setState({ translateY: 0, opacity: 1 });
  };

  handleDelete = id => {
    this.props.deleteRegister(id);
    this.props.cancel();
  };

  render() {
    //Grab Props
    const { info, cancel, remove } = this.props;

    //CARD TITLE
    const cardTitle = remove ? "Remove Organisation" : "Register Organisation";

    //CARD INFO
    const cardInfo = remove ? (
      <React.Fragment>
        <span className="title" style={{ fontWeight: "bold" }}>
          {info.name}
        </span>
        <p>
          Email: {info.email}
          <br />
          Phone: {info.phone}
          <br />
          Request by: {info.contact}
        </p>
      </React.Fragment>
    ) : (
      <RegisterForm info={info} cancel={cancel} />
    );
    //CARD ACTIONS
    const cardActions = remove ? (
      <div className="card-action">
        <a className="btn #7AC9C6" onClick={() => this.handleDelete(info.id)}>
          Remove
        </a>
        <a
          className="btn orange"
          style={{ marginLeft: "10px" }}
          onClick={cancel}
        >
          Cancel
        </a>
      </div>
    ) : null;

    return (
      <div
        className={remove ? "Modal" : "Modal Scroll"}
        style={{
          transform: "translateY(" + this.state.translateY + "%)",
          opacity: this.state.opacity
        }}
      >
        <div className="card">
          <div className="card-content">
            <span className="card-title">{cardTitle}</span>
            {cardInfo}
            <br />
            {cardActions}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteRegister: id => {
      dispatch(deleteRegister(id));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Modal);
