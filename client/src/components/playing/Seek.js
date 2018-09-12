import React from "react";
import Slider from "@material-ui/lab/Slider";
import { Consumer } from "../../context";

export default () => {
  return (
    <Consumer>
      {({ state }) => (
        <React.Fragment>
          <Slider
            value={state.seek}
            aria-labelledby="label"
            style={{ padding: 0 }}
          />
        </React.Fragment>
      )}
    </Consumer>
  );
};
