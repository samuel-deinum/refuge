import React from "react";
import { Link } from "react-router-dom";

import PostSummary from "./PostSummary";

const postList = props => {
  const posts = props.posts.map(p => {
    if (!props.filter || p[props.filter.type] === props.filter.value) {
      return <PostSummary info={p} key={p.id} />;
    }
  });
  return <div className="row">{posts}</div>;
};

export default postList;
