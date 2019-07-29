import React from "react";
import { Link } from "react-router-dom";

import PostSummary from "./PostSummary";

const postList = props => {
  const posts = props.posts
    ? props.posts.map(p => {
        return (
          <Link to={"/host/" + p.orgId} key={p.id}>
            <PostSummary data={p} />
          </Link>
        );
      })
    : null;
  return <div className="post-list section">{posts}</div>;
};

export default postList;
