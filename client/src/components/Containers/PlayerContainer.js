import React from "react";
import Thumbnail from "../Thumbnail";
import SongInfo from "../SongInfo";
import Controls from "../Controls";

export default function PlayerContainer() {
  return (
    <div className="one-half column">
      <Thumbnail />
      <SongInfo />
      <Controls />
    </div>
  );
}
