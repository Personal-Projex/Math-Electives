import React, { useState, useEffect } from 'react';
import ScaleLoader from "react-spinners/ScaleLoader";

import CourseHeader from './course-heading';
import NavBar from './navbar';
import './home.css';

export default function Home() {
    const [loading, setLoading] = useState(localStorage.getItem('loadingCourses') !== 'false');

    const coursesReceived = () => {
        setLoading(false);
    };

    useEffect(() => {
        if (localStorage.getItem('loadingCourses') === null) {
            localStorage.setItem('loadingCourses', 'false');
            setLoading(true);
        }
    }, []);

    return (
        <>
            {loading && (
                <div className="loader-container">
                    <ScaleLoader color={"orange"} loading={loading} size={80} />
                    <h1 className='loader-text'>Please wait while we compute 100 digits of Pi...</h1>
                </div>
            )}

            <div className='body-home'>
                {!loading && (
                    < NavBar />
                )}
                <section id="courses">
                    <CourseHeader loading={loading} coursesRecieved={coursesReceived} />
                </section>
            </div >
        </>
    )
}