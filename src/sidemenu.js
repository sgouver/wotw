import React from 'react';
import './App.css';
import SideBar from './sidebar';
import Search from './search';

function SideMenu(props) {

//A stateless compenent to compine the search and sidebar for better controlling
//and manipilation

return(
    <div className="sideMenu">
      <Search
        tabIndex='0'
        aria-label="Search a Wonder by name"
        query={props.query}
        updateQuery={props.updateQuery}
        />
      <SideBar
        aria-label="a list of available wonders"
        wonders={props.wonders}
        selectWonder={props.selectWonder}
         />
    </div>
)

}
export default SideMenu
