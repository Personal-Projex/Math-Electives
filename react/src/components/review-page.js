import React from 'react';
import NavBar from './navbar';
import AboutInfo from './about-course';
import SearchReviews from './search-review';
import ReviewBox from './review-box';
import './review.css';

function componentDidMount() {
    window.scrollTo(0, 0);
}

export default function ReviewPage() {
    // make sure that when the react component is loaded it will reset to the top 
    // (some issue with router-dom)
    componentDidMount();
    return (
        <div className='body-reviews'>
            <NavBar />
            <AboutInfo />
            <SearchReviews />
            <ReviewBox />
        </div>
    )
}