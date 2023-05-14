import React, { useEffect, useState } from 'react';
import Rate from "./star-ratings";

export default function EditReview(props) {

    const review = props.reviewObj;
    useEffect(() => {
        setTitle(review.reviewTitle);
        setDescription(review.reviewText);
        setTermTaken(review.termTaken);
    }, [review])

    const [enjoyRating, setEnjoyRating] = useState(review.reviewEnjoyment);
    const [usefulRating, setUsefulRating] = useState(review.reviewUsefulness);
    const [manageRating, setManageRating] = useState(review.reviewManageability);
    const [title, setTitle] = useState(review.reviewTitle);
    const [description, setDescription] = useState(review.reviewText);
    const [termTaken, setTermTaken] = useState(review.termTaken);
    const [alert, setAlert] = useState(false);
    const [retVal, setRetVal] = useState('');

    async function submitHandler(e) {
        e.preventDefault();
        const editedData = {
            reviewId: review._id,
            reviewTitle: title,
            reviewText: description,
            termTaken: termTaken.toUpperCase(),
            reviewEnjoyment: enjoyRating,
            reviewUsefulness: usefulRating,
            reviewManageability: manageRating
        }

        let response = await fetch('https://math-electives-server.onrender.com/editReview', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedData)
        });

        setAlert(alert => !alert);
        let added = false;
        if (response.status === 200) {
            setRetVal('Edited Review!');
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
                <div className="edit-review-header">Edit your review below!</div>
                <span className="edit-review-close" onClick={props.handleClose}>&times;</span>
                <div className='edit-review-content'>
                    <div className='edit-review-container'>
                        <form action="" onSubmit={submitHandler}>
                            <label>Review title</label>
                            <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
                            <label>Review description</label>
                            <textarea className='review-desc' type="text" value={description} onChange={e => setDescription(e.target.value)} />
                            <label>Term taken</label>
                            <input type="text" value={termTaken} onChange={e => setTermTaken(e.target.value)} />
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
                </div>
            </div>
        </div>
    )
}