import React from "react";

export default ({ currentlyPlaying, progress }) => (
  <div className="song-section">
    <div id="progress">
      <div id="progress-bar" style={{ width: `${progress}%` }} />
    </div>
    <div className="song-title">
      <h4 id="songName">{currentlyPlaying.title}</h4>
      <h6 id="songChannel">{currentlyPlaying.channel}</h6>
    </div>
  </div>
);
