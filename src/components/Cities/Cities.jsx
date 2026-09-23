import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fas, far)

export default function Cities(props) {
    //console.log(props.data);
    console.log(props.defaultCity);
    let iconHeart = <FontAwesomeIcon icon="fa-regular fa-heart" />
    

    const addFavorite = (event) => {
        event.preventDefault();
        iconHeart = <FontAwesomeIcon icon="fa-solid fa-heart" />
    }

    return (
        <div className="row align-items-center mb-5">
            <div className="col-auto">
                <a onClick={addFavorite} href="">{iconHeart}</a>
            </div>

            <div className="col text-end">
                <a className="ms-3" href=""><small>{props.defaultCity}</small></a>
                <a className="ms-3" href=""><small>Berlin</small></a>
                <a className="ms-3" href=""><small>Madrid</small></a>
                <a className="ms-3" href=""><small>London</small></a>
            </div>
        </div>
    )
}