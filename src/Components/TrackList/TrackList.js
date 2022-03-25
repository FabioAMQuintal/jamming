import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
    render() {
        return(
            <div className="TrackList">
                {
                    this.props.tracks && this.props.tracks.map(item => <Track track={item} key={item.id} />)
                }
            </div>
        )
    }
}

export default TrackList;


