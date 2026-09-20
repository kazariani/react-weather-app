import React from "react";
import "./Form.css";

export default function Form() {
    return (
        <form className="row align-items-stretch my-5">
            <div className="col pe-1">
                <input type="text" className="form-control" placeholder="Enter a city" />
            </div>

            <div className="col-auto ps-0">
                <button type="submit" className="btn btn-primary">Suchen</button>
            </div>

            <div className="col-auto">
                <button type="submit" className="btn btn-primary">
                    <i className="fa-solid fa-location-crosshairs"></i> Aktueller Standort
                </button>
            </div>
        </form>
    )
}