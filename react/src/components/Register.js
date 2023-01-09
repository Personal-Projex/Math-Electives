import React from 'react'

const Register = props => {
    return (
        <>
            <button className="register-button">Register</button>
            <div className="popup-box">
                <div className="box">
                    <button className="btn-close" onClick={props.handleClose}>x</button>
                    {props.content}
                    
                </div>
            </div>
        </>
    )
}
export default Register;


/*
export default function Register() {
  return (
    <div>
        <a href ="#divOneA" className="register-button">Register</a>
            <div className="popup">
                <div className="register-form">
                    <form>
                        <label>First Name</label>
                        <input type="text" placeholder='First Name' className="form-text"/>
                        
                        <label>Last Name</label>
                        <input type="text" placeholder='Last Name'className="form-text"/>

                        <label>Username</label>
                        <input type="text" placeholder='Username' className="form-text"/>

                        <label>Password</label>
                        <input type="text" placeholder='Password' className="form-text"/>

                        <input type="submit" value = "Register"/>
                    </form>
                </div>
            </div>
    </div>
  )
}
*/


