import React from 'react';
import {GoogleApiWrapper, InfoWindow, Marker, Map} from 'google-maps-react';
import './App.css';
import MapTheme from './maptheme.json' //fetching the maptheme from SnazzyMaps

export class MapContainer extends React.Component {

  render() {

  //use a batch variable for cleaner writing
  const { wonders, onMapClicked, onMarkerClick, showingInfoWindow, activeMarker, selectedPlace, data, google } = this.props

   return (
    <div  tabIndex='0'>
       <Map
         onClick={onMapClicked}
         styles={MapTheme}
         google={this.props.google}
         mapTypeControl={false}
         fullscreenControl={false}
         zoom={2.5}
         initialCenter={{
          lat: 12.9474841,
          lng: 19.2118452
        }}>
         {
           //looping inside all the locations to create markers
           //Use the ref attribute to match the marker with the sidemenu list
           wonders.map( (wonder, i) => (
               <Marker
               ref={this.props.onMarkerCreated}
               onClick={(props, marker) => onMarkerClick(props, marker)}
               key={wonder.id}
               name={wonder.name}
               image={wonder.image}
               id={wonder.id}
               animation={
                 (selectedPlace.name === wonder.name)
                  && google.maps.Animation.BOUNCE
                  //The animation was used as per the instructions of google-maps-react plugin
               }
               aria-label={`Selected the marker of + ${wonder.name}`}
               tabIndex='0'
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
        {/*Populate the info window. The Infowindow automatically is linked to the Marker because of the plugin*/}
        <InfoWindow
          marker={activeMarker}
          visible={showingInfoWindow}
          aria-label={`informations about ${selectedPlace.name}`}>
          {/*style the infowindow*/}
            <div
              style={{
                width: '250px',
                height: '300px',
                margin: 'auto',
                textAlign: 'center',
                display:'block',
                fontFamily: 'Noto Sans'
              }}>
               <h1 tabIndex='0'>{selectedPlace.name}</h1>
               {/*fetching the image according to the location*/}
                 <img src={selectedPlace.image} alt={'Image of ' + selectedPlace.name + ' wonder'} />
                {
                  //additional verification to pass the elements fetched from wikipedia
                  data.filter(info => info.id === selectedPlace.id )
                  .map(info =>{
                    let wikiInfo = info.text;
                    return (
                    <span  key={selectedPlace.id}>
                      {/*here we pass a snippet text fetched from wikipedia*/}
                      <p
                        dangerouslySetInnerHTML={ {__html: wikiInfo} }
                        style={{
                          fontSize: '1.1em',
                          padding: '0 5px 7px 0' 
                        }}
                        tabIndex='0'
                        />
                      {/*here we create a button (link) to redirect them to the relevant wikipedia page*/}
                      <a
                        href={info.url}
                        target="_blank"
                        className="infoButton"
                        aria-label={`click to learn more about ${selectedPlace.name}`}
                        tabIndex='0'
                      >
                        {info.readMore}</a>
                    </span>
                    )}
                  )
               }
            </div>
        </InfoWindow>
    </Map>
    </div>
   );
 }

}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyDcmKHYAxQb2lfAxqr4Xaxe47caMDgxOaQ'
})(MapContainer)
