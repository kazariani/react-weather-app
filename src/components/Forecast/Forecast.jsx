import React, { useState } from "react";
import "./Forecast.css";
import axios from "axios";

export default function Forecast(props) {
    let [forecastData, setForecastData] = useState({ ready: false });

    function handleResponse(response) {
        setForecastData({data: response.data.forecast.forecastday, ready: true });
    }

    const apiKey = "efb47f8f59024381bff113346262109";
    let city = props.data.city;
    let apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&aqi=no&alerts=no`;
    
    axios.get(apiUrl).then(handleResponse);

    if (!forecastData.ready) {
        return null;
    } else {
        return (
            <div className="row weather-next my-3">
                {forecastData.data.map(function (forecastDay, index) {
                    if (index < 7) {
                        return (
                            <div className="col text-center" key={index}>
                                <div className="week-day">{new Date(forecastDay.date).toLocaleDateString("en-US", { weekday: "short" })}</div>
                                <img alt={forecastDay.day.condition.text} src={forecastDay.day.condition.icon}></img>
                                <span className="temperature-max">{Math.round(forecastDay.day.maxtemp_c)}°</span>
                                <span className="temperature-min">{Math.round(forecastDay.day.mintemp_c)}°</span>
                            </div>
                        );
                    } else {
                        return null;
                    }
                })}
            </div>
        );
    }
}