import React from 'react';
import NavBar from './navbar';
import AboutInfo from './about-course';
import SearchReviews from './search-review';
import ReviewBox from './review-box';
import './review.css';

export default function ReviewPage() {
    return (
        <body className='body-reviews'>
            <NavBar />
            <AboutInfo />
            <SearchReviews />
            <ReviewBox />
        </body>
    )
}