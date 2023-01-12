import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './review.css';

export default async function ReviewBox(props) {
    const [reviews, setReviews] = useState();

    useEffect(() => {
        const asyncCall = async () => {
            const res = await fetch("http://127.0.0.1:8000/getReviews?courseCode=DATA1001");
            const reviews = await res.json();
            setReviews(reviews);
        }
        asyncCall();
    }, [])

    // const display = reviews.filter((review) => [review.reviewTitle, review.reviewText, review.termTaken].includes("Hard")).map((review, pos) => {
    // })
    console.log(reviews);
    if (reviews) {
        console.log(reviews);
        let review = reviews[0];
        return (
            <div className="review-box-container">
                <div className="review-box">
                    <div className="title">
                        <strong>{review.reviewTitle}</strong>
                    </div>
                    <div className="box-top">
                        <div className='overall-rating'>
                            <span>Overall: </span>
                            <div className="rating">
                                <FontAwesomeIcon className='fa-star-review one' href="#/" icon={faStar}></FontAwesomeIcon>
                                <FontAwesomeIcon className='fa-star-review two' href="#/" icon={faStar}></FontAwesomeIcon>
                                <FontAwesomeIcon className='fa-star-review three' href="#/" icon={faStar}></FontAwesomeIcon>
                                <FontAwesomeIcon className='fa-star-review four' href="#/" icon={faStar}></FontAwesomeIcon>
                                <FontAwesomeIcon className='fa-star-review five' href="#/" icon={faStar}></FontAwesomeIcon>
                            </div>
                            <div>Term taken: {review.termTaken}</div>
                        </div>
                        <div className="user-data">
                            <div className="review-date">{review.reviewDate}</div>
                            <div className="review-user">{review.username}</div>
                        </div>
                    </div>
                    <div className='specific-ratings'>
                        <div className='enjoy-rating'>
                            <div>Enjoyment</div>
                            <div className="rating">
                                <FontAwesomeIcon className='fa-star-review one' href="#/" icon={faStar}></FontAwesomeIcon>
                                <FontAwesomeIcon className='fa-star-review two' href="#/" icon={faStar}></FontAwesomeIcon>
                                <FontAwesomeIcon className='fa-star-review three' href="#/" icon={faStar}></FontAwesomeIcon>
                                <FontAwesomeIcon className='fa-star-review four' href="#/" icon={faStar}></FontAwesomeIcon>
                                <FontAwesomeIcon className='fa-star-review five' href="#/" icon={faStar}></FontAwesomeIcon>
                            </div>
                        </div>
                        <div className='useful-rating'>
                            <div>Usefulness</div>
                            <div className="rating">
                                <FontAwesomeIcon className='fa-star-review one' href="#/" icon={faStar}></FontAwesomeIcon>
                                <FontAwesomeIcon className='fa-star-review two' href="#/" icon={faStar}></FontAwesomeIcon>
                                <FontAwesomeIcon className='fa-star-review three' href="#/" icon={faStar}></FontAwesomeIcon>
                                <FontAwesomeIcon className='fa-star-review four' href="#/" icon={faStar}></FontAwesomeIcon>
                                <FontAwesomeIcon className='fa-star-review five' href="#/" icon={faStar}></FontAwesomeIcon>
                            </div>
                        </div>
                        <div className='manage-rating'>
                            <div>Manageability</div>
                            <div className="rating">
                                <FontAwesomeIcon className='fa-star-review one' href="#/" icon={faStar}></FontAwesomeIcon>
                                <FontAwesomeIcon className='fa-star-review two' href="#/" icon={faStar}></FontAwesomeIcon>
                                <FontAwesomeIcon className='fa-star-review three' href="#/" icon={faStar}></FontAwesomeIcon>
                                <FontAwesomeIcon className='fa-star-review four' href="#/" icon={faStar}></FontAwesomeIcon>
                                <FontAwesomeIcon className='fa-star-review five' href="#/" icon={faStar}></FontAwesomeIcon>
                            </div>
                        </div>
                    </div>
                    <div className="comment">
                        <p>{review.reviewText}</p>
                    </div>
                </div>
            </div>
        )
    }
}

