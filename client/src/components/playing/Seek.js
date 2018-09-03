import React from "react";
import Slider from "@material-ui/lab/Slider";

export default () => {
  return (
    <div>
      <Slider value={75} aria-labelledby="label" style={{ padding: 0 }} />
    </div>
  );
};
