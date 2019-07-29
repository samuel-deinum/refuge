import React from "react";

const postSummary = props => {
  return (
    <div className="card z-depth-0 post-summary">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title">{props.data.type}</span>
        <span className="grey-text">Beds:{props.data.beds}</span>
        <p className="grey-text">{props.data.description}</p>
        <p className="grey-text">3rd September, 2019</p>
      </div>
    </div>
  );
};

export default postSummary;
