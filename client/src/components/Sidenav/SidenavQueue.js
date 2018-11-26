import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function BrowseMusic() {
  return (
    <div className="sidenav-group">
      <h6 className="sidenav-title">Your Music</h6>
      <button type="button" className="sidenav-link">
        <FontAwesomeIcon icon={["far", "heart"]} /> Favourites
      </button>
      <button type="button" className="sidenav-link">
        <FontAwesomeIcon icon="list-ul" /> Queue
      </button>
    </div>
  );
}
