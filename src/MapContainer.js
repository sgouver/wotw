import React from 'react';
import {GoogleApiWrapper, InfoWindow, Marker, Map} from 'google-maps-react';
import './App.css';

export class MapContainer extends React.Component {

  render() {

  const { wonders, onMapClicked, onMarkerClick, showingInfoWindow, activeMarker, selectedPlace, data, google } = this.props

  console.log(selectedPlace)

  let mapCSS = {
    width: '80%',
    height: '500px',
    position: 'relative',
    float: 'right'
  }
  let mapTheme =  [
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
         onClick={onMapClicked}
         style={mapCSS}
         styles={mapTheme}
         google={this.props.google}
         mapTypeControl={false}
         fullscreenControl={false}
         zoom={2.5}
         initialCenter={{
          lat: 12.9474841,
          lng: 19.2118452
        }}>
         {
           wonders.map( (wonder, i) => (
               <Marker
               ref="test"
               onClick={onMarkerClick}
               key={wonder.id}
               name={wonder.name}
               image={wonder.image}
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
                 <img src={selectedPlace.image} alt={'Image of ' + selectedPlace.name + ' wonder'} />
                {
                  data.filter(info => info.id === selectedPlace.id )
                  .map(info =>{
                    let wikiInfo = info.text;
                    return (
                    <span  key={selectedPlace.id}>
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
  apiKey: 'AIzaSyA6hh9kfwR-I35ZxtOKYFMB9bvWAeOcP4M'
})(MapContainer)
