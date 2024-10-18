import React, { useState } from 'react';
import './Weather.css';

const api = {
    key: "a5405ef8da06f66c68dec88d90c16c98",
    base: "https://api.openweathermap.org/data/2.5/",  //base url
}


const Weather = () => {

    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});   //storing the entire weather data as an object
    const search = evt => {
        if (evt.key === "Enter") {
            try{
                fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result);
                    console.log(result);
                    setQuery('');  //empty the value after the data is shown
                })
            } catch(error){
                console.error("Error fetching the data: ",error);
            }
            
        } 
    }
    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }

    const getWeatherClass = () => {
        if(!weather || !weather.main || !weather.weather) return '';
        
        const temp = weather.main.temp;
        const weatherCondition = weather.weather[0].main.toLowerCase(); // Main weather condition

        if (weatherCondition.includes('rain')) {
            return 'rainy';
        } else if (temp > 25) {
            return 'warm';
        } else {
            return 'cold';
        }
    };
    return (
        <div className={`app ${getWeatherClass()}`}>
            <main>
                <div className='search-box'>
                    <input type="text" className='search-bar' placeholder="Search" value={query} onChange={e => setQuery(e.target.value)} onKeyPress={search} />
                    {/* onkeypress is deprecated */}
                </div>
                {(typeof weather.main != "undefined")?(
                    <div>
                    <div className="location-box">
                        <div className="location">
                            {weather.name}, {weather.sys.country}
                        </div>
                        
                        <div className="date">
                            {dateBuilder(new Date())}
                        </div>
                        <div className="weather-box">
                            <div className="temp">
                                {Math.round(weather.main.temp)}°c
                            </div>
                            <div className="weather">
                                {weather.weather[0].main}
                            </div>
                        </div>
                    </div>
                </div>
                ): (' ')}
                
            </main>
        </div>
    )
}

export default Weather
