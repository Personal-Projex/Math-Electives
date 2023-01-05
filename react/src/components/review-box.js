import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './review.css';

export default function ReviewBox(props) {
    // import database review data. Then sort data accordingly.
    return (
        <div className="review-box-container">
            <div className="review-box">
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
            </div>
        </div>
    )
}