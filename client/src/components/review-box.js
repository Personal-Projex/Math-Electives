import React, { useState, useEffect } from 'react';
import Stars from './generateStars';

import './review.css';

export default function ReviewBox(props) {
    const [reviews, setReviews] = useState();
    useEffect(() => {
        const fetchReviews = async (search, code) => {
            try {
                const result = await fetch("http://127.0.0.1:8000/getReviews?courseCode=" + code, {
                    method: 'GET',
                    redirect: 'follow'
                });
                const reviewArr = await result.json();

                if (reviewArr.length === 0) {
                    setReviews(<div className="review-box">
                        <span>Be the first to add a review!</span>
                    </div>)
                } else {
                    const sortedReviews = reviewArr.filter((review) => [review.reviewTitle.toLowerCase(), review.reviewText.toLowerCase(), review.termTaken.toLowerCase()].find((info) => info.includes(search.toLowerCase()))).map((review, pos) => {
                        return (
                            <div className="review-box" key={pos}>
                                <div className="title">
                                    <strong>{review.reviewTitle}</strong>
                                </div>
                                <div className="box-top">
                                    <div className='overall-rating'>
                                        <div className='overall-star-rating'>
                                            <span className='overall-text'>Overall: </span>
                                            <Stars numStars={review.reviewOverall} />
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
                                        <Stars numStars={review.reviewEnjoyment} />
                                    </div>
                                    <div className='useful-rating'>
                                        <div>Usefulness</div>
                                        <Stars numStars={review.reviewUsefulness} />
                                    </div>
                                    <div className='manage-rating'>
                                        <div>Manageability</div>
                                        <Stars numStars={review.reviewManageability} />
                                    </div>
                                </div>
                                <div className="comment">
                                    <p>{review.reviewText}</p>
                                </div>
                            </div>
                        )
                    })
                    setReviews(sortedReviews);
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchReviews(props.search, props.code);
    }, [props.search, props.code])

    return (
        <div className="review-box-container">
            {reviews}
        </div>
    )
}
