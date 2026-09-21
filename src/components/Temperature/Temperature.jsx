import React, { useState } from "react";
import "./Temperature.css";

export default function Temperature(props) {
    const [unit, setUnit] = useState("C");

    const toggleUnit = (event) => {
        event.preventDefault();
        setUnit(unit === "C" ? "F" : "C");
    };

    return (
        <span className="temperature-today">
            <span className="temperature-value">{unit === "C" ? props.data : Math.round(props.data*9/5 + 32)}</span>
            <span className="temperature-unit">
                °{unit} | <a href="#" onClick={toggleUnit}>°{unit === "C" ? "F" : "C"}</a>
            </span>
        </span>
    )
}