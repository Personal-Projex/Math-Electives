import React from 'react';
import Register from './Register';

export default function nav() {
    return (
        <div className="header">
            <a href="/" className="link">Math-Electives</a>
            <Register/>
            <button className="link">Login</button>
        </div>
    )
}