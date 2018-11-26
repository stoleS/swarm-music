import React from "react";
import PropTypes from "prop-types";
import TrendingItem from "../TrendingItem";

export default function TrendingContainer({ trending }) {
  return (
    <div className="Trending">
      <h5>Top Trending Music 2019 by #RedMusic</h5>
      <div className="trending-container">
        {trending.map((song, i) => (
          <TrendingItem song={song.snippet} />
        ))}
      </div>
    </div>
  );
}

TrendingContainer.propTypes = {
  trending: PropTypes.arrayOf(PropTypes.object).isRequired
};
