import React, { useEffect, useState } from 'react';
import './review.css';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import courses from '../courseInfo.json';

export default function AboutInfo(props) {

    const [numReviews, setNumReviews] = useState(0);

    useEffect(() => {
        const fetchNumReviews = async (code) => {
            try {
                const result = await fetch("http://127.0.0.1:8000/getReviews?courseCode=" + code, {
                    method: 'GET',
                    redirect: 'follow'
                });
                const reviewArr = await result.json();
                setNumReviews(reviewArr.length);
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

    function courseDeets(code) {
        for (const course of courses) {
            if (course.code === code) {
                return course;
            }
        }
        // if could not find the course then should create 404 page here:
        return {
            code: null,
            name: null,
            overview: null,
            conditions: null,
            term1: null,
            term2: null,
            term3: null,
        }
    }

    const course = courseDeets(props.code);
    return (
        <div className="about-container-reviews" key={parseInt(props.code)}>
            <div className="about-text-reviews">
                <p>{course.code !== null ? course.code : ''}</p>
                <p>{course.name !== null ? course.name : ''}</p>
                <p>{course.overview !== null ? 'Overview' : ''}</p>
                <p className='overview'>{course.overview !== null ? course.overview : ''}</p>
                <p>{course.conditions !== null ? 'Conditions for Enrolment' : ''}</p>
                <p className='conditions'>{course.conditions !== null ? course.conditions : ''}</p>
                <a href={`https://www.handbook.unsw.edu.au/undergraduate/courses/2023/${course.code}/?year=2023`} rel="noopener noreferrer"
                    target="_blank"><i aria-hidden="true" className="external icon"></i>{`${course.code} Handbook Page`}</a>
                <div className="terms-run-review">
                    {handleTerms([course.term1, course.term2, course.term3])}
                </div>
                <div className='total-review-stats'>
                    <div className="rating">
                        <FontAwesomeIcon className='fa-star-review one' href="#/" icon={faStar}></FontAwesomeIcon>
                        <FontAwesomeIcon className='fa-star-review two' href="#/" icon={faStar}></FontAwesomeIcon>
                        <FontAwesomeIcon className='fa-star-review three' href="#/" icon={faStar}></FontAwesomeIcon>
                        <FontAwesomeIcon className='fa-star-review four' href="#/" icon={faStar}></FontAwesomeIcon>
                        <FontAwesomeIcon className='fa-star-review five' href="#/" icon={faStar}></FontAwesomeIcon>
                    </div>
                    <span className='num-reviews'>{numReviews} Reviews</span>
                </div>
                <div className='stats-container'>
                    <span className='lower-stats-text'>Category ratings</span>
                    <div className='category-stats'>
                        <div className='stats-category'>
                            <span className='stats-percent'>30%</span>
                            <div className='stats-bar-enjoy' onLoad={
                                useEffect(() => {
                                    document.documentElement.style.setProperty('--percentage1', '30%')
                                }, [])
                            }></div>
                            <span className='category-text'>Enjoyment</span>
                        </div>
                        <div className='stats-category'>
                            <span className='stats-percent'>67%</span>
                            <div className='stats-bar-useful' onLoad={
                                useEffect(() => {
                                    document.documentElement.style.setProperty('--percentage2', '67%')
                                }, [])
                            }></div>
                            <span className='category-text'>Usefulness</span>
                        </div>
                        <div className='stats-category'>
                            <span className='stats-percent'>43%</span>
                            <div className='stats-bar-manage' onLoad={
                                useEffect(() => {
                                    document.documentElement.style.setProperty('--percentage3', '43%')
                                }, [])
                            }></div>
                            <span className='category-text'>Manageability</span>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}