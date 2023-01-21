import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import ReviewBox from './review-box';
import AddReview from './add-review';
import './review.css';

export default function SearchReviews(props) {
    const [currSearchReview, setCurrSearchReview] = useState("");
    const [clickedReview, setClickedReview] = useState(false);

    const dropDown = () => {
        let list = document.getElementById("list");
        let selectText = document.getElementById("selectText");
        let options = document.getElementsByClassName("options");
        let inputfield = document.getElementById("inputfield");

        list.classList.toggle("open");
        setClickedReview(!clickedReview);

        for (const option of options) {
            option.onclick = function () {
                selectText.innerHTML = this.innerHTML;
                inputfield.value = "";
                if (this.innerHTML !== "All reviews") {
                    inputfield.placeholder = selectText.innerHTML;
                    setCurrSearchReview(this.innerHTML);
                } else {
                    inputfield.placeholder = "Search Key Words";
                    setCurrSearchReview("");
                }
            }
        }
    }

    return (
        <>
            <p className="review-text">Reviews</p>
            <div className="search-bar">
                <div onClick={dropDown} className="r-select" id="r-select">
                    <p id="selectText">All reviews</p>
                    <FontAwesomeIcon href="#/" icon={clickedReview ? faCaretUp : faCaretDown}></FontAwesomeIcon>
                    <ul id="list">
                        <li className="options">Most Recent</li>
                        <li className="options">Highest Rating to Lowest</li>
                        <li className="options">Lowest Rating to Highest</li>
                    </ul>
                </div>
                <input type="text" id="inputfield" placeholder="Search Key Words" onChange={e => { setCurrSearchReview(e.target.value) }} />
                <a className="search-btn" href="true" onClick={e => e.preventDefault()}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="xl"></FontAwesomeIcon>
                </a>
                <AddReview code={props.code} />
            </div>
            <ReviewBox search={currSearchReview} code={props.code} />
        </>
    )
}