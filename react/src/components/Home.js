import React from 'react';
import './home.css';

import CourseHeader from './course-heading';
import Courses from './courses';

export default function Home() {
    return (
        <div className="body">
            <section id="courses">
                <CourseHeader />
                <Courses />
            </section>
        </div>
    )
}