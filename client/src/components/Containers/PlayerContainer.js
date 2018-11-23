import React from "react";
import Thumbnail from "../Player/Thumbnail";
import SongInfo from "../Player/SongInfo";
import Progress from "../Player/Progress";
import Controls from "../Player/Controls";

export default function PlayerContainer() {
  return (
    <div className="row player">
      <div className="one column">
        <Thumbnail />
      </div>
      <div className="two columns">
        <SongInfo />
      </div>
      <div className="five columns progress-time">
        <Progress />
      </div>
      <div className="four columns">
        <Controls />
      </div>
    </div>
  );
}
