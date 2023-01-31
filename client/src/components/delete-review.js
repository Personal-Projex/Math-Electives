import React, { useState } from 'react';

export default function DeleteReview(props) {

    const review = props.reviewObj;

    const [alert, setAlert] = useState(false);
    const [retVal, setRetVal] = useState('');

    async function submitHandler(e) {
        e.preventDefault();
        const deleteData = {
            reviewId: review._id,
        }
        console.log(deleteData);

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
                {/*<div className='edit-review-content'>
                    <div className='edit-review-container'>
                        <form action="" onSubmit={submitHandler}>
                            <label>Review title</label>
                            <input type="text" placeholder={review.reviewTitle} onChange={e => setTitle(e.target.value)} />
                            <label>Review description</label>
                            <input type="text" placeholder={review.reviewText} onChange={e => setDescription(e.target.value)} />
                            <label>Term taken</label>
                            <input type="text" placeholder={review.termTaken} onChange={e => setTermTaken(e.target.value)} />
                            <div className='edit-review-ratings'>
                                <div className='ratings-box'>
                                    <label>Enjoyment</label>
                                    <Rate rating={enjoyRating} onRating={rate => setEnjoyRating(rate)} />
                                </div>
                                <div className='ratings-box'>
                                    <label>Usefulness</label>
                                    <Rate rating={usefulRating} onRating={rate => setUsefulRating(rate)} />
                                </div>
                                <div className='ratings-box'>
                                    <label>Manageability</label>
                                    <Rate rating={manageRating} onRating={rate => setManageRating(rate)} />
                                </div>
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div> */}
            </div>
        </div>
    )
}