import React, { useState } from "react";
import "./Weather.css";

import FormattedDate from "../FormattedDate/FormattedDate.jsx";
import Temperature from "../Temperature/Temperature.jsx";


export default function Weather(props) {
    return (
        <div className="mt-5">
            <h2>{props.data.city} <small className="text-secondary">({props.data.country})</small></h2>
            
            <div className="row align-items-center">
                <div className="col-auto">
                    <FormattedDate city={props.data.city} date={props.data.date} timezone={props.data.timezone} />
                    <span className="text-secondary">{props.data.description}</span>
                </div>

                <div className="col text-nowrap text-end">
                    <img src={props.data.iconUrl} alt={props.data.description} className="weather-icon" />

                    <Temperature data={props.data.temperature} />
                </div>

                <div className="col-4">
                    <ul className="list-unstyled text-end mb-0">
                        <li className="small"><span className="text-secondary">Feels like:</span> {props.data.feelsLike}°C</li>
                        <li className="small"><span className="text-secondary">Precipitation:</span> {props.data.precipitation}%</li>
                        <li className="small"><span className="text-secondary">Humidity:</span> {props.data.humidity}%</li>
                        <li className="small"><span className="text-secondary">Wind:</span> {props.data.wind} km/h</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}