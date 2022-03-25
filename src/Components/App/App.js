import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { searchResults: [{name: 'Pontes indestrutíveis', artist: 'CBJR', album: 'SEI LA', id: 1}, {name: 'name2', artist: 'artist2', album: 'album2', id: 2}]
    }
  
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults search={this.state.searchResults} />
            <Playlist />
          </div>
        </div>
      </div>
    )
  }
}

export default App;
