import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MapContainer from './MapContainer';
import SideBar from './sidebar';

class App extends Component {
  constructor(props) {
    super(props)
      this.state = {
          wonders: require('./wotwdata.json'),
          showingInfoWindow: false,
          activeMarker: {},
          selectedPlace: {},
          data: []
        }
  }

  componentDidMount() {
    this.getDataWiki()
  }
  //This code was borrowed by Julia Us a fellow scholarship student
  getDataWiki() {
      let newData = [];
      let failedData = [];
      this.state.wonders.map((wonder) => {
        return fetch(`https://en.wikipedia.org/w/api.php?&action=query&list=search&prop=extracts&titles&format=json&origin=*&srlimit=1&srsearch=${wonder.name}`, {
            headers: {
              'Origin': 'http://localhost:3000/',
              'Content-Type': 'application/json; charset=utf-8'
            }
          })
        .then(response => response.json())
        .then(data => {
          let url = encodeURI(`https://en.wikipedia.org/wiki/${data.query.search['0'].title}`);
          let element = {
            text: data.query.search['0'].snippet,
            id: wonder.id,
            name: wonder.name,
            url: url,
            readMore: 'Read more'
          };
          newData.push(element);
          this.setState({data: newData});
    		})
        .catch(() => {
          console.log('An error occured')
          let element = {
            id: wonder.id,
            text: "Sorry, it wasn't possible to get any data from Wikipedia, please, try later",
            readMore: "☹"
          }
          failedData.push(element);
          this.setState({data: failedData});
        })
      })
    }

  onMarkerClick = (props, marker, e) =>
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true
  });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }


  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Wonders of the World</h1>
        </header>
        <div>
          <MapContainer
            wonders={this.state.wonders}
            showingInfoWindow={this.state.showingInfoWindow}
            activeMarker={this.state.activeMarker}
            selectedPlace={this.state.selectedPlace}
            data={this.state.data}
            onMapClicked={this.onMapClicked}
            onMarkerClick={this.onMarkerClick}
          />
        </div>
        <div>
          <SideBar
            wonders={this.state.wonders} />
        </div>

      </div>
    );
  }
}

export default App
