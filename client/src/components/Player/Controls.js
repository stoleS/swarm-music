import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default () => (
  <React.Fragment>
    <button type="button">
      <FontAwesomeIcon icon="backward" />
    </button>
    <button type="button" id="toggle">
      <FontAwesomeIcon icon="play" />
    </button>
    <button type="button" id="forward">
      <FontAwesomeIcon icon="forward" />
    </button>
  </React.Fragment>
);
