import React from "react";
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Stars({ numStars }) {
    const ratingStars = Array.from({ length: 5 }, (elem, index) => {
        let number = index + 0.5;

        return (
            <span key={index}>
                {numStars >= index + 1 ? <FontAwesomeIcon icon={faStar}></FontAwesomeIcon> : numStars >= number ? <FontAwesomeIcon icon={faStarHalfAlt}></FontAwesomeIcon> : <FontAwesomeIcon icon="fa-regular fa-star" />}
            </span>
        )
    })

    return (
        <div className="rating">
            {ratingStars}
        </div>
    )
}