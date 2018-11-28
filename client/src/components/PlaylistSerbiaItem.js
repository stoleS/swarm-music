import React from "react";

export default function playlistSerbiaItem({ song }) {
  const thumbnail = song.thumbnails.default.url;
  return (
    <div className="trending-srb-item playlist">
      <div
        style={{ backgroundImage: `url(${thumbnail})` }}
        className="trending-srb-thumb playlist-thumb"
      />
      <p title={song.title}>{song.title}</p>
    </div>
  );
}
