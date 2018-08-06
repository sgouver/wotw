import React from 'react';
import './App.css';

function MenuIcon(props) {

  return (
    <div className="menuIcon-wrapper" onClick={props.toggleBar}>
      <div className="menuIcon"></div>
      <div className="menuIcon"></div>
      <div className="menuIcon"></div>
    </div>
  )

}

export default MenuIcon
