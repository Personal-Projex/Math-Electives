import React, { useState, useEffect } from 'react';
import Stars from './generateStars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import EditReview from './edit-review';

import './review.css';

export default function ReviewBox(props) {
    const [reviews, setReviews] = useState();
    const [editPopup, setEditPopup] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);

    useEffect(() => {
        const fetchReviews = async (search, code) => {
            try {
                const result = await fetch("http://127.0.0.1:8000/getReviews?courseCode=" + code, {
                    method: 'GET',
                    redirect: 'follow'
                });
                let reviewArr = await result.json();

                let userReview = await fetch("http://127.0.0.1:8000/getReviewByUser?courseCode=" + code + "&username=" + sessionStorage.getItem('name'), {
                    method: 'GET',
                    redirect: 'follow'
                });
                userReview = await userReview.json();
                console.log(userReview);
                if (userReview) {
                    userReview = userReview._id;
                }

                if (reviewArr.length === 0) {
                    setReviews(<div className="review-box">
                        <span>Be the first to add a review!</span>
                    </div>)
                } else {
                    if (props.search === "Lowest Rating to Highest") {
                        // sort by ratings in ascending order
                        reviewArr.sort(function (a, b) {
                            return a.reviewOverall - b.reviewOverall;
                        });
                    } else if (props.search === "Highest Rating to Lowest") {
                        // sort by ratings in descending order
                        reviewArr.sort(function (a, b) {
                            return (b.reviewOverall - a.reviewOverall);
                        });
                    } else if (props.search === "Most Recent") {
                        reviewArr.reverse();
                    } else {
                        reviewArr = reviewArr.filter((review) => [review.reviewTitle.toLowerCase(), review.reviewText.toLowerCase(), review.termTaken.toLowerCase()].find((info) => info.includes(search.toLowerCase())));
                    }

                    const toggleEditPopup = () => {
                        setEditPopup(editPopup => !editPopup);
                    }

                    const toggleDeletePopup = () => {
                        setEditPopup(deletePopup => !deletePopup);
                        // make a delete req using the code and the username above which will allow the user to delete the review. 
                        // Maybe make a popup for the user to confirm if they want to delete?
                    }
                    const sortedReviews = reviewArr.map((review, pos) => {
                        return (
                            <div className="review-box" key={pos}>
                                <div className='review-header'>
                                    <div className="title">
                                        <strong>{review.reviewTitle}</strong>
                                    </div>
                                    {review._id === userReview ?
                                        <div className='alter-review'>
                                            <>
                                                <FontAwesomeIcon className='edit-review' icon={faPenToSquare} onClick={toggleEditPopup}></FontAwesomeIcon>
                                                {editPopup && <EditReview handleClose={setEditPopup} code={props.code} reviewObj={review} />}
                                            </>
                                            {/* <>
                                                <FontAwesomeIcon className='delete-review' icon={faTrash} onClick={toggleDeletePopup}></FontAwesomeIcon>
                                                {deletePopup && <DeleteReview handleClose={setDeletePopup} code={props.code} />}
                                            </> */}
                                        </div>
                                        : null}
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
                                        <div className="review-user">{review.addName ? review.username : 'Anonymous'}</div>
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
    }, [props.search, props.code, editPopup, setEditPopup])

    return (
        <div className="review-box-container">
            {reviews}
        </div>
    )
}
