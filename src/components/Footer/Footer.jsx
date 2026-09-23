import React from "react";
import "./Footer.css"

export default function Footer() {
    return (
        <footer className="d-flex justify-content-between align-items-center text-muted mt-2">
            <small>Powered by <a href="https://www.weatherapi.com/" title="Free Weather API">WeatherAPI.com</a></small>
            <small>Open source code by <a href="https://github.com/kazariani/weather-app" target="_blank">kazariani</a></small>
        </footer>
    )
}