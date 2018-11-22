import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default ({
  song,
  songOrder,
  handleSongDelete,
  handleFavouritesClick
}) => (
  <tr>
    <td>
      <FontAwesomeIcon
        icon={["far", "heart"]}
        className="favourites-icon"
        onClick={handleFavouritesClick}
      />
    </td>
    <td>
      <img src={song.snippet.thumbnails.default.url} alt="" />
    </td>
    <td>{song.snippet.title}</td>
    <td>
      <button type="button">
        <FontAwesomeIcon icon="trash-alt" />
      </button>
    </td>
    <td>
      <button type="button" className="button-primary">
        <FontAwesomeIcon
          icon="play"
          data-id={songOrder}
          onClick={handleSongDelete}
        />
      </button>
    </td>
  </tr>
);
