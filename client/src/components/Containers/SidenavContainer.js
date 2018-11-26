import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BrowseMusic from "../Sidenav/BrowseMusic";
import SidenavQueue from "../Sidenav/SidenavQueue";
import Playlists from "../Sidenav/Playlists";

export default function SidenavContainer() {
  return (
    <div className="sidenav-container">
      <button type="button" className="button-primary github">
        <FontAwesomeIcon icon={["fab", "github"]} /> GitHub
      </button>
      <BrowseMusic />
      <SidenavQueue />
      <Playlists />
    </div>
  );
}
