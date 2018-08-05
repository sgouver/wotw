import React from 'react';
import './App.css';
import SideBar from './sidebar';
import Search from './search';

function SideMenu(props) {

return(
    <div className="sideMenu">
      <Search
        query={props.query}
        updateQuery={props.updateQuery}
        />
      <SideBar
        wonders={props.wonders}
        selectWonder={props.selectWonder}
         />
    </div>
)

}
export default SideMenu
