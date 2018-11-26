import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function BrowseMusic() {
  return (
    <div className="sidenav-group">
      <h6 className="sidenav-title">Playlists</h6>
      <button type="button" className="sidenav-link">
        <FontAwesomeIcon icon="plus" /> New Playlist
      </button>
      <button type="button" className="sidenav-link">
        <FontAwesomeIcon icon="file-audio" /> Sample Playlist 1
      </button>
      <button type="button" className="sidenav-link">
        <FontAwesomeIcon icon="file-audio" /> Sample Playlist 2
      </button>
    </div>
  );
}
