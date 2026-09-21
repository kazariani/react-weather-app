import React from "react";
import "./Weather.css";

import FormattedDate from "../FormattedDate/FormattedDate.jsx";
import Temperature from "../Temperature/Temperature.jsx";

export default function Weather(props) {
    return (
        <div className="row align-items-center mt-5">
            <div className="col">
                <h2 className="mb-1">{props.data.city}</h2>
                <p>
                    <FormattedDate date={props.data.date} />
                    {props.data.description}
                </p>
            </div>

            <div className="col text-nowrap">
                <img src={props.data.iconUrl} alt={props.data.description} className="weather-today" />

                <Temperature data={props.data.temperature} />
            </div>

            <div className="col-auto">
                <ul className="list-unstyled text-end">
                    <li className="small">Feels like: {props.data.feelsLike}°C</li>
                    <li className="small">Precipitation: {props.data.precipitation}%</li>
                    <li className="small">Humidity: {props.data.humidity}%</li>
                    <li className="small">Wind: {props.data.wind} km/h</li>
                </ul>
            </div>
        </div>
    )
}