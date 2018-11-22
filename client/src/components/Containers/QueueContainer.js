import React from "react";
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
              song={song}
              handleDelete={handleSongDelete}
            />
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
}
