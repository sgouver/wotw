import React from 'react';
import {Marker} from 'google-maps-react';
import './App.css';

class SideBar extends React.Component {

  render() {

    const { wonders, onMarkerClick } = this.props

    return(
      <div>
        <ul>
        {
          wonders.map(wonder =>
            (
              <li>
                <button
                  onClick={(e) => (
                      this.refs['test'].//something
                    )
                    }
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
