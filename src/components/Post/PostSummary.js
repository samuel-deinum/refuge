import React from "react";

const postSummary = props => {
  const { info } = props;

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
  const type = info.type.charAt(0) + info.type.slice(1).toLowerCase() + " only";

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
    </div>
  );
};

export default postSummary;
