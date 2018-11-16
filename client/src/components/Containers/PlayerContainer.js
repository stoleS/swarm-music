import React from "react";
import Thumbnail from "../Thumbnail";
import SongInfo from "../SongInfo";
import Progress from "../Progress";
import Controls from "../Controls";

export default function PlayerContainer() {
  return (
    <div className="row player">
      <div className="one column">
        <Thumbnail />
      </div>
      <div className="two columns">
        <SongInfo />
      </div>
      <div className="six columns progress-time">
        <Progress />
      </div>
      <div className="three columns">
        <Controls />
      </div>
    </div>
  );
}
