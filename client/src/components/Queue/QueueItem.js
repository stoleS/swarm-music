import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function QueueItem({
  song,
  songOrder,
  handleSongDelete,
  handleFavouritesClick
}) {
  return (
    <tr>
      <td>
        <FontAwesomeIcon
          icon={["far", "heart"]}
          className="favourites-icon"
          onClick={handleFavouritesClick}
        />
      </td>
      <td>
        <img src={song.thumbnails.default.url} alt="" />
      </td>
      <td>{song.title}</td>
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
}

QueueItem.propTypes = {
  song: PropTypes.shape({
    title: PropTypes.string,
    channel: PropTypes.string,
    thumbnail: PropTypes.string
  }).isRequired,
  songOrder: PropTypes.number.isRequired,
  handleSongDelete: PropTypes.func.isRequired,
  handleFavouritesClick: PropTypes.func.isRequired
};
