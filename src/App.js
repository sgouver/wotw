import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Map, GoogleApiWrapper} from 'google-maps-react';



class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Wonders of the World</h1>
        </header>
        <div>
          <Map google={this.props.google} ></Map>
        </div>

      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCxyj_aE9VcVXbJ0iD9vOk8rTmYwpuGGkY'
})(App)
