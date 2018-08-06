import React from 'react';
import './App.css';

function Search(props) {

//create an input search field
//the input search field accepts the updateQuery function from App.js
return (
    <div className="search-top">
      <input
        tabIndex='0'
        aria-label="Search a Wonder by name"
        className="search-contacts"
        type="text"
        style={{
          backgroundColor: 'rgb(230, 230, 230)'
        }}
        placeholder="Search a Wonder"
        value={ props.query }
        onChange={ (event) => props.updateQuery(event.target.value) }
      />
    </div>
  )
}

export default Search
