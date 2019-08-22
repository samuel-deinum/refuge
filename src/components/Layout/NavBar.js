import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import SignedInLinks from "./SignedInLinks";
import icon from "../../assets/images/refugioicon.svg";

const navBar = props => {
  const { auth } = props;

  let navClass = "nav-wrapper white";

  if (!auth.uid) {
    navClass += " hide";
  }

  return (
    <nav className={navClass}>
      <div className="container">
        <Link to="/" className="brand-logo left">
          <img src={icon} width="60px" height="auto" />
        </Link>
        <SignedInLinks />
      </div>
    </nav>
  );
};

const mapStateToProps = state => {
  return { auth: state.firebase.auth };
};

export default connect(mapStateToProps)(navBar);
