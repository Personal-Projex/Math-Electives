import React, { useState } from 'react';
import Login from './Login';
import LoginContent from './LoginContent';

export default function LoginButton() {

    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div>
            <button className="register-button" onClick={togglePopup}>Login</button>
            {isOpen && <Login
                handleClose = {togglePopup}
                content={<div>
                    <LoginContent/>
                </div>}
            />}
        </div>
    )
}