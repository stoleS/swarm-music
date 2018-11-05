import React from "react";

export default ({ result, handleSongSelect, songId }) => (
  <div
    className="search-item"
    onClick={e => handleSongSelect(e)}
    role="presentation"
    data-id={songId}
  >
    <img className="u-pull-left" src={result.thumbnail_s} alt={result.title} />
    <h5>{result.title}</h5>
    <p>{result.channel}</p>
  </div>
);
