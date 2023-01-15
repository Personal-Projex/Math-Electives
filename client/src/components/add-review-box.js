import React, { useState } from 'react';
import Rate from "./star-ratings";

export default function AddReviewBox(props) {
    const [enjoyRating, setEnjoyRating] = useState(0);
    const [usefulRating, setUsefulRating] = useState(0);
    const [manageRating, setManageRating] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [termTaken, setTermTaken] = useState('');
    const [alert, setAlert] = useState(false);
    const [retVal, setRetVal] = useState('');

    async function submitHandler(e) {
        e.preventDefault();
        const review = {
            courseCode: props.code,
            reviewTitle: title,
            reviewText: description,
            termTaken: termTaken.toUpperCase(),
            username: "Anonymous",
            reviewEnjoyment: enjoyRating,
            reviewUsefulness: usefulRating,
            reviewManageability: manageRating
        }

        const response = await fetch('http://127.0.0.1:8000/addReview', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(review)
        })

        setAlert(alert => !alert);
        let added = false;
        if (response.status === 200) {
            setRetVal('Added review!');
            added = true;
        } else {
            let { message } = await response.json();
            setRetVal(message);
        }

        // Make the alert disappear after 1 seconds
        setTimeout(() => {
            setAlert(alert => !alert);
            if (added) {
                window.location.reload(false);
            }
        }, 1200);
    }

    return (
        <div className='add-review-overlay'>
            <div className='add-review-wrapper'>
                {alert &&
                    <div className="alert-box">
                        <p className="alert">{retVal}</p>
                    </div>
                }
                <h2>Add your review below!</h2>
                <span className="add-review-close" onClick={props.handleClose}>&times;</span>
                <div className='add-review-content'>
                    <div className='add-review-container'>
                        <form action="" onSubmit={submitHandler}>
                            <label>Review title</label>
                            <input type="text" placeholder='Your review title' onChange={e => setTitle(e.target.value)} />
                            <label>Review description</label>
                            <input type="text" placeholder='Your review description' onChange={e => setDescription(e.target.value)} />
                            <label>Term taken</label>
                            <input type="text" placeholder='e.g. 22T3' onChange={e => setTermTaken(e.target.value)} />
                            <div className='add-review-ratings'>
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
