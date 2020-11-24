import React from 'react'
import './Current.css'

function Current({temperature, description, precipitation, wind, humidity}) {
  return (
    <div className="current-container">
      <div className="current-temp">
        <div className="temp-main">
          {temperature}˚C
        </div>
        <div className="temp-desc">
          {description}
        </div>
      </div>
      <div className="current-etc">
        <div className="etc-pop">
          <p>Precipitation</p>
          {precipitation}%
      </div>
        <div className="etc-wind">
           <p>Wind</p>
          {wind}m/s
        </div>
        <div className="etc-humidity">
          <p>Humidity</p>
          {humidity}%
        </div>
      </div>
    </div>
  )
}

export default Current
