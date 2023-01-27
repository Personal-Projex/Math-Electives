import React, { useState, useEffect } from 'react';
import Login from './Login';
import LoginContent from './LoginContent';
import sessionStorage from 'sessionstorage';


const LoginButton = props => {

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
            const response = await fetch('http://127.0.0.1:8000/logout', {
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
            setTimeout(() => {
                setAlert(alert => false);
                window.location.reload(false);
            }, 2000);
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
                <div>
                    <div className="timer-bar"></div>
                    <div class="alert-box">
                        <p class="alert">Successfully Logged out</p>
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