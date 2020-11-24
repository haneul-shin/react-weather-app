import React from 'react'
import './Form.css'

function Form({query, setQuery, search}) {
  return (
    <div className="form-container">
      <form onSubmit={search}>
      <input
          type="text"
          className="search-input"
          placeholder="Enter the Location..."
          onChange={e => setQuery(e.target.value)}
          value={query}
        />
        <button className="search-btn">Search</button>
      </form>
    </div>
  )
}

export default Form
