import React, { useState, useEffect } from 'react';
import './review.css';
import Stars from './generateStars';
//import ErrorPage from './ErrorPage';
import { Redirect, Link, NavLink, Navigate, useNavigate } from "react-router-dom";

export default function AboutInfo(props) {

    const [display, setDisplay] = useState();

    useEffect(() => {
        const fetchNumReviews = async (code) => {
            try {
                const result = await fetch("http://127.0.0.1:8000/getCourseInfo?courseCode=" + code, {
                    method: 'GET',
                    redirect: 'follow'
                });
                
                const course = await result.json();
                const numReviews = course.reviews.length;
                const courseInfo = course.courseObj;

                const displayComp = (
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
                            <span className='num-reviews'>{numReviews} Reviews</span>
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

                if (course.message === 'Course not found') {
                    console.log("COURSE NOT FOUND");
                    //setDisplay(<ErrorPage/>);
                    <Navigate to="/404-page" />
                } else {
                    console.log("COURSE FOUND");
                    setDisplay(displayComp);
                }

            } catch (err) {
                console.log(err);
            }
        }
        fetchNumReviews(props.code)
    }, [props.code]);

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