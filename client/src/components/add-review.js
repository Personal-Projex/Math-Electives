import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import AddReviewBox from './add-review-box';
import sessionStorage from 'sessionstorage';

export default function AddReview(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [alert, setAlert] = useState(false);

    const togglePopup = () => {
        const user = sessionStorage.getItem('name');
        console.log(user);
        // checking if user not logged in before reviewing
        if (user === null || user === '') {
            document.documentElement.style.setProperty('--timerBarColour', 'red');
            setAlert(!alert);
            // Make the alert disappear after 2 seconds
            setTimeout(() => {
                setAlert(alert => !alert);
            }, 2000);
        } else {
            setIsOpen(!isOpen);
        }
    }

    return (
        <>
            {alert &&
                <div>
                    <div className="timer-bar"></div>
                    <div className="alert-box">
                        <p className="alert">Please login before reviewing</p>
                    </div>
                </div>
            }
            <div className='add-review-box'>
                <button className='add-review-button' onClick={togglePopup}>
                    <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                    Submit a review</button>
            </div>
            {isOpen && <AddReviewBox handleClose={togglePopup} code={props.code} />}
        </>
    )
}