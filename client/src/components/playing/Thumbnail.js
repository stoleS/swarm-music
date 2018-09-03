import React from "react";
import { CardMedia } from "@material-ui/core";

const styles = {
  media: {
    objectFit: "cover"
  }
};

export default () => {
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
};
