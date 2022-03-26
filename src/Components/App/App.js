import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { searchResults: [
        {name: 'Pontes indestrutíveis', artist: 'CBJR', album: 'SEI LA', id: 1},
        {name: 'Valerie', artist: 'Amy whinehouse', album: 'sein', id: 2}
      ],
      playlistName: "My playlist",
      playlistTracks: [
        {name: 'Sorry not sorry', artist: 'Demi Lovato', album: 'sein', id: 3},
        {name: 'Colors', artist: 'Halsey', album: 'sein', id: 4}
      ]}

      this.addTrack = this.addTrack.bind(this);
      this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack(track){
    let tracks = this.state.playlistTracks
    if(tracks.find(item => item.id === track.id)){
      return;
    }
    tracks.push(track)
    this.setState({playlistTracks: tracks})
  }

  removeTrack(track){
    let tracks = this.state.playlistTracks.filter(item => item.id !== track.id)
    this.setState({playlistTracks: tracks})
  }



  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults search={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} />
          </div>
        </div>
      </div>
    )
  }
}

export default App;
