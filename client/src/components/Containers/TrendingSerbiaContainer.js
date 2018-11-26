import React from "react";
import PropTypes from "prop-types";

export default function TrendingSerbiaContainer({ trending }) {
  return (
    <div className="Trending">
      <h5>Trending Serbia</h5>
      <div className="trending-country">
        {trending.map(song => (
          <p>{song.snippet.title}</p>
        ))}
      </div>
    </div>
  );
}

TrendingSerbiaContainer.propTypes = {
  trending: PropTypes.arrayOf(PropTypes.object).isRequired
};
