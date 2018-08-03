import React from 'react';
import {GoogleApiWrapper, InfoWindow, Marker, Map} from 'google-maps-react';

export class MapContainer extends React.Component {
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
  };

  render() {

  const { wonders, showingInfoWindow, activeMarker, selectedPlace, data } = this.state
  const { google } = this.props

  console.log(selectedPlace)

  let styles =  [
    {
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "color": "#f49f53"
            }
        ]
    },
    {
        "featureType": "landscape",
        "stylers": [
            {
                "color": "#f9ddc5"
            },
            {
                "lightness": -7
            }
        ]
    },
    {
        "featureType": "road",
        "stylers": [
            {
                "color": "#813033"
            },
            {
                "lightness": 43
            }
        ]
    },
    {
        "featureType": "poi.business",
        "stylers": [
            {
                "color": "#645c20"
            },
            {
                "lightness": 38
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            {
                "color": "#1994bf"
            },
            {
                "saturation": -69
            },
            {
                "gamma": 0.99
            },
            {
                "lightness": 43
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#f19f53"
            },
            {
                "weight": 1.3
            },
            {
                "visibility": "on"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "poi.business"
    },
    {
        "featureType": "poi.park",
        "stylers": [
            {
                "color": "#645c20"
            },
            {
                "lightness": 39
            }
        ]
    },
    {
        "featureType": "poi.school",
        "stylers": [
            {
                "color": "#a95521"
            },
            {
                "lightness": 35
            }
        ]
    },
    {},
    {
        "featureType": "poi.medical",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#813033"
            },
            {
                "lightness": 38
            },
            {
                "visibility": "off"
            }
        ]
    },
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {
        "elementType": "labels"
    },
    {
        "featureType": "poi.sports_complex",
        "stylers": [
            {
                "color": "#9e5916"
            },
            {
                "lightness": 32
            }
        ]
    },
    {},
    {
        "featureType": "poi.government",
        "stylers": [
            {
                "color": "#9e5916"
            },
            {
                "lightness": 46
            }
        ]
    },
    {
        "featureType": "transit.station",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "stylers": [
            {
                "color": "#813033"
            },
            {
                "lightness": 22
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "lightness": 38
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#f19f53"
            },
            {
                "lightness": -10
            }
        ]
    },
    {},
    {},
    {}
  ]

   return (
    <div>
       <Map
         onClick={this.onMapClicked}
         styles={styles}
         google={this.props.google}
         zoom={3}
         initialCenter={{
          lat: 12.9474841,
          lng: 19.2118452
        }}>
         {
           wonders.map( (wonder, i) => (
             <Marker
             onClick={this.onMarkerClick}
             key={wonder.id}
             name={wonder.name}
             id={wonder.id}
             icon={{
                 url: wonder.icon,
                 scaledSize: new google.maps.Size(50,50)
               }}
             position={
               {lat: wonder.location.lat,
                lng: wonder.location.lng}
              } />
             )
            )
        }
        <InfoWindow
          marker={activeMarker}
          visible={showingInfoWindow}
          >
            <span>
               <h1>{selectedPlace.name}</h1>

                {
                  data.filter(info => info.id === selectedPlace.id )
                  .map(info =>{
                    let wikiInfo = info.text;
                    return (
                    <span>
                      <p dangerouslySetInnerHTML={ {__html: wikiInfo} } />
                      <a href={info.url} target="_blank">{info.readMore}</a>
                    </span>
                    )}
                  )
               }
            </span>
        </InfoWindow>

    </Map>
    </div>
   );
 }

}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyCxyj_aE9VcVXbJ0iD9vOk8rTmYwpuGGkY'
})(MapContainer)
