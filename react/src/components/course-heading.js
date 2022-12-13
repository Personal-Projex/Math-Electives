import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faMagnifyingGlass, faCaretDown, faCaretUp);

export default function CourseHeader() {
    let clicked = false;
    const dropDown = () => {
        let select = document.getElementById("select");
        let list = document.getElementById("list");
        let selectText = document.getElementById("selectText");
        let options = document.getElementsByClassName("options");
        let inputfield = document.getElementById("inputfield");

        select.onclick = function () {
            list.classList.toggle("open");
        }

        for (const option of options) {
            option.onclick = function () {
                selectText.innerHTML = this.innerHTML;
                inputfield.placeholder = selectText.innerHTML;
            }
        }
        clicked = true;
    }


    return (
        <div className="course-heading">
            <div className="main-logo">
                <img alt="" src="images/newLogo4.png" width="800" height="330" />
            </div>
            <div className="search-bar">
                <div onClick={dropDown} className="select" id="select">
                    <p id="selectText">All categories</p>
                    <FontAwesomeIcon href="#/" icon={clicked ? faCaretUp : faCaretDown}></FontAwesomeIcon>
                    <ul id="list" className="lists">
                        <li className="options">All Categories</li>
                        <li className="options">Applied Mathematics</li>
                        <li className="options">Pure Mathematics</li>
                        <li className="options">Statistics</li>
                        <li className="options">Actuarial Studies</li>
                    </ul>
                </div>
                <input type="text" id="inputfield" placeholder="Search Key Words" />
                <a className="search-btn" href="#/">
                    <FontAwesomeIcon href="#/" icon={faMagnifyingGlass} size="xl"></FontAwesomeIcon>
                </a>
            </div>
        </div>
    )
}