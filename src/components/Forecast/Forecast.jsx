import React, { useState, useEffect } from "react";
import "./Forecast.css";
import axios from "axios";
import ForecastDay from "./ForecastDay.jsx";

export default function Forecast(props) {
    let [forecastData, setForecastData] = useState({ ready: false });

    useEffect(() => {
        setForecastData({ ready: false });
    }, [props.data.city]);

    const handleResponse = (response) => {
        setForecastData({ data: response.data.forecast.forecastday, ready: true });
    }

    const loadForecast = () => {
        const apiKey = "efb47f8f59024381bff113346262109";
        let city = props.data.city;
        let apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&aqi=no&alerts=no`;

        axios.get(apiUrl).then(handleResponse);
    }

    if (forecastData.ready) {
        return (
            <div className="row weather-next mt-5">
                {forecastData.data.map(function (forecastDay, index) {
                    if (index < 7) {
                        return (
                            <div className="col" key={index}>
                                <ForecastDay data={forecastDay} />
                            </div>
                        );
                    } else {
                        return null;
                    }
                })}
            </div>
        );
    } else {
        loadForecast();
        return null;
    }
}