import React, { Component } from 'react';
import SearchBar from './components/SearchBar';
import Youtube from './apis/Youtube';

class App extends Component {
  state = { videos: [] };

  onSearchTermSubmit = async searchTerm => {
    const response = await Youtube.get('/search', {
      params: {
        q: searchTerm
      }
    });
    this.setState({ videos: response.data.items });
  }
  render() {
    return (
      <div className="ui container">
        <h1 className="ui center aligned icon header">
          <i className="youtube red icon"></i>
          Youtube Browser
        </h1>
        <SearchBar onFormSubmit={this.onSearchTermSubmit} />
        I have {this.state.videos.length} videos.
      </div>
    )
  }
}


export default App;
