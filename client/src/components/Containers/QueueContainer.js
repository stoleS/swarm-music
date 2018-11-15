import React from "react";
import QueueItem from "../QueueItem";

export default function QueueContainer({ queue, handleSongDelete }) {
  return (
    <div className="one-half column">
      <h5 className="queue-text">Queue:</h5>
      <table className="u-full-width">
        <tbody id="queue">
          {queue.splice(1).map((song, i) => (
            <QueueItem
              key={i}
              songOrder={i}
              song={song}
              handleDelete={handleSongDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
