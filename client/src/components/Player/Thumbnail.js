import React from "react";
import PropTypes from "prop-types";

export default function Thumbnail({ thumbnail }) {
  return (
    <div
      className="player-thumb"
      id="thumbnail"
      style={{ backgroundImage: "url('https://placeimg.com/640/480/any')" }}
    />
  );
}

Thumbnail.propTypes = {
  thumbnail: PropTypes.string
};

Thumbnail.defaultProps = {
  thumbnail: "https://placeimg.com/640/480/any"
};
