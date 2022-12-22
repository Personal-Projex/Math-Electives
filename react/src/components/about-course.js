import { React, useEffect } from 'react';
import './review.css';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function AboutInfo() {
    return (
        <div className="about-container-reviews">
            <div className="about-text-reviews">
                <p>MATH2901</p>
                <p>Higher Theory of Statistics</p>
                <p>Overview</p>
                <p>As for MATH2801 but in greater depth: This course provides an introduction to the theoretical
                    underpinning of statistics; it covers fundamental results from probability and distribution theory and
                    shows how to apply the theory to the analysis of data. </p>
                <p>Topics include:</p>
                <p> <span className="li">Random variables, univariate and bivariate distributions </span>
                    <span className="li">Transformations of random variables</span>
                    <span className="li">Convergence of random variables, the sampling distribution and the Central Limit
                        Theorem</span>
                    <span className="li">Estimation and inference including moment and likelihood estimation, interval estimation,
                        and hypothesis testing</span>
                </p>
                <p>Conditions for Enrolment</p>
                <p>Prerequisite: MATH1231 or MATH1241 or MATH1251 or DPST1014</p>
                <a href="https://www.handbook.unsw.edu.au/undergraduate/courses/2023/MATH2901/?year=2023" rel="noreferrer"
                    target="_blank"><i aria-hidden="true" className="external icon"></i>MATH2901 Handbook Page</a>
                <div className="terms-run-review">
                    <span className="term-review">
                        Term 1
                    </span>
                    <span className="term-review">
                        Term 2
                    </span>
                    <span className="term-review">
                        Term 3
                    </span>
                </div>
                <div className='total-review-stats'>
                    <div className="rating">
                        <FontAwesomeIcon className='fa-star-review one' href="#/" icon={faStar}></FontAwesomeIcon>
                        <FontAwesomeIcon className='fa-star-review two' href="#/" icon={faStar}></FontAwesomeIcon>
                        <FontAwesomeIcon className='fa-star-review three' href="#/" icon={faStar}></FontAwesomeIcon>
                        <FontAwesomeIcon className='fa-star-review four' href="#/" icon={faStar}></FontAwesomeIcon>
                        <FontAwesomeIcon className='fa-star-review five' href="#/" icon={faStar}></FontAwesomeIcon>
                    </div>
                    <span className='num-reviews'>30 Reviews</span>
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