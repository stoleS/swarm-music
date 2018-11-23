import React from "react";
import PropTypes from "prop-types";
import QueueItem from "../Queue/QueueItem";

export default function QueueContainer({ queue, handleSongDelete }) {
  return (
    <React.Fragment>
      <h5 className="menu-title">Queue:</h5>
      <table className="u-full-width">
        <tbody id="queue">
          {queue.map((song, i) => (
            <QueueItem
              key={i}
              songOrder={i}
              song={song.snippet}
              handleDelete={handleSongDelete}
            />
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
}

QueueContainer.propTypes = {
  queue: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleSongDelete: PropTypes.func.isRequired
};
