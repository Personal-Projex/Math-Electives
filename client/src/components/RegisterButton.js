import React, { useState } from 'react';
import Register from './Register';
import RegisterContent from './RegisterContent';

const RegisterButton = props => {

    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div>
            <button className="register-button" onClick={togglePopup}>Register</button>
            {isOpen && <Register
                handleClose={togglePopup}

                content={<div>
                    <RegisterContent handleUsername = {props.handleUsername}/>
                </div>}/>}
        </div>
    )
}

export default RegisterButton;