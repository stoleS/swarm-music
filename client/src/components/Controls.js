import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default () => (
  <div className="song-controls">
    <button type="button">
      <FontAwesomeIcon icon="backward" />
    </button>
    <button type="button" className="button-primary" id="toggle">
      <FontAwesomeIcon icon="play" />
    </button>
    <button type="button" id="forward">
      <FontAwesomeIcon icon="forward" />
    </button>
  </div>
);
