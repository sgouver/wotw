import React from 'react';
import './App.css';

function Search(props) {

return (
    <div className="search-top">
      <input
        className="search-contacts"
        type="text"
        placeholder="Search by title"
        value={ props.query }
        onChange={ (event) => props.updateQuery(event.target.value) }
      />
    </div>
  )
}

export default Search
