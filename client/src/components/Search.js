import React from "react";

export default ({ handleSearch }) => (
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
