import React from 'react';
import { Link } from "react-router-dom";
import data from '../courses.json';

export default function Courses(props) {
    const handleTerms = (arr) => {
        return (
            arr.map((term) => {
                return (term !== "" ? <span className="term">{term}</span> : null)
            })
        )
    }

    const courses = data.filter((course) => course.code.toLowerCase().includes(props.search.toLowerCase()) || course.name.toLowerCase().includes(props.search.toLowerCase()) || course.term1.toLowerCase().includes(props.search.toLowerCase()) || course.term2.toLowerCase().includes(props.search.toLowerCase()) || course.term3.toLowerCase().includes(props.search.toLowerCase())).map((course, pos) => {
        return (
            <div className="course-box" key={pos}>
                <Link to={"/review/" + course.code} className='link'>
                    <div className="box-top">
                        <div className="profile">
                            <div className="profile-img">
                                <img alt="" src="images/sigma_logo_1.png" />
                            </div>
                            <div className="course">
                                <strong>{course.code}</strong>
                                <span>{course.name}</span>
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
                        {handleTerms([course.term1, course.term2, course.term3])}
                    </div>
                </Link >
            </div >)
    })
    return (
        <div className="course-box-container">
            {courses}
        </div>
    )
}