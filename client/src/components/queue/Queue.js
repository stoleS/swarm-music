import React, { Component } from "react";
import QueueBar from "./QueueBar";
import QueueItem from "./QueueItem";
import { Paper, List, Divider } from "@material-ui/core";
import { Consumer } from "../../context";

const styles = {
  card: {
    width: 320
  }
};

export default class Queue extends Component {
  render() {
    return (
      <React.Fragment>
        <Paper style={styles.card}>
          <List component="nav" subheader={<QueueBar />}>
            <Divider />
            <Consumer>
              {({ state }) =>
                state.queue.map((song, i) => <QueueItem key={i} song={song} />)
              }
            </Consumer>
          </List>
        </Paper>
      </React.Fragment>
    );
  }
}
