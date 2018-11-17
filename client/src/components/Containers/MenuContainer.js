import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MenuContainer = ({ handleMenuItems }) => (
  <div className="row menu">
    <div
      className="four columns menu-item queue-menu"
      onClick={handleMenuItems}
      role="presentation"
    >
      <FontAwesomeIcon icon="list-ul" className="menu-icon" />
      <h5>Queue</h5>
    </div>
    <div
      className="four columns menu-item favourites-menu"
      onClick={handleMenuItems}
      role="presentation"
    >
      <FontAwesomeIcon icon="star" className="menu-icon" />
      <h5>Favourites</h5>
    </div>
    <div
      className="four columns menu-item playlists-menu"
      onClick={handleMenuItems}
      role="presentation"
    >
      <FontAwesomeIcon icon="file-audio" className="menu-icon" />
      <h5>Playlists</h5>
    </div>
  </div>
);

export default MenuContainer;
