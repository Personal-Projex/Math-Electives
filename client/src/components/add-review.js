import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import Rate from "./star-ratings";

export default function AddReview(props) {
    const [enjoyRating, setEnjoyRating] = useState(0);
    const [usefulRating, setUsefulRating] = useState(0);
    const [manageRating, setManageRating] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [termTaken, setTermTaken] = useState('');

    async function submitHandler(e) {
        const review = {
            courseCode: props.code,
            reviewTitle: title,
            reviewText: description,
            termTaken: termTaken,
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
        console.log(response.status);
    }

    return (
        <>
            <div className='add-review-box'>
                <a href='#addReview' className='add-review-button'>
                    <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                    Add a review</a>
            </div>
            <div className='add-review-overlay' id='addReview'>
                <div className='add-review-wrapper'>
                    <h2>Add your review below!</h2>
                    <a href={`/review/${props.code}`} className="add-review-close">&times;</a>
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
                                <input type="submit" value="submit" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}