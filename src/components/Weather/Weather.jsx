import React from "react";
import "./Weather.css";

export default function Weather() {
    let weatherData = {
        city: "Freudenstadt",
        temperature: "+13",
        date: "Tuesday 19:29",
        description: "Clouds",
        icon: "cloud",
        precipitation: 47,
        humidity: 70,
        wind: 11
      };
    return (
        <div className="row align-items-center">
            <div className="col">
                <h2 className="mb-1">{weatherData.city}</h2>
                <p>
                    <span>{weatherData.date}</span><br/>
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
                    <li className="small">Precipitation: {weatherData.precipitation}%</li>
                    <li className="small">Humidity: {weatherData.humidity}%</li>
                    <li className="small">Wind: {weatherData.wind} km/h</li>
                </ul>
            </div>
        </div>
    )
}