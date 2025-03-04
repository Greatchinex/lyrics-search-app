import React, { Component } from 'react';
import axios from 'axios';

const TrackContext = React.createContext();

const reducer = (state, action) => {
    switch(action.type) {
        case "SEARCH_TRACKS":
            return {
                ...state,
                track_list: action.payload,
                heading: "Search Results"
            };
        default:
            return state; 
    }
}

class Context extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            track_list: [],
            heading: "Top 10 Tracks",
            // To replace tracks whenever there is a search and send the dispatch to the search component
            dispatch: action => this.setState(state => reducer(state, action))
        }
    }

    componentDidMount() { // https://cors-anywhere.herokuapp.com/ : To allow Access control allow origin because the MusixMatch Api has authentication
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=ng&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`)
            .then(res => {
                // console.log(res.data);
                this.setState(() => {
                    return {track_list: res.data.message.body.track_list}
                })
            })
            .catch(err => console.log(err));
    }
    

    render() {
        return (
            <TrackContext.Provider value={this.state}>
                {this.props.children}
            </TrackContext.Provider>
        )
    }
}

const Consumer = TrackContext.Consumer;

export { Context, Consumer }