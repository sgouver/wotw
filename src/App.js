import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MapContainer from './MapContainer';
import SideBar from './sidebar';
import escapeRegExp from 'escape-string-regexp';

class App extends Component {
  constructor(props) {
    super(props)
      this.state = {
          wonders: require('./wotwdata.json'),
          showingInfoWindow: false,
          activeMarker: {},
          selectedPlace: {},
          data: [],
          query: '',
          searchedWonders: []
        }
  }

  markers = [];

  componentDidMount = () => {
    this.getDataWiki()
  }

  serachGrills = (query) => {
    let searchedWonders
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      searchedWonders = this.state.wonders.filter(wonder => match.test(wonder.name))
    } else {
      searchedWonders = this.state.wonders
    }
    this.setState({searchedWonders, query})
  }
  //This code was borrowed by Julia Us a fellow scholarship student
  getDataWiki = () => {
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

  onMarkerCreated = (marker) => {
    if(marker !== null) {
      this.markers.push(marker)
    }
    console.log(this.markers)
    console.log('Marker number is' + this.markers.length);
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

  selectWonder = (wonder) => {
     for (const newMarker of this.markers) {
       if (newMarker.props.id === wonder.id) {
         new newMarker.props.google.maps.event.trigger(newMarker.marker, 'click')
       }
     }
  }


  render() {

    const { wonders, showingInfoWindow, activeMarker, selectedPlace, data } = this.state

    return (
      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Wonders of the World</h1>
        </header>
        <div className="content">
          <div className="map">
            <MapContainer
              wonders={wonders}
              showingInfoWindow={showingInfoWindow}
              activeMarker={activeMarker}
              selectedPlace={selectedPlace}
              data={data}
              onMapClicked={this.onMapClicked}
              onMarkerClick={this.onMarkerClick}
              onMarkerCreated={this.onMarkerCreated}
            />
          </div>
          <div className="sidebar">
            <SideBar
              wonders={wonders}
              selectWonder={this.selectWonder}
               />
          </div>
        </div>

      </div>
    );
  }
}

export default App
