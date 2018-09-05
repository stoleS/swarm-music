import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import {
  ListItem,
  ListItemText,
  Divider,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import { Consumer } from "../../context";

export default props => {
  const { title } = props.song;
  const songId = props.songNumber;
  return (
    <Consumer>
      {({ handleRemove, handlePlay }) => (
        <React.Fragment>
          <Divider />
          <ListItem>
            <IconButton data-id={songId} onClick={handleRemove}>
              <DeleteIcon />
            </IconButton>
            <ListItemText primary={title} />
            <ListItemSecondaryAction>
              <IconButton data-id={songId} onClick={handlePlay}>
                <PlayArrowIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </React.Fragment>
      )}
    </Consumer>
  );
};
