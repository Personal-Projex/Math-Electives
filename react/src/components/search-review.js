import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './review.css';

export default function SearchReviews() {
    return (
        <>
            <p className="review-text">Reviews</p>
            <div className="search-bar">
                <div className="r-select" id="r-select">
                    <p id="selectText">All categories</p>
                    <i className="fa-solid fa-caret-down"></i>
                    <ul id="list">
                        <li className="options">All Categories</li>
                        <li className="options">Most Recent</li>
                        <li className="options">Highest Rating to Lowest</li>
                        <li className="options">Lowest Rating to Highest</li>
                    </ul>
                </div>
                <input type="text" id="inputfield" placeholder="Search Key Words" />
                <a className="search-btn" href="#/">
                    <FontAwesomeIcon href="#/" icon={faMagnifyingGlass} size="xl"></FontAwesomeIcon>
                </a>
            </div>
        </>
    )
}