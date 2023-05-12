import React, { useState, useEffect } from 'react';
import Stars from './generateStars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import EditReview from './edit-review';
import DeleteReview from './delete-review';
import { motion, AnimatePresence } from 'framer-motion';

import './review.css';

export default function ReviewBox(props) {
    const [reviews, setReviews] = useState();
    const [allReviews, setAllReviews] = useState([]);
    const [userReview, setUserReview] = useState({});
    const [editPopup, setEditPopup] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);

    const fetchReviews = async (code) => {
        try {
            let result = await fetch('https://math-electives-server.onrender.com/getReviews?courseCode=' + code, {
                method: 'GET',
                redirect: 'follow'
            });

            let reviewArr = await result.json();

            let userReview = await fetch('https://math-electives-server.onrender.com/getReviewByUser?courseCode=' + code + "&username=" + sessionStorage.getItem('name'), {
                method: 'GET',
                redirect: 'follow'
            });

            userReview = await userReview.json();

            if (userReview.userReview) {
                userReview = userReview.userReview;
                userReview = userReview._id;
            }

            setAllReviews(reviewArr);
            setUserReview(userReview);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchReviews(props.code);
    }, [props.code]);

    useEffect(() => {
        if (userReview.userReview) {
            setUserReview(userReview.userReview);
            setUserReview(userReview._id);
        }

        if (allReviews.length === 0) {
            setReviews(<div className="review-box">
                <span>Be the first to add a review!</span>
            </div>)
        } else {
            if (props.search === "Lowest Rating to Highest") {
                // sort by ratings in ascending order
                allReviews.sort(function (a, b) {
                    return a.reviewOverall - b.reviewOverall;
                });
                setReviews(allReviews);
            } else if (props.search === "Highest Rating to Lowest") {
                // sort by ratings in descending order
                allReviews.sort(function (a, b) {
                    return (b.reviewOverall - a.reviewOverall);
                });
                setReviews(allReviews);
            } else if (props.search === "Most Recent") {
                allReviews.reverse();
                setReviews(allReviews);
            } else {
                const filteredReviews = allReviews.filter((review) => [review.reviewTitle.toLowerCase(), review.reviewText.toLowerCase(), review.termTaken.toLowerCase()].find((info) => info.includes(props.search.toLowerCase())));
                setReviews(filteredReviews);
            }

            const toggleEditPopup = () => {
                setEditPopup(editPopup => !editPopup);
            }

            const toggleDeletePopup = () => {
                setDeletePopup(deletePopup => !deletePopup);
            }
            const sortedReviews = allReviews.map((review, pos) => {
                return (
                    <motion.div layout
                        animate={{ opacity: 1, scale: 1 }}
                        initial={{ opacity: 0, scale: 0 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="review-box"
                        key={pos}
                    >
                        <div className='review-header'>
                            <div className="title">
                                <strong>{review.reviewTitle}</strong>
                            </div>
                            {review._id === userReview ?
                                <div className='alter-review'>
                                    <>
                                        <FontAwesomeIcon className='edit-review' icon={faPenToSquare} onClick={toggleEditPopup}></FontAwesomeIcon>
                                        {editPopup && <EditReview handleClose={toggleEditPopup} reviewObj={review} />}
                                    </>
                                    <>
                                        <FontAwesomeIcon className='delete-review' icon={faTrash} onClick={toggleDeletePopup}></FontAwesomeIcon>
                                        {deletePopup && <DeleteReview handleClose={toggleDeletePopup} reviewObj={review} />}
                                    </>
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
                    </motion.div>
                )
            })
            setReviews(sortedReviews);
        }
    }, [props.search, allReviews, userReview, editPopup, setEditPopup, deletePopup, setDeletePopup])

    return (
        <AnimatePresence>
            <motion.div className="review-box-container">
                {reviews}
            </motion.div>
        </AnimatePresence>
    )
}
