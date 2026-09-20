import React, { useState } from "react";
import axios from "axios";

import FormattedDate from "../FormattedDate/FormattedDate.jsx";

import "./Weather.css";

export default function Weather() {
    const [weatherData, setWeatherData] = useState({ ready: false });

    function handleResponse(response) {
        console.log(response.data);
        setWeatherData({
            city: response.data.name,
            date: new Date(response.data.dt * 1000),
            description: response.data.weather[0].description,
            temperature: Math.round(response.data.main.temp),
            //icon: response.data.weather[0].icon,
            precipitation: response.data.clouds.all,
            humidity: response.data.main.humidity,
            wind: Math.round(response.data.wind.speed),
            ready: true
        });
    }

    if (!weatherData.ready) {
        const apiKey = "7074cc308bd9a424ae50e91089409cf9";
        let units = "metric";
        let city = "Freudenstadt";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

        axios.get(apiUrl).then(handleResponse);
        return "Loading...";
    } else {
        return (
            <div className="row align-items-center">
                <div className="col">
                    <h2 className="mb-1">{weatherData.city}</h2>
                    <p>
                        <FormattedDate date={weatherData.date} />
                        {weatherData.description}
                    </p>
                </div>

                <div className="col text-nowrap">
                    <i className="fa-solid fa-{weatherData.icon} weather-today text-primary text-opacity-50 me-3"></i>
                    <span className="temperature-today">
                        <span>{weatherData.temperature}</span>
                        <span className="temperature-unit">
                            <a href="">°C</a> |
                            <a href="">°F</a>
                        </span>
                    </span>
                </div>

                <div className="col-auto">
                    <ul className="list-unstyled text-secondary text-end">
                        <li className="small">Niederschlag: {weatherData.precipitation}%</li>
                        <li className="small">Luftfeuchtigkeit: {weatherData.humidity}%</li>
                        <li className="small">Wind: {weatherData.wind} km/h</li>
                    </ul>
                </div>
            </div>
        )
    }
}