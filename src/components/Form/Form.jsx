import React, { useState } from "react";
import Weather from "../Weather/Weather.jsx";
import Forecast from "../Forecast/Forecast.jsx";
import Cities from "../Cities/Cities.jsx";
import axios from "axios";
import "./Form.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function Form(props) {
    const [weatherData, setWeatherData] = useState({ ready: false });
    const [city, setCity] = useState(props.defaultCity);

    const iconLocation = <FontAwesomeIcon icon={faLocationCrosshairs} />
    const iconSearch = <FontAwesomeIcon icon={faMagnifyingGlass} />


    const handleResponse = (response) => {
        setWeatherData({
            city: response.data.location.name,
            country: response.data.location.country,
            timezone: response.data.location.tz_id,
            date: response.data.location.localtime_epoch,
            description: response.data.current.condition.text,
            feelsLike: Math.round(response.data.current.feelslike_c),
            temperature: Math.round(response.data.current.temp_c),
            iconUrl: response.data.current.condition.icon,
            precipitation: response.data.current.cloud,
            humidity: response.data.current.humidity,
            wind: Math.round(response.data.current.wind_kph),
            coordinates: response.data.location,
            forecast: response.data.forecast.forecastday,
            ready: true
        });

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        search();
    }

    const handleCityChange = (event) => {
        setCity(event.target.value);
    }

    const search = () => {
        const apiKey = "efb47f8f59024381bff113346262109";
        let apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&aqi=no&alerts=no`;
        axios.get(apiUrl).then(handleResponse);
    }

    if (weatherData.ready) {
        return (
            <div>
                <Cities data={weatherData} />

                <form onSubmit={handleSubmit} className="row align-items-stretch">
                    <div className="col pe-1">
                        <input onChange={handleCityChange} type="search" className="form-control" placeholder="Please enter a city..." />
                    </div>

                    <div className="col-auto ps-0">
                        <button type="submit" className="btn btn-primary">
                            {iconSearch} Search
                        </button>
                    </div>

                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary">
                            {iconLocation} Current Location
                        </button>
                    </div>
                </form>

                <Weather data={weatherData} />
                <Forecast data={weatherData.forecast} />
            </div>
        )
    } else {
        search();
        return null;
    }
}