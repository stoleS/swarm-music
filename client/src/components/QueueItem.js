import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default ({ song, key, handleSongDelete }) => (
  <tr>
    <td>{song.title}</td>
    <td>
      <FontAwesomeIcon icon="trash-alt" />
    </td>
    <td>
      <FontAwesomeIcon icon="play" data-id={key} onClick={handleSongDelete} />
    </td>
  </tr>
);
