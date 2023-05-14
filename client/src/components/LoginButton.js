import React, { useState, useEffect } from 'react';
import Login from './Login';
import LoginContent from './LoginContent';
import sessionStorage from 'sessionstorage';


const LoginButton = props => {
    if (!sessionStorage.getItem('login')) {
        sessionStorage.setItem('login', 'Login');
    }

    const sessionLogin = sessionStorage.getItem('login');
    const [isOpen, setIsOpen] = useState(false);
    const [login, setLogin] = useState('Login');
    const [alert, setAlert] = useState(false);

    async function togglePopup() {
        if (login === "Login") {
            setIsOpen(!isOpen);
        } else {
            // Logging the user out
            setLogin(login => sessionStorage.getItem('login'));
            sessionStorage.setItem('login', 'Login');

            // Remove the user's username from the navbar
            props.handleUsername('');

            // Invalidate the user's token
            let response = await fetch('https://math-electives-server.onrender.com/logout', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            const returnData = await response.json();
            console.log(returnData);

            document.documentElement.style.setProperty('--timerBarColour', 'lime');
            setAlert(alert => true);

            // Make the alert disappear after 2 seconds
            document.documentElement.style.setProperty('--timerBarLength', '1.3s');
            setTimeout(() => {
                setAlert(alert => !alert);
                window.location.reload(false);
            }, 1300);
        }
    }

    useEffect(() => {
        setLogin(login => sessionLogin);
    }, [sessionLogin]);

    const toggleLogin = () => {
        if (login === 'Login') {
            setLogin(login => 'Logout');
            sessionStorage.setItem('login', 'Logout');
        }
    }

    return (
        <div>
            {alert &&
                <div className="logout-popup">
                    <div className="timer-bar"></div>
                    <div className="alert-box">
                        <p className="alert">Successfully Logged out</p>
                    </div>
                </div>
            }
            <button className="register-button" onClick={togglePopup}>{login}</button>
            {isOpen && <Login
                handleClose={togglePopup}

                content={<div>
                    <LoginContent handleUsername={props.handleUsername} handleLogin={toggleLogin} />
                </div>} />}
        </div>
    )
}

export default LoginButton;