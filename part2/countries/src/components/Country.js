import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country }) => {

    const [weather, setWeather] = useState({})
    
    useEffect(() => {
        console.log(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}&units=f`)
        axios
            .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}&units=f`)
            .then(response => {
                console.log(response.data.current)
                setWeather(response.data.current)
            })
    }, [country.capital])

    return (
        <div>
            <h1>{country.name}</h1>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <h2>Spoken languages</h2>
            <ul>
                {country.languages.map((language) =>
                    <li key={language.name}>{language.name}</li>
                )}
            </ul>
            <img src={country.flag} alt={`${country.capital}'s flag'}`} width={200} />
            <h2>Weather in {country.capital}</h2>
            <div>
                <strong>temperature:</strong>&nbsp;
                {weather.temperature} Farenheit
            </div>
            <img src={weather.weather_icons} alt={`${country.capital}'s weather'}`} width={100} />
            <div>
                <strong>wind:</strong>&nbsp;
                {weather.wind_speed} mph direction {weather.wind_dir}
            </div>
        </div>
    )


}

export default Country;