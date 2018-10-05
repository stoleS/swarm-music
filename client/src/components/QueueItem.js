import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default ({ song }) => (
  <tr>
    <td>{song}</td>
    <td>
      <FontAwesomeIcon icon="trash-alt" />
    </td>
    <td>
      <FontAwesomeIcon icon="play" />
    </td>
  </tr>
);
