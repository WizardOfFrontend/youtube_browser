import React, { Component } from 'react';
import SearchBar from './components/SearchBar';
import Youtube from './apis/Youtube';
import VideoList from './components/VideoList';
import VideoDetail from './components/VideoDetail';
import './App.css';

class App extends Component {
  state = {
    videos: [],
    selectedVideo: null,
    error: ""
  };

  componentDidMount() {
    this.onSearchTermSubmit('Frozen 2')
  }

  onSearchTermSubmit = async searchTerm => {
    let response = {}
    try {
      response = await Youtube.get('/search', {
        params: {
          q: searchTerm
        }
      })
    } catch (err) {
      this.setState({
        error: err.message
      })
    }

    if (this.items) {
      this.setState({
        videos: response.data.items,
        selectedVideo: response.data.items[0]
      });
    }
  }

  onVideoSelect = video => {
    this.setState({ selectedVideo: video })

  }

  render() {
    return (
      <div className="ui container">
        <h1 className="ui center aligned icon header">
          <i className="youtube red icon"></i>
          Toby's Youtube Browser
        </h1>

        <SearchBar onFormSubmit={this.onSearchTermSubmit} />
        {this.state.error && <h2 style={{ color: "red", textAlign: "center" }}>Error : {this.state.error} <br />There is a quota limit per day for using Youtube API service <br />and many recruiters are executing this app.<br /><br />
          *****It renews on 12:00AM every night!!!***** </h2>}
        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column">
              <VideoDetail video={this.state.selectedVideo} />
            </div>
            <div className="five wide column">
              <VideoList onVideoSelect={this.onVideoSelect} videos={this.state.videos} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default App;
