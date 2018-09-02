import React, { Component } from "react";
import { CardMedia } from "@material-ui/core";

const styles = {
  media: {
    objectFit: "cover"
  }
};

export class Thumbnail extends Component {
  render() {
    return (
      <div>
        <CardMedia
          component="img"
          height="180"
          style={styles.media}
          image="https://via.placeholder.com/320x180"
          title="Placeholder"
        />
      </div>
    );
  }
}

export default Thumbnail;
