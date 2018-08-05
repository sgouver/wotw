import React from 'react';
import './App.css';

function Search(props) {

return (
    <div className="search-books-input-wrapper">
      <input
        type="text"
        placeholder="Search by title"
        value={ props.query }
        onChange={ (event) => props.updateQuery(event.target.value) }
      />
    </div>
  )
}

export default Search
