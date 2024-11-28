import React, { useState } from 'react';
import Weather from './Weather';
import './App.css';

const App = () => {
    const [city, setCity] = useState('Toronto'); // Default city

    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    return (
        <div className="App">
            <h1>Weather App</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Enter city"
                    onChange={handleInputChange}
                    className="search-input"
                />
            </div>
            <Weather city={city} />
        </div>
    );
};

export default App;
