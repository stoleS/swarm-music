import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default () => (
  <React.Fragment>
    <button type="button" id="random" className="controls-btn">
      <FontAwesomeIcon icon="random" />
    </button>
    <button type="button" className="controls-btn">
      <FontAwesomeIcon icon="backward" />
    </button>
    <button type="button" id="toggle" className="controls-btn">
      <FontAwesomeIcon icon="play" />
    </button>
    <button type="button" id="forward" className="controls-btn">
      <FontAwesomeIcon icon="forward" />
    </button>
    <button type="button" id="repeat" className="controls-btn">
      <FontAwesomeIcon icon="redo" />
    </button>
  </React.Fragment>
);
