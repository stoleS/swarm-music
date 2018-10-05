import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlay, faBackward, faForward, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Search from './components/Search';
import Thumbnail from './components/Thumbnail';
import SongInfo from './components/SongInfo';
import Controls from './components/Controls';
import QueueItem from './components/QueueItem';
import './css/normalize.css';
import './css/skeleton.css';
import './App.css';

library.add(faPlay, faBackward, faForward, faTrashAlt);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [
        'Some Random - Title',
        'Second Random - Title',
        'Third Random - Title',
        'Fourth Title - Random',
      ],
    };
  }

  render() {
    return (
      <div className="App">
        <Search />
        <Thumbnail />
        <SongInfo />
        <Controls />
        <h5 className="queue-text">Queue:</h5>
        <table className="u-full-width">
          <tbody id="queue">
            {this.state.songs.map(song => (
              <QueueItem song={song} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
