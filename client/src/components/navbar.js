import React, { useState, useEffect } from 'react';
import RegisterButton from './RegisterButton';
import LoginButton from './LoginButton';
import sessionStorage from 'sessionstorage';

export default function Nav() {

    const sessionName = sessionStorage.getItem('name');

    function updateUsername(name) {
        setUsername(username => name);
        sessionStorage.setItem('name', name);
    }
    
    const [username, setUsername] = useState('');
    useEffect(() => {
        setUsername(sessionName);
    }, [sessionName]);

    return (

        <div className="header">
            <a href="/" className="link">Math-Electives</a>
            <RegisterButton handleUsername = {updateUsername}/>
            <LoginButton handleUsername = {updateUsername}/>
            <div className='navbar-username'>{username}</div>

        </div>
    )
}