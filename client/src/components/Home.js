import React from 'react';

import CourseHeader from './course-heading';
// import Courses from './courses';
import NavBar from './Navbar';
import './home.css';

export default function Home() {
    return (
        <div className='body-home'>
            < NavBar />
            <section id="courses">
                <CourseHeader />
                {/* <Courses /> */}
            </section>
        </div >
    )
}