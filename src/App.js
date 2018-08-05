import React, { Component } from 'react';
import './App.css';
import MapContainer from './MapContainer';
import SideBar from './sidebar';
import Search from './search';
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
          sideBarOpen: true
        }
  }

  markers = [];

  componentDidMount = () => {
    this.getDataWiki()
  }

  updateQuery= (query) => {
    this.setState({ query: query.trim() })
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

  ToggleSideBar = () => {
    this.setState((prevState) => {
      return {sideBarOpen: !prevState.sideBarOpen}
    })
  }

  render() {
    const { wonders, showingInfoWindow, activeMarker, selectedPlace, data } = this.state

    let foundWonders
    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      foundWonders = wonders.filter((wonder) => match.test(wonder.name))
    } else {
      foundWonders = wonders
    }

    return (
      <div>
        <header className="App-header">
          <label className="switch">
            <input type="checkbox" defaultChecked/>
            <span className="slider round"></span>
          </label>
          <h1 className="title">Wonders of the World</h1>
        </header>
        <div className="content">
          <div className="sidebar">
            <Search
              query={this.state.query}
              updateQuery={this.updateQuery}
              />
            <SideBar
              wonders={foundWonders}
              selectWonder={this.selectWonder}
               />
          </div>
          <section className="map">
            <MapContainer
              wonders={foundWonders}
              showingInfoWindow={showingInfoWindow}
              activeMarker={activeMarker}
              selectedPlace={selectedPlace}
              data={data}
              onMapClicked={this.onMapClicked}
              onMarkerClick={this.onMarkerClick}
              onMarkerCreated={this.onMarkerCreated}
            />
          </section>
        </div>

      </div>
    );
  }
}

export default App
