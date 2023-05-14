import React, { useState, useEffect } from 'react';
import './review.css';
import Stars from './generateStars';
import { useNavigate } from 'react-router-dom';

export default function AboutInfo(props) {
    const Navigate = useNavigate();
    const [display, setDisplay] = useState();

    useEffect(() => {
        const fetchNumReviews = async (code) => {
            try {
                let result = await fetch("https://math-electives-server.onrender.com/getCourseInfo?courseCode=" + code, {
                    method: 'GET',
                    redirect: 'follow'
                });

                const course = await result.json();
                const numReviews = course.reviews.length;
                const courseInfo = course.courseObj;

                const displayComp = (
                    // or here since we are returning the jsx display object directly from here
                    <div className="about-text-reviews">
                        <p>{courseInfo.courseCode ? courseInfo.courseCode : ''}</p>
                        <p>{courseInfo.courseName ? courseInfo.courseName : ''}</p>
                        <p>{courseInfo.courseOverview ? 'Overview' : ''}</p>
                        <p className='overview'>{courseInfo.courseOverview ? courseInfo.courseOverview : ''}</p>
                        <p>{courseInfo.courseConditions ? 'Conditions for Enrolment' : ''}</p>
                        <p className='conditions'>{courseInfo.courseConditions ? courseInfo.courseConditions : ''}</p>
                        <a href={`https://www.handbook.unsw.edu.au/undergraduate/courses/${new Date().getFullYear()}/${courseInfo.courseCode}`} rel="noopener noreferrer"
                            target="_blank"><i aria-hidden="true" className="external icon"></i>{`${courseInfo.courseCode} Handbook Page`}</a>
                        <div className="terms-run-review">
                            {handleTerms([courseInfo.term1, courseInfo.term2, courseInfo.term3])}
                        </div>
                        <div className='total-review-stats'>
                            <Stars numStars={course.ratings.overall} />
                            <span className='num-reviews'>{numReviews} {numReviews !== 1 ? 'Reviews' : 'Review'}</span>
                        </div>
                        <div className='stats-container'>
                            <span className='lower-stats-text'>Category ratings</span>
                            <div className='category-stats'>
                                <div className='stats-category'>
                                    <span className='stats-percent'>{Math.round((course.ratings.enjoyment / 5) * 100)}%</span>
                                    <div className='stats-bar-enjoy' onLoad={document.documentElement.style.setProperty('--percentage1', `${(course.ratings.enjoyment / 5) * 100}%`)}></div>
                                    <span className='category-text'>Enjoyment</span>
                                </div>
                                <div className='stats-category'>
                                    <span className='stats-percent'>{Math.round((course.ratings.usefulness / 5) * 100)}%</span>
                                    <div className='stats-bar-useful' onLoad={document.documentElement.style.setProperty('--percentage2', `${(course.ratings.usefulness / 5) * 100}%`)}></div>
                                    <span className='category-text'>Usefulness</span>
                                </div>
                                <div className='stats-category'>
                                    <span className='stats-percent'>{Math.round((course.ratings.manageability / 5) * 100)}%</span>
                                    <div className='stats-bar-manage' onLoad={document.documentElement.style.setProperty('--percentage3', `${(course.ratings.manageability / 5) * 100}%`)}></div>
                                    <span className='category-text'>Manageability</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                setDisplay(displayComp);
            } catch (err) {
                console.log(err);
                Navigate('/404-page');
            }
        }
        fetchNumReviews(props.code)
    }, [props.code, Navigate]);

    const handleTerms = (arr) => {
        return (
            arr.map((term, i) => {
                return (term !== "" ? <span key={i} className="term">{term}</span> : null)
            })
        )
    }

    return (
        <div className="about-container-reviews">
            {display}
        </div >
    )
}