import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import Courses from './courses';

library.add(faMagnifyingGlass, faCaretDown, faCaretUp);

export default function CourseHeader({ loading, coursesRecieved }) {
    const [currSearch, setCurrSearch] = useState("");
    const [clicked, setClicked] = useState(false);
    console.log(loading)

    const dropDown = () => {
        let list = document.getElementById("list");
        let selectText = document.getElementById("selectText");
        let options = document.getElementsByClassName("options");
        let inputfield = document.getElementById("inputfield");

        list.classList.toggle("open");
        setClicked(!clicked);

        for (const option of options) {
            option.onclick = function () {
                selectText.innerHTML = this.innerHTML;
                inputfield.value = "";
                if (this.innerHTML !== "All Categories") {
                    inputfield.placeholder = selectText.innerHTML;
                    if (this.innerHTML === "Applied Mathematics") {
                        setCurrSearch("Applied");
                    } else if (this.innerHTML === "Statistics") {
                        setCurrSearch("Stats");
                    } else if (this.innerHTML === "Pure Mathematics") {
                        setCurrSearch("Pure");
                    } else if (this.innerHTML === "Actuarial Studies") {
                        setCurrSearch("Actuarial")
                    }
                } else {
                    inputfield.placeholder = "Search Key Words";
                    setCurrSearch("");
                }
            }
        }
    }

    return (
        <>
            {!loading && (
                <div className="course-heading">
                    <div className="main-logo">
                        <img alt="" src="images/oki.png" width="430" height="270" />
                    </div>
                    <div className="search-bar">
                        <div onClick={dropDown} className="select" id="select">
                            <p id="selectText">All Categories</p>
                            <FontAwesomeIcon href="#/" icon={!clicked ? faCaretDown : faCaretUp}></FontAwesomeIcon>
                            <ul id="list" className="lists">
                                <li className="options">All Categories</li>
                                <li className="options">Applied Mathematics</li>
                                <li className="options">Pure Mathematics</li>
                                <li className="options">Statistics</li>
                                <li className="options">Actuarial Studies</li>
                            </ul>
                        </div>
                        <input type="text" id="inputfield" placeholder="Search Key Words" onChange={e => { setCurrSearch(e.target.value) }} />
                        <a className="search-btn" href="true" onClick={e => e.preventDefault()}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} size="xl"></FontAwesomeIcon>
                        </a>
                    </div>
                </div>
            )}
            <Courses recievedCourses={coursesRecieved} search={currSearch} />
        </>
    )
}