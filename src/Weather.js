import React, { useEffect, useState } from 'react';

const Weather = ({ city }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                console.log('Fetching weather for:', city);
                const response = await fetch(
                    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=162e360264a8955a2fb8ee3b0f72d170`
                );
                const data = await response.json();

                console.log('API Response:', data);

                if (response.ok) {
                    setWeatherData(data);
                    setError(false);
                } else {
                    console.error('API Error:', data.message);
                    setError(true);
                }
            } catch (err) {
                console.error('Error during API call:', err);
                setError(true);
            }
        };

        fetchWeather();
    }, [city]);

    if (error) {
        return <p>Error fetching data. Please check the city name or try again later.</p>;
    }

    if (!weatherData) {
        return <p>Loading...</p>;
    }

    const { main, weather, wind, sys } = weatherData;

    return (
        <div>
            <h2>Weather in {city}</h2>
            <p>{weather[0].description}</p>
            <p>Temperature: {(main.temp - 273.15).toFixed(2)}°C</p>
            <p>Feels Like: {(main.feels_like - 273.15).toFixed(2)}°C</p>
            <p>Humidity: {main.humidity}%</p>
            <p>Wind Speed: {wind.speed} m/s</p>
            <p>Country: {sys.country}</p>
            <img
                src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
                alt="Weather icon"
            />
        </div>
    );
};

export default Weather;
