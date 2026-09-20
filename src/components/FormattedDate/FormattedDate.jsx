import React from "react";

export default function FormattedDate(props) {
    return (
        <div>
            <span>{props.date.toLocaleDateString("de-DE", { weekday: "long" })}</span>
            <span> {props.date.getHours()}:{props.date.getMinutes()} Uhr</span>
        </div>
    );
}