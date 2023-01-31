import React, { useState } from 'react';

export default function DeleteReview(props) {


    const [alert, setAlert] = useState(false);
    const [retVal, setRetVal] = useState('');

    async function submitHandler(e) {
        e.preventDefault();
        const deleteData = {
            reviewObj: props.reviewObj,
        }

        const response = await fetch('http://127.0.0.1:8000/deleteReview', {
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

        // Make the alert disappear after 2 seconds
        setTimeout(() => {
            setAlert(alert => !alert);
            if (added) {
                window.location.reload(false);
            }
        }, 2000);
    }

    return (
        <div className='edit-review-overlay'>
            <div className='edit-review-wrapper'>
                {alert &&
                    <div>
                        <div className="timer-bar"></div>
                        <div className="alert-box">
                            <p className="alert">{retVal}</p>
                        </div>
                    </div>
                }
                <div className="edit-review-header">Confirm you want to delete this review</div>
                <span className="edit-review-close" onClick={props.handleClose}>&times;</span>
                <button onClick={submitHandler}>Delete</button>
            </div>
        </div>
    )
}