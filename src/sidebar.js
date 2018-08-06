import React from 'react';
import './App.css';

function SideBar(props) {

//a stateless component that creates an array of the existing array elements
//and interact with the markers of the map
    return(
      <div>
        <ul className="sidebar-list">
        {
          props.wonders.map((wonder) =>
            (
              <li key={wonder.id}>
                <button
                  tabIndex='0'
                  className="button button1"
                  onClick={() => props.selectWonder(wonder)}
                  aria-label={`you have clicked on ${wonder.name}`}
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

export default SideBar
