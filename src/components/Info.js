import React from 'react'
import './Info.css'

function Info({city, country, date}) {
  return (
    <div className="info-container">
        <div className="info-location">
          {city}, {country}
        </div>
        <div className="info-date">
          {date}
        </div>
      </div>
  )
}

export default Info
