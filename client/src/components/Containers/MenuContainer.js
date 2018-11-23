import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MenuContainer = ({ handleMenuItems }) => (
  <div className="row menu">
    <div
      className="four columns menu-item queue-menu"
      onClick={() => handleMenuItems("queue")}
      role="presentation"
    >
      <FontAwesomeIcon icon="list-ul" className="menu-icon" />
      <h5>Queue</h5>
    </div>
    <div
      className="four columns menu-item favourites-menu"
      onClick={() => handleMenuItems("favourites")}
      role="presentation"
    >
      <FontAwesomeIcon icon="star" className="menu-icon" />
      <h5>Favourites</h5>
    </div>
    <div
      className="four columns menu-item playlists-menu"
      onClick={() => handleMenuItems("playlists")}
      role="presentation"
    >
      <FontAwesomeIcon icon="file-audio" className="menu-icon" />
      <h5>Playlists</h5>
    </div>
  </div>
);

MenuContainer.propTypes = {
  handleMenuItems: PropTypes.func.isRequired
};

export default MenuContainer;
