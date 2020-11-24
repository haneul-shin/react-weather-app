import React, { useState } from 'react';
import './App.css';
import Form from './components/Form';
import Info from './components/Info';
import Current from './components/Current';
import Hourly from './components/Hourly';
import Daily from './components/Daily';

const api = {
  key: "54a329d1bcf2001a542b94c9c9ace8a2",
  base: "https://api.openweathermap.org/data/2.5/forecast"
}

function App() {
  const [query, setQuery] = useState('');

  const [bg, setBg] = useState('');

  const [info, setInfo] = useState({
    city: undefined,
    country: undefined,
    date: undefined
  });

  const [weather, setWeather] = useState({
    temperature: undefined,
    description: undefined,
    precipitation: undefined,
    wind: undefined,
    humidity: undefined
  });

  const [hourly, setHourly] = useState({
    times: [],
    temps: []
  });

  const [daily, setDaily] = useState({
    days: [],
    avgs: []
  })

  const search = async e => {
    e.preventDefault();

    // const api_call = await fetch(`${api.base}?q=${query}&appid=${api.key}&units=metric`);
    // const data = await api_call.json();
   
    fetch(`${api.base}?q=${query}&appid=${api.key}&units=metric`)
    .then(res => res.json())
    .then(data => { 
      console.log((data));

      setInfo({
        city: data.city.name,
        country: data.city.country,
        date: dateBuilder(new Date())
      });
  
      setWeather({
        temperature: Math.round(data.list[0].main.temp),
        description: data.list[0].weather[0].main,
        precipitation: Math.round(data.list[0].pop),
        wind: data.list[0].wind.speed,
        humidity: data.list[0].main.humidity
      });
  
      let offset = data.city.timezone;
      let utc = data.list[0].dt_txt.slice(11, -6);
  
      setHourly({
        times: getTimes(offset, utc),
        temps: [Math.round(data.list[0].main.temp),
                Math.round(data.list[1].main.temp),
                Math.round(data.list[2].main.temp),
                Math.round(data.list[3].main.temp)]
      });
  
      let utcDate = data.list[0].dt_txt.slice(5, -9);
  
      setDaily({
        days: getDays(utcDate),
        avgs: [ Math.round(data.list[7].main.temp),
                Math.round(data.list[15].main.temp),
                Math.round(data.list[23].main.temp),
                Math.round(data.list[31].main.temp),
                Math.round(data.list[39].main.temp)]
      })
  
      setBg(data.list[0].weather[0].main);
    }
      
    ).catch( error => console.log('false input'));
    
  }

  const getDays = utcDate => {
    let day = parseInt(utcDate.slice(3, 5));

    let mons = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let mon = mons[utcDate.slice(0, 2)-1];

    let days = [mon +" "+(day+1), mon +" "+(day+2), mon +" "+(day+3), mon +" "+(day+4)];

    return days;
  }

  const getTimes = (offset, utc) => {
    let gap = (offset / 3600);
    let gmt = gap + parseInt(utc);
    let gmts = [gmt, (gmt+3), (gmt+6), (gmt+9)];

    gmts.forEach((x, i) => {
      console.log('333', x);
    }); // == for each


    if(gmts[0] >= 24) gmts[0] -= 24;
    if(gmts[1] >= 24) gmts[1] -= 24;
    if(gmts[2] >= 24) gmts[2] -= 24;
    if(gmts[3] >= 24) gmts[3] -= 24;
    
    return gmts;
  }

  const dateBuilder = d => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }

  return (
    <div className="weather-app" id={bg}>
      <div className="app-container">
        <Form query={query} setQuery={setQuery} search={search} />
        {(typeof info.city != "undefined") ? (
          <>
          <Info
          city={info.city}
          country={info.country}
          date={info.date}
        />
        <Current 
          temperature={weather.temperature}
          description={weather.description}
          precipitation={weather.precipitation}
          wind={weather.wind}
          humidity={weather.humidity}
        />
        <Hourly 
          time={hourly.times}
          temp={hourly.temps}
        />
        <Daily
          day={daily.days}
          avg={daily.avgs}
        />
        </>
        ) : ('')}
      </div>
    </div>
  );
}

export default App;
