import React from 'react'

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>


export default function Register() {
  return (
    <div>
        <button className="link">Register</button>
        <div className="register-form">
            <form action="">
                <label>First Name</label>
                <div>
                    <input type="text" placeholder='First Name' className="form-text"/>
                </div>
                
                <label>Last Name</label>
                <div>
                    <input type="text" placeholder='Last Name'className="form-text"/>
                </div>

                <label>Username</label>
                <div>
                    <input type="text" placeholder='Username' className="form-text"/>
                </div>

                <label>Password</label>
                <div>
                    <input type="password" placeholder='Password' className="form-text"/>
                </div>

                <div>
                    <input type="submit" value = "Register"/>
                </div>
            </form>
        </div>
        
    </div>
  )
}
