import React from 'react';
import { Link } from "react-router-dom";

export default function Courses() {
    return (
        <div className="course-box-container">
            <div className="course-box">
                <div className="box-top">
                    <div className="profile">
                        <div className="profile-img">
                            <img alt="" src="images/sigma_logo_1.png" />
                        </div>
                        <div className="course">
                            <strong>MATH1131</strong>
                            <span>Mathematics 1A</span>
                        </div>
                    </div>
                    <div className="reviews">
                        <i className="fas fa-star fa-lg"></i>
                        <i className="fas fa-star fa-lg"></i>
                        <i className="fas fa-star fa-lg"></i>
                        <i className="fas fa-star fa-lg"></i>
                        <i className="far fa-star fa-lg"></i>
                    </div>
                </div>
                <div className="terms-run">
                    <span className="term">
                        Term 1
                    </span>
                    <span className="term">
                        Term 2
                    </span>
                    <span className="term">
                        Term 3
                    </span>
                </div>
            </div>

            <div className="course-box">
                <div className="box-top">
                    <div className="profile">
                        <div className="profile-img">
                            <img alt="" src="images/sigma_logo_1.png" />
                        </div>
                        <div className="course">
                            <strong>MATH1141</strong>
                            <span>Higher Mathematics 1A</span>
                        </div>
                    </div>
                    <div className="reviews">
                        <i className="fas fa-star fa-lg"></i>
                        <i className="fas fa-star fa-lg"></i>
                        <i className="fas fa-star fa-lg"></i>
                        <i className="fas fa-star fa-lg"></i>
                        <i className="far fa-star fa-lg"></i>
                    </div>
                </div>
                <div className="terms-run">
                    <span className="term">
                        Term 1
                    </span>
                    <span className="term">
                        Term 3
                    </span>
                </div>
            </div>
            <div className="course-box">
                <Link to="/MATH2901" className='link'>
                    <div className="box-top">
                        <div className="profile">
                            <div className="profile-img">
                                <img alt="" src="images/sigma_logo_1.png" />
                            </div>
                            <div className="course">
                                <strong>MATH2901</strong>
                                <span>Higher Theory of Statistics</span>
                            </div>
                        </div>
                        <div className="reviews">
                            <i className="fas fa-star fa-lg"></i>
                            <i className="fas fa-star fa-lg"></i>
                            <i className="fas fa-star fa-lg"></i>
                            <i className="fas fa-star fa-lg"></i>
                            <i className="far fa-star fa-lg"></i>
                        </div>
                    </div>
                    <div className="terms-run">
                        <span className="term">
                            Term 2
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    )
}