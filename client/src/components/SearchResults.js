import React from "react";
import { ListItem, ListItemText, Divider } from "@material-ui/core";
import { Consumer } from "../context";

export default props => {
  const { thumbnail_s, title, channel } = props.song;
  const listId = props.id;
  return (
    <Consumer>
      {({ handleChoice }) => (
        <React.Fragment>
          <ListItem data-id={listId} button onClick={handleChoice}>
            <img src={thumbnail_s} alt="Thumbnail" />
            <ListItemText primary={title} secondary={channel} />
          </ListItem>
          <Divider />
        </React.Fragment>
      )}
    </Consumer>
  );
};
