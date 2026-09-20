import React from "react";

export default function Cities(){
    return(
        <div className="row">
        <div className="col">
            <small>Results for <span>Freudenstadt</span></small>
        </div>
        <div className="col-auto">
            <small>
                <a className="me-3" href="">Kyiv</a>
                <a className="me-3" href="">Berlin</a>
                <a className="me-3" href="">Tel Aviv</a>
                <a className="me-3" href="">London</a>
            </small>
        </div>
    </div>
    )
}