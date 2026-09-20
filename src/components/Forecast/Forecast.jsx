import React from "react";
import "./Forecast.css";

export default function Forecast(){
    let forecastData = {
        mon: "+13",
        tue: "+15",
        wed: "+14",
        thu: "+16",
        fri: "+18",
        sat: "+17",
        sun: "+19",
      };
    return (
        <div className="row weather-next my-3">
            <div className="col text-center">
                <div className="week-day">Mon</div>
                <i className="fa-solid fa-cloud-rain"></i>
                <span className="temperature-next">{forecastData.mon}°</span>
            </div>
            <div className="col text-center">
                <div className="week-day">Tue</div>
                <i className="fa-solid fa-cloud-bolt"></i>
                <span className="temperature-next">{forecastData.tue}°</span>
            </div>
            <div className="col text-center">
                <div className="week-day">Wed</div>
                <i className="fa-solid fa-cloud"></i>
                <span className="temperature-next">{forecastData.wed}°</span>
            </div>
            <div className="col text-center">
                <div className="week-day">Thu</div>
                <i className="fa-solid fa-cloud-sun"></i>
                <span className="temperature-next">{forecastData.thu}°</span>
            </div>
            <div className="col text-center">
                <div className="week-day">Fri</div>
                <i className="fa-solid fa-sun"></i>
                <span className="temperature-next">{forecastData.fri}°</span>
            </div>
            <div className="col text-center">
                <div className="week-day">Thu</div>
                <i className="fa-solid fa-cloud-sun"></i>
                <span className="temperature-next">{forecastData.sat}°</span>
            </div>
            <div className="col text-center">
                <div className="week-day">Fri</div>
                <i className="fa-solid fa-sun"></i>
                <span className="temperature-next">{forecastData.sun}°</span>
            </div>
        </div>
    )
}