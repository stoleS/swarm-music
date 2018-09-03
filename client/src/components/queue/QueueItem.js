import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";

export default props => {
  return (
    <React.Fragment>
      <ListItem>
        <IconButton aria-label="Delete">
          <DeleteIcon />
        </IconButton>
        <ListItemText primary={props.song} />
        <ListItemSecondaryAction>
          <IconButton aria-label="Play">
            <PlayArrowIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </React.Fragment>
  );
};
