import React from 'react';
import RegisterButton from './RegisterButton';

export default function nav() {
    return (
        <div className="header">
            <a href="/" className="link">Math-Electives</a>
            <RegisterButton/>
            <button className="link">Login</button>
        </div>
    )
}