import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

const hostDetails = props => {
  const id = props.match.params.hostId;
  return (
    <div className="container section project-details">
      <div className="card z-depth-0">
        <div className="card-content ">
          <span className="card-title">Project {id}</span>
          <p>
            ldksafjs;lfjas;lkf jskladjfsdkla fjskladfjlsajfl;asjf
            ;laskjf;laskfjas;lkfjas;lkfjas;lkfdjas;lfkjslard
          </p>
        </div>
        <div className="card-action grey lighten-4 grey-text">
          <div>Posted By THis</div>
          <div>Blah Blah Blah</div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.hostId;
  return {
    host: state.firestore.data.hosts ? state.firestore.data.hosts[id] : {}
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "hosts" }])
)(hostDetails);
