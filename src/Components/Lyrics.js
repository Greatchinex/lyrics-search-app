import React, { Component } from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';
import Moment from 'react-moment'; // For Formatting Date

export class Lyrics extends Component {

    // This state is set up in this component instead of the Context Api because i only need the state for this component
    constructor(props) {
        super(props)
    
        this.state = {
            tracks: {},
            lyrics: {} 
        }
    }
    
    componentDidMount() {
        // this.props.match.params.id: Gets the track id from the react router in the url
        axios.get(`http://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`)
            .then(res => {
                // console.log(res.data);
                this.setState(() => {
                    return {lyrics: res.data.message.body.lyrics}
                });
                // After Getting the lyrics the make another request
                return axios.get(`http://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`)
            })
                // For the second request
                .then(res => {
                    // console.log(res.data);
                    this.setState(() => {
                        return {track: res.data.message.body.track}
                    });
                })
            .catch(err => console.log(err));
    }

    render() {
        const {track, lyrics} = this.state;
        // Object.keys(track).length: Checking if there is any key in the Object Cause objects are key value pairs.
        if(track === undefined || lyrics === undefined || Object.keys(track).length === 0 || Object.keys(lyrics).length === 0) {
            return <Spinner />
        } else {
            return (
                <React.Fragment>
                    <Link to="/" className="btn btn-dark btn-sm mb-4">Go Back</Link>
                    <div className="card">
                        <h5 className="card-header">
                            {track.track_name} By <span className="text-secondary">{track.artist_name}</span>
                        </h5>
                        <div className="card-body">
                            <p className="card-text">
                                {lyrics.lyrics_body}
                            </p>
                        </div>
                    </div>

                    <ul className="list-group mt-3">
                        <li className="list-group-item">
                            <strong>Album ID</strong>: {track.album_id}
                        </li>
                        <li className="list-group-item">
                            <strong>Song Genre</strong>: {track.primary_genres.music_genre_list[0].music_genre.music_genre_name} {/* track.primary_genres.music_genre_list[0].music_genre.music_genre_name: Data Structure to get A song Genre from the MusixMatch Api */}
                        </li>
                        <li className="list-group-item">
                            <strong>Explicit Words</strong>: {track.explicit === 0 ? "No" : "Yes"}
                        </li>
                        <li className="list-group-item">
                            <strong>Release Date</strong>: <Moment format="MM/DD/YYYY"> {track.first_release_date} </Moment>  
                        </li>
                    </ul>
                </React.Fragment>
            )
        }
    }
}

export default Lyrics
