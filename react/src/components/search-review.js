import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import './review.css';

export default function SearchReviews() {
    const [currSearch, setCurrSearch] = useState("");
    const [clicked, setClicked] = useState(false);

    const dropDown = () => {
        let select = document.getElementById("r-select");
        let list = document.getElementById("list");
        let selectText = document.getElementById("selectText");
        let options = document.getElementsByClassName("options");
        let inputfield = document.getElementById("inputfield");

        select.onclick = function () {
            list.classList.toggle("open");
            setClicked(!clicked);
        }

        for (const option of options) {
            option.onclick = function () {
                selectText.innerHTML = this.innerHTML;
                inputfield.placeholder = selectText.innerHTML;
            }
        }
    }
    return (
        <>
            <p className="review-text">Reviews</p>
            <div className="search-bar">
                <div onClick={dropDown} className="r-select" id="r-select">
                    <p id="selectText">All categories</p>
                    <FontAwesomeIcon href="#/" icon={clicked ? faCaretUp : faCaretDown}></FontAwesomeIcon>
                    <ul id="list">
                        <li className="options">All Categories</li>
                        <li className="options">Most Recent</li>
                        <li className="options">Highest Rating to Lowest</li>
                        <li className="options">Lowest Rating to Highest</li>
                    </ul>
                </div>
                <input type="text" id="inputfield" placeholder="Search Key Words" onChange={e => setCurrSearch(e.target.value)} />
                <a className="search-btn" href="#/" onClick={e => setCurrSearch(e.target.value)}>
                    <FontAwesomeIcon href="#/" icon={faMagnifyingGlass} size="xl"></FontAwesomeIcon>
                </a>
            </div>
        </>
        // need to create a seperate component for the reviews so that we can pass the search item above and then in the review component it will sort
    )
}