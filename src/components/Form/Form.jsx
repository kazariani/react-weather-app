import React, { useState } from "react";
import Weather from "../Weather/Weather.jsx";
import Forecast from "../Forecast/Forecast.jsx";
import axios from "axios";
import "./Form.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fas, far)

export default function Form(props) {
    const [weatherData, setWeatherData] = useState({ ready: false});
    const [city, setCity] = useState(props.defaultCity);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const apiKey = "efb47f8f59024381bff113346262109";
    const iconLocation = <FontAwesomeIcon icon="fa-solid fa-location-crosshairs" />;
    const iconSearch = <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />;
    const iconHeart = <FontAwesomeIcon icon="fa-regular fa-heart" />;
    const iconHeartFilled = <FontAwesomeIcon icon="fa-solid fa-heart" />;
    const iconRemove = <FontAwesomeIcon icon="fa-solid fa-xmark" />;
    const [savedCities, setSavedCities] = useState(() => {
        const saved = localStorage.getItem("savedCities");

        return saved ? JSON.parse(saved) : [];
    });

    const addFavorite = async () => {
        if (!city) {
            return;
        }

        if (savedCities.includes(city)) {
            return;
        }

        setSavedCities((currentCities) => [
            ...currentCities,
            city,
        ]);
        localStorage.setItem("savedCities", JSON.stringify([...savedCities, city]));
    };

    const handleRemoveCity = (cityToRemove) => {
        setSavedCities((currentCities) =>
            currentCities.filter(
                (city) => city !== cityToRemove
            )
        );
        localStorage.setItem("savedCities", JSON.stringify(savedCities.filter(
            (city) => city !== cityToRemove
        )));
    };

    const onCitySelect = (city) => {
        setCity(city);
        search();
    };

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
        setError("");
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        search();
    }

    const handleCityChange = (event) => {
        setCity(event.target.value);
    }

    const handleResponseLocation = (response) => {
        setCity(response.data.location.name);
        search();
    }

    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser.");
            return;
        }

        setLoading(true);
        setError("");

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                let lat = parseFloat(position.coords.latitude).toFixed(4);
                let lon = parseFloat(position.coords.longitude).toFixed(4);

                try {
                    let apiUrlLocation = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`;
                    axios.get(apiUrlLocation).then(handleResponseLocation);
                } catch (err) {
                    setError("Unable to fetch weather data.");
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            },

            (error) => {
                setLoading(false);

                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        setError("Please allow location access.");
                        break;

                    case error.POSITION_UNAVAILABLE:
                        setError("Your location could not be determined.");
                        break;

                    case error.TIMEOUT:
                        setError("Location request timed out.");
                        break;

                    default:
                        setError("Something went wrong.");
                }
            },

            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    }

    const search = () => {
        let apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&aqi=no&alerts=no`;
        axios.get(apiUrl).then(handleResponse).catch((error) => {
            setError("Could not fetch weather data.");
        }).finally(() => {
            setLoading(false);
        });
    }

    if (weatherData.ready) {
        return (
            <div>
                <div className="row align-items-start mb-5">
                    <div className="col-auto">
                        {savedCities.includes(city) ? <span className="fav-add" onClick={() => handleRemoveCity(city)}>{iconHeartFilled}</span> : (
                            <span className="fav-add" onClick={addFavorite}>{iconHeart}</span>
                        )}
                    </div>

                    <div className="col text-end">
                        {savedCities.map(function(item, index){
                            return (
                                <div key={index} className="d-inline-block ms-3">
                                    <small className="fav-city" onClick={() => onCitySelect(item)}>{item}</small> <small onClick={() => handleRemoveCity(item)} className="fav-remove">{iconRemove}</small>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <span className="error">{error && <p>{error}</p>}</span>

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
                        <button onClick={getCurrentLocation} disabled={loading} type="button" className="btn btn-primary">
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