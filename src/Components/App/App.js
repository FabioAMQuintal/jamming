import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [{name: 'Calypso', artist: 'Calypsão', album: 'El Calypsos', id: 1},
                      {name: 'Racionais', artist: 'Racionaiszão', album: 'El Racionais', id: 2}, 
                      {name: 'Anitta', artist: 'Anittão', album: 'El Anittas', id: 3}],
      playlistName: 'My own playlist',
      playlistTracks: [{name: 'Matue', artist: 'Matuezão', album: 'El Matue', id: 4},
                       {name: 'Whinderson', artist: 'Whindersonzão', album: 'El Whind', id: 5}, 
                       {name: 'Galvão', artist: 'Galvãozão', album: 'El Galvão', id: 6}]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
  }

  addTrack(track){
    let tracks = this.state.playlistTracks
    if(tracks.find(item => item.id === track.id)){
      return;
    }
    tracks.push(track)
    this.setState({playlistTracks: tracks})  
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks.filter(song => song.id !== track.id)
    this.setState({playlistTracks: tracks})
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name})
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
                           onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} 
                      playlistTracks={this.state.playlistTracks}
                      onRemove={this.removeTrack}
                      onNameChange={this.updatePlaylistName} />
          </div>
        </div>
      </div>
    )
  }
}

export default App;
