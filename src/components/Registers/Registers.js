import React, { Component } from "react";
import Modal from "./Modal";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
class Registers extends Component {
  state = {
    moduleRemove: false,
    index: null
  };

  showModule = (type, index) => {
    this.setState({ moduleRemove: type, index });
  };

  cancelModule = () => {
    this.setState({ index: null });
  };
  render() {
    //RouteGuard (Can be added on any Component)
    if (!this.props.auth.uid) {
      return <Redirect to="/signin" />;
    }

    const register = this.props.registers.map((r, i) => {
      return (
        <li className="collection-item avatar" key={r.id}>
          <i className="material-icons circle blue darken-3">
            supervisor_account
          </i>
          <div className="row">
            <div className="col l6 m6 s12">
              <span className="title" style={{ fontWeight: "bold" }}>
                {r.name}
              </span>
              <p>
                Email: {r.email}
                <br />
                Phone: {r.phone}
                <br />
                Request by: {r.contact}
              </p>
            </div>
            <div className="col l6 m6 s12">
              <a
                onClick={() => this.showModule(true, i)}
                href="#!"
                className="right"
              >
                <i className="material-icons red-text">remove</i>
              </a>
              <a
                onClick={() => this.showModule(false, i)}
                href="#!"
                className="right"
              >
                <i className="material-icons green-text">add</i>
              </a>
            </div>
          </div>
        </li>
      );
    });
    return (
      <React.Fragment>
        {this.state.index !== null ? (
          <Modal
            info={
              this.props.registers[this.state.index]
                ? this.props.registers[this.state.index]
                : {}
            }
            cancel={this.cancelModule}
            remove={this.state.moduleRemove}
          />
        ) : null}
        <div className="container">
          <h3>Register Requests</h3>
          <ul className="collection">{register}</ul>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    registers: state.firestore.ordered.register
      ? state.firestore.ordered.register
      : [],
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "register" }])
)(Registers);
