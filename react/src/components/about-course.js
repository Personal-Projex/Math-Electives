import React from 'react';
import './review.css';

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
                    target="_blank"><i aria-hidden="true" className="external icon"></i> MATH2901 Handbook Page</a>
            </div>
        </div>
    )
}