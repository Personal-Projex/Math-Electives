import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import './review.css';

library.add(faSearch);

export default function ReviewPage() {
    return (
        <body>
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
            <p className="review-text">Reviews</p>
            <div className="search-bar">
                <div className="select" id="select">
                    <p id="selectText">All categories</p>
                    <i className="fa-solid fa-caret-down"></i>
                    <ul id="list">
                        <li className="options">All Categories</li>
                        <li className="options">Most Recent</li>
                        <li className="options">Highest Rating to Lowest</li>
                        <li className="options">Lowest Rating to Highest</li>
                    </ul>
                </div>
                <input type="text" id="inputfield" placeholder="Search Key Words" />
                <FontAwesomeIcon href="#/" icon={faSearch} size="xl"></FontAwesomeIcon>
            </div>
            <div className="review-box-container">
                <div className="review-box">
                    <div className="box-top">
                        <div className="title">
                            <strong>Hard course, but managable with a good group</strong>
                        </div>
                        <div className="review"></div>
                        <div className="rating">
                            <i className="fas fa-star one"></i>
                            <i className="fas fa-star two"></i>
                            <i className="fas fa-star three"></i>
                            <i className="fas fa-star four"></i>
                            <i className="fas fa-star five"></i>
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
                <div className="review-box">
                    <div className="box-top">
                        <div className="title">
                            <strong>Interesting but not friendly course</strong>
                        </div>
                        <div className="review"></div>
                        <div className="rating">
                            <i className="fa-regular fa-star one"></i>
                            <i className="fa-regular fa-star two"></i>
                            <i className="fas fa-star three"></i>
                            <i className="fas fa-star four"></i>
                            <i className="fas fa-star five"></i>
                        </div>
                    </div>
                    <div className="comment">
                        <p>Honestly, if you work hard each week to learn the content and engage with it through practice/effort,
                            you'll genuinely be ok for this course. Exam can be somewhat tough, but as a whole I actually really
                            enjoyed it lol</p>
                    </div>
                </div>
                <div className="review-box">
                    <div className="box-top">
                        <div className="title">
                            <strong>Challenging but Satisfying Course</strong>
                        </div>
                        <div className="review"></div>
                        <div className="rating">
                            <i className="fa-regular fa-star one"></i>
                            <i className="fas fa-star two"></i>
                            <i className="fas fa-star three"></i>
                            <i className="fas fa-star four"></i>
                            <i className="fas fa-star five"></i>
                        </div>
                    </div>
                    <div className="comment">
                        <p className="text">I took this course in 22T1 and really loved the course. It was a nice breath of fresh
                            air during the term compared to the other courses I was taking. I highly recommend that CSE students
                            take this course as an elective as any skills with databases will be useful, and the course can be a
                            nice breather compared to the increasing difficulty of other level 3+ courses.

                            Lectures: Dong Wen was the lecturer this term, and he did a really good job explaining the course
                            content and a clear and concise manner.

                            Tutorials: The tutorials are a solid 90 minutes of going over the course content and solving
                            questions as a className with the tutor.
                            <span className="dots"> ...</span>
                            <span className="extraText">
                                My tutor was really good at explaining the concepts, so I always walked out of the tutorial
                                feeling confident in what I had learned.

                                Quizzes: The 6 quizzes that were required during the term took all of 5 minutes to complete. 4
                                questions each, not too tricky, nice.

                                Assignments: The assignments actually felt fairly small and easy to work through. The first was
                                6 SQL and 4 coding questions, and the second was 4 Python questions. Extremely doable
                                assignments for students of all levels.

                                Exam: The final exam was the hardest part of the course, funnily enough. It was still a very
                                doable exam, and the 4 hour time limit was greatly appreciated to be able to attempt all of the
                                questions.
                            </span>
                        </p>
                        <button className="read-more">Read More</button>
                    </div>
                </div>
                <div className="review-box">
                    <div className="box-top">
                        <div className="title">
                            <strong>THE WORKLOAD OMG</strong>
                        </div>
                        <div className="review"></div>
                        <div className="rating">
                            <i className="fa-regular fa-star one"></i>
                            <i className="fa-regular fa-star two"></i>
                            <i className="fas fa-star three"></i>
                            <i className="fas fa-star four"></i>
                            <i className="fas fa-star five"></i>
                        </div>
                    </div>
                    <div className="comment">
                        <p>This course has far too much content in it. I really did enjoy all the work on OOP and design
                            patterns (which I've already applied to many of my own projects), and the assignment was by far the
                            coolest project I've worked on at university, but it was just so much to handle. I feel like they
                            need to cut back on the specifications for the assignment a lot, and take a few parts of the course
                            out (concurrency can be covered in other courses), and reconsider the difficulty of their final
                            exam, which was nearly impossible.

                            I think this course is a necessity for anyone that wants to do anything in an OOP paradigm, and has
                            a huge amount of potential to be one of the best courses that UNSW has to offer, but as of 21T3 it
                            was still in need of some major refactoring to fix its numerous design smells.</p>
                    </div>
                </div>
            </div>
        </body>
    )
}