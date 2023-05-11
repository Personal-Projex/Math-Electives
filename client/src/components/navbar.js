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
    const loggedIn = sessionStorage.getItem('login');

    return (

        <div className="header">
            <a href="/" className="link">Math-Electives</a>
            <div className="header-right">
                {/* {loggedIn === 'Logout' && <div className='navbar-text'>Logged in as:</div>} */}
                <LoginButton handleUsername={updateUsername} />
                <div className='navbar-text'>|</div>
                {loggedIn === 'Logout' && <div className='navbar-username'>{username}</div>}
                {loggedIn !== 'Logout' && <RegisterButton handleUsername={updateUsername} />}
            </div>
        </div >
    )
}