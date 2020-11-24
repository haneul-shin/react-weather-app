import React from 'react'
import './Daily.css'

function Daily({day, avg}) {
  return (
    <div className="daily-container">
      <div className="daily-item">
        <p>{day[0]}</p>
        {avg[0]}˚C
      </div>
      <div className="daily-item">
        <p>{day[1]}</p>
        {avg[1]}˚C
      </div>
      <div className="daily-item">
        <p>{day[2]}</p>
        {avg[2]}˚C
      </div>
      <div className="daily-item">
        <p>{day[3]}</p>
        {avg[3]}˚C
      </div>
    </div>
  )
}

export default Daily
