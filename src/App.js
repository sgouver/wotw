import React, { Component } from 'react';
import './App.css';
import MapContainer from './MapContainer';
import SideMenu from './sidemenu';
import escapeRegExp from 'escape-string-regexp';
import MenuIcon from './menuicon';

//a function show an error message in case the Google API fails to load
window.gm_authFailure = () => {
  const mapSection = document.querySelector('.map');
  mapSection.innerHTML = '';
  mapSection.innerHTML =
  `<div class='google-api-error'>
    <h1>Sorry, cannot load Google Maps</h1>
    <p>Looks like, you will have to visit the Wonders in person.</p>
    <p>Here is a treat:</p>
    <img src='/img/zeus.jpg' alt='image of Statue of Zeus at Olympia'/>
  </div>`;
}

//The component to compose all the other components
class App extends Component {
  constructor(props) {
    super(props)
      this.state = {
          wonders: require('./wotwdata.json'), //fetching a manually created array of the wonders of the world
          showingInfoWindow: false,
          activeMarker: {}, //as instrcted in google-maps-react GitHub page
          selectedPlace: {}, //as instrcted in google-maps-react GitHub page
          data: [], //an array of searched elements from wikipedia
          query: '', //here goes all the typing in the search bar
          sideBarOpen: true //a boolean to toggle the Icon menu

        }
  }

  //Here is an empty array to save all the active markers. This array is dynamic because it is effected from wonders array
  markers = [];

  //Initiate the function to fetch the wikipedia array
  componentDidMount = () => {
    this.getDataWiki()
  }

  //a function to update the state of seatch query according to the user
  updateQuery= (query) => {
    this.setState({ query: query.trim() })
  }

  //This code was replicated by Julia Us a fellow scholarship student
  getDataWiki = () => {
      let newData = [];
      let failedData = [];
      this.state.wonders.map((wonder) => {
        //retriving the object from the JSON database using the title attribute
        return fetch(`https://en.wikipedia.org/w/api.php?&action=query&list=search&prop=extracts&titles&format=json&origin=*&srlimit=1&srsearch=${wonder.name}`, {
            headers: {
              'Origin': 'http://localhost:3000/',
              'Content-Type': 'application/json; charset=utf-8'
            }
          })
        //converting to json format
        .then(response => response.json())
        .then(data => {
          let url = encodeURI(`https://en.wikipedia.org/wiki/${data.query.search['0'].title}`);
          //creating an element according to the previously fetched data
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
        //Error handling function
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

  //Create an array of markers in the MapContainer component
  onMarkerCreated = (marker) => {
    if(marker !== null) {
      this.markers.push(marker)
    }
  }

  //Validate that a marker was selected and opens the info window
  onMarkerClick = (props, marker, e) =>
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true
  });

  //Check if the map array is clicked if yes it disables the infowindow
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  //the validating function to match the Marker with the list items of the sidemenu
  selectWonder = (wonder) => {
     for (const newMarker of this.markers) {
       if (newMarker.props.id === wonder.id) {
         new newMarker.props.google.maps.event.trigger(newMarker.marker, 'click')
       }
     }
     if (window.screen.width < 650) {
       this.toggleSideBar()
     }
  }

 //A simple function to toggle the sidemenu
  toggleSideBar = () => {
    this.setState((prevState) => {
      return {sideBarOpen: !prevState.sideBarOpen}
    })
  }

  render() {
    const { wonders, showingInfoWindow, activeMarker, selectedPlace, data } = this.state

    //the statement to filter the sidemenu array according to the selected query
    let foundWonders
    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      foundWonders = wonders.filter((wonder) => match.test(wonder.name))
    } else {
      foundWonders = wonders
    }

    //a statement to set a condition for the SideMenu to open and close
    let mapMenu;
    if (this.state.sideBarOpen) {
      //the SideMenu component is placed here
      mapMenu = <SideMenu
        query={this.state.query}
        updateQuery={this.updateQuery}
        wonders={foundWonders}
        selectWonder={this.selectWonder}
        />
    }

    return (
      <div className="App">
        <header className="App-header">
          {/*The icon menu to toggle the sidemenu*/}
          <MenuIcon
            toggleBar={this.toggleSideBar}
            aria-label="open and hide sidebar"
            />
          <h1 className="title">Wonders of the World</h1>
        </header>
        <main className="content">
          {/*the SideMenu appears here according to the preivious condition*/}
          {mapMenu}
          <section className="map">
            {/*Here we place the map*/}
              <MapContainer
                role="application"
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
        </main>
        <footer
          className="footer-style"
          aria-label="footer credits"
          >
          <span>Stefanos Gkouveris | Udacity P8 project</span>
        </footer>
      </div>
    );
  }
}

export default App
