import React, { Component } from "react";
import SearchResults from "./SearchResults";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import { Consumer } from "../context";
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  List,
  TextField,
  InputAdornment,
  CircularProgress
} from "@material-ui/core";

const style = {
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 20
  },
  loading: {
    position: "relative",
    display: "block",
    margin: "auto",
    top: 100
  }
};

class Search extends Component {
  state = {
    searchValue: ""
  };

  handleChange = e => {
    this.setState({ searchValue: e.target.value });
  };

  render() {
    return (
      <Consumer>
        {({ state, handleSearch, handleDialog }) => (
          <React.Fragment>
            <Button
              onClick={handleDialog}
              mini
              variant="fab"
              color="primary"
              style={style.addButton}
            >
              <AddIcon />
            </Button>

            <Dialog
              fullScreen={true}
              open={state.searchOpen}
              onClose={this.handleClose}
              aria-labelledby="responsive-dialog-title"
            >
              <form onSubmit={e => handleSearch(e, this.state.searchValue)}>
                <AppBar style={{ position: "relative" }} color="default">
                  <Toolbar
                    variant="dense"
                    style={{ paddingRight: 0, paddingLeft: 16 }}
                    disableUnderline
                  >
                    <TextField
                      onChange={this.handleChange}
                      value={this.state.searchValue}
                      style={{ flex: 1 }}
                      fullWidth={true}
                      autoFocus={true}
                      placeholder="Enter song name:"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                        disableUnderline: true,
                        type: "text"
                      }}
                    />
                    <IconButton
                      color="inherit"
                      onClick={handleDialog}
                      aria-label="Close"
                    >
                      <CloseIcon />
                    </IconButton>
                  </Toolbar>
                </AppBar>
              </form>
              <List>
                <React.Fragment>
                  {state.searchLoading ? (
                    <CircularProgress style={style.loading} />
                  ) : (
                    state.search.map((song, i) => (
                      <SearchResults key={song.id} id={i} song={song} />
                    ))
                  )}
                </React.Fragment>
              </List>
            </Dialog>
          </React.Fragment>
        )}
      </Consumer>
    );
  }
}

export default Search;
