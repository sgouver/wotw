import React from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
  render() {
    return (
      <Map google={this.props.google} zoom={14}>
      </Map>
    );
  }
}

const LoadingContainer = (props) => (
  <div>Fancy loading container!</div>
)

export default GoogleApiWrapper({
  apiKey: (YOUR_GOOGLE_API_KEY_GOES_HERE),
  LoadingContainer: LoadingContainer
})(MapContainer)
