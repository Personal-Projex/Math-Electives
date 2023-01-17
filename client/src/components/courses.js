import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Stars from './generateStars';


export default function Courses(props) {
    const [display, setDisplay] = useState();
    const handleTerms = (arr) => {
        return (
            arr.map((term, i) => {
                return (term !== "" ? <span key={i} className="term">{term}</span> : null)
            })
        )
    }

    useEffect(() => {
        const fetchCourses = async (search) => {
            try {
                const result = await fetch("http://127.0.0.1:8000/getCourses", {
                    method: 'GET',
                    redirect: 'follow'
                });
                const coursesArr = await result.json();
                const courses = coursesArr.filter((course) => [course.courseObj.courseCode.toLowerCase(), course.courseObj.courseName.toLowerCase(), course.courseObj.term1.toLowerCase(), course.courseObj.term2.toLowerCase(), course.courseObj.term3.toLowerCase(), course.courseObj.major].find((info) => info.includes(search.toLowerCase()))).map((course, pos) => {
                    let ratings = course.ratings;
                    course = course.courseObj;
                    return (
                        <div className="course-box" key={pos}>
                            <Link to={"/review/" + course.courseCode} className='link'>
                                <div className="box-top">
                                    <div className="profile">
                                        <div className="profile-img">
                                            <img alt="" src="images/sigma_logo_1.png" />
                                        </div>
                                        <div className="course">
                                            <strong>{course.courseCode}</strong>
                                            <span>{course.courseName}</span>
                                        </div>
                                    </div>
                                    <Stars numStars={ratings.overall} />
                                </div>
                                <div className="terms-run">
                                    {handleTerms([course.term1, course.term2, course.term3])}
                                </div>
                            </Link >
                        </div >)
                })
                setDisplay(courses);
            } catch (e) {
                console.log(e);
            }

        }
        fetchCourses(props.search);
    }, [props.search])

    return (
        <div className="course-box-container">
            {display}
        </div>
    )
}