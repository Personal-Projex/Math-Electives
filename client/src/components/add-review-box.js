import React, { useState } from 'react';
import Rate from "./star-ratings";

export default function AddReviewBox(props) {
    const [enjoyRating, setEnjoyRating] = useState(0);
    const [usefulRating, setUsefulRating] = useState(0);
    const [manageRating, setManageRating] = useState(0);
    const [title, setTitle] = useState('');
    const [addName, setAddName] = useState(true);
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
            addName: addName,
            reviewEnjoyment: enjoyRating,
            reviewUsefulness: usefulRating,
            reviewManageability: manageRating
        }

        const response = await fetch('https://math-electives-api.onrender.com/addReview', {
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
        <div className='add-review-overlay'>
            <div className='add-review-wrapper'>
                {alert &&
                    <div>
                        <div className="timer-bar"></div>
                        <div className="alert-box">
                            <p className="alert">{retVal}</p>
                        </div>
                    </div>
                }
                <div className="add-review-header">Add your review below!</div>
                <span className="add-review-close" onClick={props.handleClose}>&times;</span>
                <div className='add-review-content'>
                    <div className='add-review-container'>
                        <form action="" onSubmit={submitHandler}>
                            <div className='checkbox-container'>
                                <label>Review title</label>
                                <label className='add-name-checkbox'>
                                    <input className='checkbox' type="checkbox" name='Include name' onChange={e => setAddName(!addName)} />
                                    <span>Post as anonymous</span>
                                </label>
                            </div>
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
