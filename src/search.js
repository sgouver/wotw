import React from 'react';
import './App.css';

function Search(props) {

return (
    <div className="search-top">
      <input
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
