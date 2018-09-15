import React from "react";
import Repaly10Icon from "@material-ui/icons/Replay10";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import Forward10Icon from "@material-ui/icons/Forward10";
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
      {({ state, handlePlayPause, handleBackwards, handleForwards }) => (
        <React.Fragment>
          <div style={styles.controls}>
            <IconButton aria-label="Previous" onClick={handleBackwards}>
              <Repaly10Icon />
            </IconButton>
            <IconButton aria-label="Play/pause" onClick={handlePlayPause}>
              {state.pause ? (
                <PauseIcon style={styles.playIcon} />
              ) : (
                <PlayArrowIcon style={styles.playIcon} />
              )}
            </IconButton>
            <IconButton aria-label="Next" onClick={handleForwards}>
              <Forward10Icon />
            </IconButton>
          </div>
        </React.Fragment>
      )}
    </Consumer>
  );
};
