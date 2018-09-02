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
      <div>
        <Card style={styles.card}>
          <CardActionArea>
            <Thumbnail />
          </CardActionArea>
          <Seek />
          <CardContent>
            <Playing />
          </CardContent>
          <CardActions>
            <Controls />
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default Playback;
