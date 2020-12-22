import React, { useState } from 'react';
import Rain from './SVG/Rain.svg';
import Sunny from './SVG/Sunny.svg';
import Clouds from './SVG/clouds.svg';
import snow from './SVG/snowflake.svg';

const api = {
  key: 'e9a3f226cf3901149f0a046fc7f910ae',
  base: 'http://api.openweathermap.org/data/2.5/weather?q=',
};

function Forecast() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [unit, setUnit] = useState('&deg;C');

  const callApi = (e) => {
    if (e.key === 'Enter') {
      fetch(`${api.base}${query}&appid=${api.key}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setWeather(data);
          setQuery('');
        });
    }
  };

  const formatDate = (date = new Date()) => {
    let { day, month, year } = new Intl.DateTimeFormat('en', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
      .formatToParts(date)
      .reduce((acc, part) => {
        if (part.type !== 'literal') {
          acc[part.type] = part.value;
        }
        return acc;
      }, Object.create(null));
    return `${day}-${month}-${year}`;
  };

  const weatherImage = () => {
    if (weather.weather[0].main === 'Clear') {
      return <img style={img} src={Sunny} alt='Sunny' />;
    } else if (weather.weather[0].main === 'Rain') {
      return <img style={img} src={Rain} alt='Rain' />;
    } else if (weather.weather[0].main === 'Snow') {
      return <img style={img} src={snow} alt='Snow' />;
    } else if (weather.weather[0].main === 'Clouds') {
      return <img style={img} src={Clouds} alt='Clouds' />;
    }
  };

  return (
    <div>
      <div style={date}>{formatDate()}</div>
      <input
        style={input}
        type='text'
        placeholder='Search City...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={callApi}
      />

      {typeof weather.main != 'undefined' ? (
        <div>
          <div style={textStyles}>
            {weather.name}, {weather.sys.country}
          </div>

          <div style={border}>
            {Math.round(weather.main.temp - 273.15)}&deg;C
          </div>
          <div style={textStyles}>{weather.weather[0].main}</div>

          <div>{weatherImage()}</div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

//css Styles

const textStyles = {
  padding: '10px',
  margin: '1.5rem',
  fontFamily: 'Arial',
  textAlign: 'center',
  fontSize: '2rem',
};

const date = {
  textAlign: 'center',
  marginBottom: '0.5rem',
};

const input = {
  ...textStyles,
  margin: 'auto',
  display: 'block',
  width: '80%',
  padding: '0.625rem',
  border: '1px solid rgba(0,0,0, 0.5)',
  borderRadius: '0.75rem',
  boxShadow: '5px 10px rgba(232, 232, 232, 1)',
};

const border = {
  ...textStyles,
  border: '1px solid rgba(0,0,0, 0.5)',
  borderRadius: '0.75rem',
  backgroundColor: 'rgba(232, 232, 232, 0.5)',
  boxShadow: '5px 10px rgba(232, 232, 232, 1)',
  width: '20%',
  padding: '3rem',
  margin: '0 auto',
  color: 'black',
};

const img = {
  display: 'block',
  margin: '0 auto',
  marginBottom: '2rem',
  width: '11.2rem',
};

export default Forecast;
