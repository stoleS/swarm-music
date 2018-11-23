import React from "react";
import PropTypes from "prop-types";

export default function SongInfo({ currentlyPlaying, progress }) {
  return (
    <React.Fragment>
      <p id="songName">Some random title</p>
      <p id="songChannel">Channel name</p>
    </React.Fragment>
  );
}

SongInfo.propTypes = {
  currentlyPlaying: PropTypes.shape({
    title: PropTypes.string,
    channel: PropTypes.string
  }).isRequired
};
