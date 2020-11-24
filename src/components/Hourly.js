import React from 'react'
import './Hourly.css'

function Hourly({time, temp}) {
  const getOclock = t => {
    if(t > 12){ 
      t -= 12;
      return t + "PM";
    }else if(t == 12) return t + "PM";
    else if(t == 0) return "Midnight";
    else return t + "AM";
  }

  return (
    <div className="hourly-container">
      <div className="hourly-item">
        <p>{getOclock(time[0])}</p>
        {temp[0]}˚C
      </div>
      <div className="hourly-item">
        <p>{getOclock(time[1])}</p>
        {temp[1]}˚C
      </div>
      <div className="hourly-item">
        <p>{getOclock(time[2])}</p>
        {temp[2]}˚C
      </div>
      <div className="hourly-item">
        <p>{getOclock(time[3])}</p>
        {temp[3]}˚C
      </div>
    </div>
  )
}

export default Hourly
