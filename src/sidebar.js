import React from 'react';
import {Marker} from 'google-maps-react';
import './App.css';

class SideBar extends React.Component {


  render() {

    const { wonders } = this.props

    return(
      <div>
        <ul>
        {
          wonders.map((wonder, e) =>
            (
              <li>
                <button
                  onClick={
                    document.querySelectorAll('.gmnoprint')[e.target.wonder.index].click()
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
