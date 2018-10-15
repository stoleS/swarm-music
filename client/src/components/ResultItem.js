import React from "react";

export default ({ result }) => {
  return (
    <div className="search-item">
      <img
        className="u-pull-left"
        src={result.thumbnail_s}
        alt={result.title}
      />
      <h5>{result.title}</h5>
      <p>{result.channel}</p>
    </div>
  );
};
