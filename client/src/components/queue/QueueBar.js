import React from "react";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatOneIcon from "@material-ui/icons/RepeatOne";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";

const styles = {
  flex: {
    flexGrow: 1
  }
};

export default () => {
  return (
    <React.Fragment>
      <AppBar position="static" color="default">
        <Toolbar variant="dense">
          <IconButton color="inherit" aria-label="Menu">
            <ShuffleIcon />
          </IconButton>
          <Typography
            style={styles.flex}
            variant="title"
            color="inherit"
            align="center"
          >
            Queue
          </Typography>
          <IconButton color="inherit" aria-label="repeat">
            <RepeatOneIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};
