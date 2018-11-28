import React from "react";
import PropTypes from "prop-types";
import TrendingSerbiaItem from "../TrendingSerbiaItem";
import PlaylistSerbiaItem from "../PlaylistSerbiaItem";

export default function TrendingSerbiaContainer({ trending, playlist }) {
  return (
    <div className="Trending">
      <h5>Trending & Popular Serbia</h5>
      <div className="trending-container multiple">
        <div className="trending-country">
          {trending.map(song => (
            <TrendingSerbiaItem song={song.snippet} />
          ))}
        </div>
        <div className="playlist-country">
          {playlist.map(song => (
            <PlaylistSerbiaItem song={song.snippet} />
          ))}
        </div>
      </div>
    </div>
  );
}

TrendingSerbiaContainer.propTypes = {
  trending: PropTypes.arrayOf(PropTypes.object).isRequired,
  playlist: PropTypes.arrayOf(PropTypes.object).isRequired
};
