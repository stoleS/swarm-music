import React from "react";

export default function TrendingItem({ song }) {
  return (
    <div className="four columns">
      <img src={song.thumbnails.medium.url} alt="" />
    </div>
  );
}
