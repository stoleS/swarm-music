import React, { Component } from "react";
// import openSocket from "socket.io-client";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlay,
  faBackward,
  faForward,
  faTrashAlt,
  faCheck,
  faTimes,
  faListUl,
  faStar,
  faFileAudio,
  faHeart,
  faRandom,
  faRedo,
  faSearch,
  faChartBar,
  faHistory,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import searchResults from "./searchResults.json";
import topic from "./topic.json";
import trendingSrb from "./mostPopular.json";
import mixSrbija from "./mixSrbija.json";
import Search from "./components/Search";
import Modal from "./components/Containers/Modal";
import WelcomePopup from "./components/WelcomePopup";
import QueueContainer from "./components/Containers/QueueContainer";
import FavouritesContainer from "./components/Containers/FavouritesContainer";
import PlaylistsContainer from "./components/Containers/PlaylistsContainer";
import ResultItems from "./components/ResultItems";
import MenuContainer from "./components/Containers/MenuContainer";
import TrendingSerbiaContainer from "./components/Containers/TrendingSerbiaContainer";
import PlayerContainer from "./components/Containers/PlayerContainer";
import TrendingContainer from "./components/Containers/TrendingContainer";
import SidenavContainer from "./components/Containers/SidenavContainer";
import "./css/normalize.css";
import "./css/skeleton.css";
import "./App.css";

// const socket = openSocket("http://10.118.77.123:3004/");
library.add(
  faPlay,
  faBackward,
  faForward,
  faTrashAlt,
  faCheck,
  faTimes,
  faListUl,
  faStar,
  faFileAudio,
  faHeart,
  faHeartRegular,
  faRandom,
  faRedo,
  faGithub,
  faSearch,
  faChartBar,
  faHistory,
  faPlus
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      results: [],
      queue: [],
      menuOption: "player",
      topics: [],
      trendingSerbia: [],
      mixSrb: []
    };
  }

  componentWillMount() {
    this.setState({
      results: searchResults.items,
      topics: topic.items,
      trendingSerbia: trendingSrb.items,
      mixSrb: mixSrbija.items
    });
    document.addEventListener("mousedown", this.handleOutsideClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleOutsideClick, false);
  }

  handleSearch = e => {
    e.preventDefault();
    this.setState({ menuOption: "search" });
    this.modalToggle();
  };

  modalToggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  handleDeviceChoice = () => {
    this.modalToggle();
  };

  handleMenuItems = item => {
    this.setState({ menuOption: item });
    this.modalToggle();
  };

  handleOutsideClick = e => {
    if (e.target.id === "myModal") this.modalToggle();
  };

  handleFavouritesClick = () => true;

  render() {
    const {
      modal,
      results,
      queue,
      menuOption,
      topics,
      trendingSerbia,
      mixSrb
    } = this.state;
    /*     let menu;
    switch (menuOption) {
      case "queue":
        menu = <QueueContainer queue={results} />;
        break;
      case "favourites":
        menu = <FavouritesContainer />;
        break;
      case "playlists":
        menu = <PlaylistsContainer />;
        break;
      case "search":
        menu = <ResultItems searchResults={results} />;
        break;
      default:
        break;
    } */
    return (
      <React.Fragment>
        <div className="Sidenav">
          <SidenavContainer />
        </div>
        <div className="Main">
          <Search handleSearch={this.handleSearch} />
          <TrendingContainer trending={topics} />
          <hr />
          <TrendingSerbiaContainer
            trending={trendingSerbia}
            playlist={mixSrb}
          />
          <Modal open={modal}>
            {menuOption === "player" ? (
              <WelcomePopup handleDeviceChoice={this.handleDeviceChoice} />
            ) : (
              "" /* menu */
            )}
          </Modal>
          <PlayerContainer />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
