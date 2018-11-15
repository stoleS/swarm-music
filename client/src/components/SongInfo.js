import React from "react";

export default ({ currentlyPlaying, progress }) => (
  <div className="song-section">
    <div id="progress">
      <div id="progress-bar" style={{ width: `70%` }} />
    </div>
    <div className="song-title">
      <h4 id="songName">Some random title</h4>
      <h6 id="songChannel">Channel name</h6>
    </div>
  </div>
);
