import React from "react";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import { IconButton } from "@material-ui/core";
import { Consumer } from "../../context";

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

export default props => {
  return (
    <Consumer>
      {({ handlePlayPause }) => (
        <React.Fragment>
          <div style={styles.controls}>
            <IconButton aria-label="Previous">
              <SkipPreviousIcon />
            </IconButton>
            <IconButton aria-label="Play/pause" onClick={handlePlayPause}>
              <PlayArrowIcon style={styles.playIcon} />
            </IconButton>
            <IconButton aria-label="Next">
              <SkipNextIcon />
            </IconButton>
          </div>
        </React.Fragment>
      )}
    </Consumer>
  );
};
