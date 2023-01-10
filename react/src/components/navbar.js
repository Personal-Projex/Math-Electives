import React from 'react';
import RegisterButton from './RegisterButton';
import LoginButton from './LoginButton';

export default function nav() {
    return (
        <div className="header">
            <a href="/" className="link">Math-Electives</a>
            <RegisterButton/>
            <LoginButton/>
        </div>
    )
}