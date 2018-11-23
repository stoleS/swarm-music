import React from "react";
import PropTypes from "prop-types";

export default function Search({ handleSearch }) {
  return (
    <form onSubmit={e => handleSearch(e)}>
      <input
        type="text"
        placeholder="Enter song name..."
        id="song-search"
        name="search"
        autoComplete="off"
        className="u-pull-left"
      />
      <input
        id="myBtn"
        className="button-primary u-pull-right search-button"
        type="submit"
        value="Search"
      />
    </form>
  );
}

Search.propTypes = {
  handleSearch: PropTypes.func.isRequired
};
