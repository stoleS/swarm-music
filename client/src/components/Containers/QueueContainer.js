import React from "react";
import QueueItem from "../QueueItem";

export default function QueueContainer({ queue, handleSongDelete }) {
  return (
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
  );
}
