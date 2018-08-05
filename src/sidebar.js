import React from 'react';
import {Marker} from 'google-maps-react';
import './App.css';

class SideBar extends React.Component {

  marker() {
    document.querySelector('.gmnoprint img').click()
  }


  render() {

    const { wonders } = this.props

    return(
      <div>
        <ul>
        {
          wonders.map(wonder =>
            (
              <li>
                <button
                  onClick={this.marker}
                  >
                  {wonder.name}</button>
              </li>
            )
          )
        }
        </ul>
      </div>

    )

  }



 }
export default SideBar
