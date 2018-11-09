import React from "react";

export default ({ currentlyPlaying }) => (
  <div
    className="player-thumb"
    id="thumbnail"
    style={{ backgroundImage: `url(${currentlyPlaying.thumbnail_h})` }}
  />
);
