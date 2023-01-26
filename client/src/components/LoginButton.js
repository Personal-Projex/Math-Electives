import React, { useState, useEffect } from 'react';
import Login from './Login';
import LoginContent from './LoginContent';
import sessionStorage from 'sessionstorage';


const LoginButton = props => {

    const sessionLogin = sessionStorage.getItem('login');
    const [isOpen, setIsOpen] = useState(false);
    const [login, setLogin] = useState('Login');

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        setLogin(login => sessionLogin);
    }, [sessionLogin]);

    const toggleLogin = (loginBool) => {
        if (login === 'Logout') {
            setLogin(login => sessionStorage.getItem('login'));
            sessionStorage.setItem('login', 'Login');
        } else {
            setLogin(login => 'Logout');
            sessionStorage.setItem('login', 'Logout');
        }
    }

    return (
        <div>
            <button className="register-button" onClick={togglePopup}>{login}</button>
            {isOpen && <Login
                handleClose = {togglePopup}

                content={<div>
                    <LoginContent handleUsername = {props.handleUsername} handleLogin = {toggleLogin}/>
                </div>}/>}
        </div>
    )
}

export default LoginButton;
