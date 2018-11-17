import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const WelcomePopup = ({ handleDeviceChoice }) => (
  <React.Fragment>
    <h5>Would you like to set this device as your main player?</h5>
    <button
      type="button"
      className="button-primary"
      onClick={handleDeviceChoice}
    >
      <FontAwesomeIcon icon="check" /> Confirm
    </button>
    <button type="button" className="button" onClick={handleDeviceChoice}>
      <FontAwesomeIcon icon="times" /> Decline
    </button>
  </React.Fragment>
);

export default WelcomePopup;
