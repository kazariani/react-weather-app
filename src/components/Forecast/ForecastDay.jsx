import React from "react";

export default function ForecastDay(props) {
    return (
        <div className="text-center">
            <div>{new Date(props.data.date).toLocaleDateString("en-US", { weekday: "short" })}</div>
            <small className="text-secondary">{new Date(props.data.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</small>
            <img alt={props.data.day.condition.text} src={props.data.day.condition.icon}></img>
            <span className="temperature-max me-2">{Math.round(props.data.day.maxtemp_c)}°</span>
            <span className="temperature-min text-secondary">{Math.round(props.data.day.mintemp_c)}°</span>
        </div>
    );
}