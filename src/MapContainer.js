import React from 'react';
import {GoogleApiWrapper, Map} from 'google-maps-react';

export class MapContainer extends React.Component {

  render() {
     return (
       <Map google={this.props.google} /> </Map>
     );
   }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyCxyj_aE9VcVXbJ0iD9vOk8rTmYwpuGGkY'
})(MapContainer)
