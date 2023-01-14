import React, { useState } from 'react';
import Register from './Register';
import RegisterContent from './RegisterContent';

export default function RegisterButton() {

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
                    <RegisterContent/>
                </div>}
            />}
        </div>
    )
}