import React, { Component } from "react";
import QueueBar from "./QueueBar";
import QueueItem from "./QueueItem";
import { Paper, List } from "@material-ui/core";
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
          <List
            style={{ paddingBottom: 0 }}
            component="nav"
            subheader={<QueueBar />}
          >
            <Consumer>
              {({ state, handleRemove }) =>
                state.queue.map((song, i) => (
                  <QueueItem
                    key={i}
                    songNumber={i}
                    song={song}
                    handleRemove={handleRemove}
                  />
                ))
              }
            </Consumer>
          </List>
        </Paper>
      </React.Fragment>
    );
  }
}
