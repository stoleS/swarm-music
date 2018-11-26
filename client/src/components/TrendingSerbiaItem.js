import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TrendingSerbiaItem({ song }) {
  const thumbnail = song.thumbnails.default.url;
  return (
    <div className="trending-srb-item">
      <div
        style={{ backgroundImage: `url(${thumbnail})` }}
        className="trending-srb-thumb"
      />
      <p>{song.title}</p>
      <button type="button" className="controls-btn">
        <FontAwesomeIcon icon="play" />
      </button>
      <button type="button" className="controls-btn">
        <FontAwesomeIcon icon="plus" />
      </button>
    </div>
  );
}

TrendingSerbiaItem.propTypes = {
  song: PropTypes.object.isRequired
};
