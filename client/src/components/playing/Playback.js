import React, { Component } from "react";
import Thumbnail from "./Thumbnail";
import Seek from "./Seek";
import Playing from "./Playing";
import Controls from "./Controls";
import {
  Card,
  CardContent,
  CardActions,
  CardActionArea
} from "@material-ui/core";
import { Consumer } from "../../context";

const styles = {
  card: {
    width: 320
  },
  media: {
    objectFit: "cover"
  }
};

export class Playback extends Component {
  render() {
    return (
      <Consumer>
        {({ state }) => (
          <Card style={styles.card}>
            <CardActionArea>
              <Thumbnail />
            </CardActionArea>
            <Seek />
            <CardContent>
              <Playing playing={state.currentlyPlaying} />
            </CardContent>
            <CardActions>
              <Controls />
            </CardActions>
          </Card>
        )}
      </Consumer>
    );
  }
}

export default Playback;
