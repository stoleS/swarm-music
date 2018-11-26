import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function BrowseMusic() {
  return (
    <div className="sidenav-group">
      <h6 className="sidenav-title">Browse Music</h6>
      <button type="button" className="sidenav-link">
        <FontAwesomeIcon icon="search" /> Discover
      </button>
      <button type="button" className="sidenav-link">
        <FontAwesomeIcon icon="chart-bar" /> Top Charts
      </button>
      <button type="button" className="sidenav-link">
        <FontAwesomeIcon icon="history" /> History
      </button>
    </div>
  );
}
