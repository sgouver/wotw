import React from 'react';
import './App.css';

function SideBar(props) {

    return(
      <div>
        <ul className="sidebar-list">
        {
          props.wonders.map((wonder) =>
            (
              <li key={wonder.id}>
                <button className="button button1"
                  onClick={() => props.selectWonder(wonder)}
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
