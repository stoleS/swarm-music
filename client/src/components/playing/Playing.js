import React from "react";
import { Typography } from "@material-ui/core";

export default props => {
  return (
    <React.Fragment>
      <Typography gutterBottom variant="headline" component="h2">
        {props.playing}
      </Typography>
    </React.Fragment>
  );
};
