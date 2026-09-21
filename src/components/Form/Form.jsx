import React, { useState } from "react";
import Weather from "../Weather/Weather.jsx";
import Forecast from "../Forecast/Forecast.jsx";
import axios from "axios";
import "./Form.css";

export default function Form(props) {
    const [weatherData, setWeatherData] = useState({ ready: false });
    const [city, setCity] = useState(props.defaultCity);

    function handleResponse(response) {
        console.log(response.data);
        setWeatherData({
            city: response.data.location.name,
            //date: new Date(response.data.current.localtime_epoch * 1000),
            date: response.data.location.localtime,
            description: response.data.current.condition.text,
            feelsLike: Math.round(response.data.current.feelslike_c),
            temperature: Math.round(response.data.current.temp_c),
            iconUrl: response.data.current.condition.icon,
            precipitation: response.data.current.cloud,
            humidity: response.data.current.humidity,
            wind: Math.round(response.data.current.wind_kph),
            coordinates: response.data.location,
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
        const apiKey = "efb47f8f59024381bff113346262109";
        let apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;
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
                <Forecast data={weatherData} />
            </div>
        )
    } else {
        search();
        return "Loading...";
    }
}