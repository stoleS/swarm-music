import React from "react";
import PropTypes from "prop-types";
import TrendingSerbiaItem from "../TrendingSerbiaItem";

export default function TrendingSerbiaContainer({ trending }) {
  return (
    <div className="Trending">
      <h5>Trending Serbia</h5>
      <div className="trending-country">
        {trending.map(song => (
          <TrendingSerbiaItem song={song.snippet} />
        ))}
      </div>
    </div>
  );
}

TrendingSerbiaContainer.propTypes = {
  trending: PropTypes.arrayOf(PropTypes.object).isRequired
};
