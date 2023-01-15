import React from 'react'

const Login = props => {
    return (
        <>
            <div className="popup-box">
                <div className="register-wrapper">
                    <button className="btn-close" onClick={props.handleClose}>x</button>
                    {props.content}
                    
                </div>
            </div>
        </>
    )
}
export default Login;
