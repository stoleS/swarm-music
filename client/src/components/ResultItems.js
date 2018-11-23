import React from "react";
import PropTypes from "prop-types";

export default function ResultItems({
  searchResults,
  handleSongSelect,
  songId
}) {
  return (
    <div id="search-result">
      {searchResults.map((result, i) => (
        <div
          className="search-item"
          onClick={e => handleSongSelect(e)}
          role="presentation"
          data-id={songId}
        >
          <img
            className="u-pull-left"
            src={result.snippet.thumbnails.default.url}
            alt={result.snippet.title}
          />
          <h5>{result.snippet.title}</h5>
          <p>{result.snippet.channelTitle}</p>
        </div>
      ))}
    </div>
  );
}

ResultItems.propTypes = {
  searchResults: PropTypes.arrayOf(PropTypes.object),
  handleSongSelect: PropTypes.func.isRequired,
  songId: PropTypes.number
};

ResultItems.defaultProps = {
  searchResults: "",
  songId: null
};
