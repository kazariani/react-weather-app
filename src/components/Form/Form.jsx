import React, { useState } from "react";
import Weather from "../Weather/Weather.jsx";
import axios from "axios";
import "./Form.css";

export default function Form(props) {
    const [weatherData, setWeatherData] = useState({ ready: false });
    const [city, setCity] = useState(props.defaultCity);

    function handleResponse(response) {
        console.log(response.data);
        setWeatherData({
            city: response.data.name,
            date: new Date(response.data.dt * 1000),
            description: response.data.weather[0].description,
            feelsLike: Math.round(response.data.main.feels_like),
            temperature: Math.round(response.data.main.temp),
            iconUrl: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
            precipitation: response.data.clouds.all,
            humidity: response.data.main.humidity,
            wind: Math.round(response.data.wind.speed),
            ready: true
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        search();
    }

    function handleCityChange(event) {
        setCity(event.target.value);
    }

    function search() {
        const apiKey = "7074cc308bd9a424ae50e91089409cf9";
        let units = "metric";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
        axios.get(apiUrl).then(handleResponse);
    }

    if (weatherData.ready) {
        return (
            <div>
                <form onSubmit={handleSubmit} className="row align-items-stretch mt-5">
                    <div className="col pe-1">
                        <input onChange={handleCityChange} type="search" className="form-control" placeholder="Please enter a city..." />
                    </div>

                    <div className="col-auto ps-0">
                        <button type="submit" className="btn btn-primary">Search</button>
                    </div>

                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary">
                            <i className="fa-solid fa-location-crosshairs"></i> Current Location
                        </button>
                    </div>
                </form>

                <Weather data={weatherData} />
            </div>
        )
    } else {
        search();
        return "Loading...";
    }
}