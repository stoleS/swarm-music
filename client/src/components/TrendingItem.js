import React from "react";
import PropTypes from "prop-types";

export default function TrendingItem({ song }) {
  return (
    <div className="trending-song">
      <div
        className="trending-thumbnail"
        style={{ backgroundImage: `url(${song.thumbnails.medium.url})` }}
      />
      <p>{song.title}</p>
      <button className="button button-primary" type="button">
        Play
      </button>
    </div>
  );
}

TrendingItem.propTypes = {
  song: PropTypes.object
};
