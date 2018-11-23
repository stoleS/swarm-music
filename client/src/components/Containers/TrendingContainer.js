import React from "react";
import PropTypes from "prop-types";
import TrendingItem from "../TrendingItem";

export default function TrendingContainer({ trending }) {
  return (
    <div className="row">
      <h5>Trending</h5>
      {trending.map((song, i) => (
        <TrendingItem song={song.snippet} />
      ))}
    </div>
  );
}

TrendingContainer.propTypes = {
  trending: PropTypes.arrayOf(PropTypes.object).isRequired
};
