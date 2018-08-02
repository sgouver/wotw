import React from 'react';
import {GoogleApiWrapper, Marker, Map} from 'google-maps-react';

export class MapContainer extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
          wonders: [],
          showingInfoWindow: false,
          activeMarker: {},
          selectedPlace: {}
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
  };

  componentDidMount() {
    let data = require('./wotwdata.json');
    let NewWonders =[]
    for (let i = 0; i < data.length; i++)
    {
      let obj = data[i];
      NewWonders.push(obj)
      this.setState({wonders: NewWonders})
    }
  }

  render() {
  const { wonders } = this.state
  const { google } = this.props

  console.log(wonders)

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
         styles={styles}
         google={this.props.google}
         zoom={3}
         onClick={this.onMapClicked}
         initialCenter={{
          lat: 23.5065756,
          lng: -27.7048251
        }}>
        {
          wonders.filter(wonder => wonder.age === 'New')
          .map( (wonder) => (
          <Marker
            onClick={this.onMarkerClick}
            key = {wonder.location.lat}
            title={wonder.name}
            name={wonder.name}
            animation={google.maps.Animation.DROP}
            icon={{
                url: wonder.image,
                scaledSize: new google.maps.Size(65,65)
              }}
            position={
              {lat: wonder.location.lat,
               lng: wonder.location.lng}
             } />)
           )
         }
         {
           wonders.filter(wonder => wonder.age === 'Ancient')
           .map( (wonder) => (
           <Marker
             key={wonder.location.lat}
             name={wonder.name}
             animation={google.maps.Animation.DROP}
             icon={{
                 url: wonder.image,
                 scaledSize: new google.maps.Size(50,50)
               }}
             position={
               {lat: wonder.location.lat,
                lng: wonder.location.lng}
              } />)
            )
        }
      </Map>
    </div>
   );
 }

}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyCxyj_aE9VcVXbJ0iD9vOk8rTmYwpuGGkY'
})(MapContainer)
