import React, { Component } from "react";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import { IconButton } from "@material-ui/core";

const styles = {
  controls: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-evenly"
  },
  playIcon: {
    height: 38,
    width: 38
  }
};

export class Controls extends Component {
  render() {
    return (
      <div>
        <div style={styles.controls}>
          <IconButton aria-label="Previous">
            <SkipPreviousIcon />
          </IconButton>
          <IconButton aria-label="Play/pause">
            <PlayArrowIcon style={styles.playIcon} />
          </IconButton>
          <IconButton aria-label="Next">
            <SkipNextIcon />
          </IconButton>
        </div>
      </div>
    );
  }
}

export default Controls;
