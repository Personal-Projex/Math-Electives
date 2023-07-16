import React, { useState } from 'react';
import ScaleLoader from "react-spinners/ScaleLoader";

import CourseHeader from './course-heading';
import NavBar from './navbar';
import './home.css';

export default function Home() {
    const [loading, setLoading] = useState(true);

    const coursesRecieved = () => {
        setLoading(false);
    }

    return (
        <>
            {loading && (
                <div className="loader-container">
                    <ScaleLoader color={"orange"} loading={loading} size={45} />
                    <h1 className='loader-text'>Please wait while we compute 100 digits of Pi...</h1>
                </div>
            )}

            <div className='body-home'>
                {!loading && (
                    < NavBar />
                )}
                <section id="courses">
                    <CourseHeader loading={loading} coursesRecieved={coursesRecieved} />
                </section>
            </div >
        </>
    )
}