{/* <div className="review-box">
<div className="title">
    <strong>Hard course, but managable with a good group</strong>
</div>
<div className="box-top">
    <div className='overall-rating'>
        <span>Overall: </span>
        <div className="rating">
            <FontAwesomeIcon className='fa-star-review one' href="#/" icon={faStar}></FontAwesomeIcon>
            <FontAwesomeIcon className='fa-star-review two' href="#/" icon={faStar}></FontAwesomeIcon>
            <FontAwesomeIcon className='fa-star-review three' href="#/" icon={faStar}></FontAwesomeIcon>
            <FontAwesomeIcon className='fa-star-review four' href="#/" icon={faStar}></FontAwesomeIcon>
            <FontAwesomeIcon className='fa-star-review five' href="#/" icon={faStar}></FontAwesomeIcon>
        </div>
        <div>Term taken: 22T2</div>
    </div>
    <div className="user-data">
        <div className="review-date">10/12/2022</div>
        <div className="review-user">Anonymous</div>
    </div>
</div>
<div className='specific-ratings'>
    <div className='enjoy-rating'>
        <div>Enjoyment</div>
        <div className="rating">
            <FontAwesomeIcon className='fa-star-review one' href="#/" icon={faStar}></FontAwesomeIcon>
            <FontAwesomeIcon className='fa-star-review two' href="#/" icon={faStar}></FontAwesomeIcon>
            <FontAwesomeIcon className='fa-star-review three' href="#/" icon={faStar}></FontAwesomeIcon>
            <FontAwesomeIcon className='fa-star-review four' href="#/" icon={faStar}></FontAwesomeIcon>
            <FontAwesomeIcon className='fa-star-review five' href="#/" icon={faStar}></FontAwesomeIcon>
        </div>
    </div>
    <div className='useful-rating'>
        <div>Usefulness</div>
        <div className="rating">
            <FontAwesomeIcon className='fa-star-review one' href="#/" icon={faStar}></FontAwesomeIcon>
            <FontAwesomeIcon className='fa-star-review two' href="#/" icon={faStar}></FontAwesomeIcon>
            <FontAwesomeIcon className='fa-star-review three' href="#/" icon={faStar}></FontAwesomeIcon>
            <FontAwesomeIcon className='fa-star-review four' href="#/" icon={faStar}></FontAwesomeIcon>
            <FontAwesomeIcon className='fa-star-review five' href="#/" icon={faStar}></FontAwesomeIcon>
        </div>
    </div>
    <div className='manage-rating'>
        <div>Manageability</div>
        <div className="rating">
            <FontAwesomeIcon className='fa-star-review one' href="#/" icon={faStar}></FontAwesomeIcon>
            <FontAwesomeIcon className='fa-star-review two' href="#/" icon={faStar}></FontAwesomeIcon>
            <FontAwesomeIcon className='fa-star-review three' href="#/" icon={faStar}></FontAwesomeIcon>
            <FontAwesomeIcon className='fa-star-review four' href="#/" icon={faStar}></FontAwesomeIcon>
            <FontAwesomeIcon className='fa-star-review five' href="#/" icon={faStar}></FontAwesomeIcon>
        </div>
    </div>
</div>
<div className="comment">
    <p>I had a great premade group (same people I did 1531 with), and although the course was definitely
        intense, it was also very rewarding to see us progress through and look back on our work at the end.

        Be prepared for a lot of work. I did it with 2 other courses and was *ok*, wouldn't recommend taking
        anything else that's too heavy with it though.

        Most students should probably underload to 2 subjects OR do a gen ed or something so you don't go
        too crazy.</p>
</div>
</div> */}