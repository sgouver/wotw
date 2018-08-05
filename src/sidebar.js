import React from 'react';
import './App.css';

function SideBar(props) {

    return(
      <div>
        <ul>
        {
          props.wonders.map((wonder) =>
            (
              <li key={wonder.id}>
                <button
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
