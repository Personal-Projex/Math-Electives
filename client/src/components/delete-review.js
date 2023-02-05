import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
export default function DeleteReview(props) {


    const [alert, setAlert] = useState(false);
    const [retVal, setRetVal] = useState('');

    async function submitHandler(e) {
        e.preventDefault();
        const deleteData = {
            reviewObj: props.reviewObj,
        }

        const response = await fetch('https://Math-Electives-API.onrender.com/deleteReview', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(deleteData)
        })

        setAlert(alert => !alert);
        let added = false;
        if (response.status === 200) {
            setRetVal('Review deleted!');
            added = true;
            document.documentElement.style.setProperty('--timerBarColour', 'lime');
        } else {
            let { message } = await response.json();
            setRetVal(message);
            document.documentElement.style.setProperty('--timerBarColour', 'red');
        }

        if (added) {
            document.documentElement.style.setProperty('--timerBarLength', '1.3s');
            setTimeout(() => {
                setAlert(alert => !alert);
                window.location.reload(false);
            }, 1300);
        } else {
            // Make the alert disappear after 2 seconds
            setTimeout(() => {
                setAlert(alert => !alert);
            }, 2000);
        }
    }

    return (
        <div className='delete-review-overlay'>
            <div className='delete-review-wrapper'>
                {alert &&
                    <div>
                        <div className="timer-bar"></div>
                        <div className="alert-box">
                            <p className="alert">{retVal}</p>
                        </div>
                    </div>
                }
                <span className="delete-review-close" onClick={props.handleClose}>&times;</span>
                <div className='delete-content'>
                    <FontAwesomeIcon className='delete-icon' icon={faTrash} size='4x'></FontAwesomeIcon>
                    <div className="delete-review-header">Are you sure?</div>
                    <p className='delete-review-text'>Do your really want to delete this review?</p>
                    <button className="delete-review-button" onClick={submitHandler}>Delete</button>
                </div>
            </div>
        </div>
    )
}