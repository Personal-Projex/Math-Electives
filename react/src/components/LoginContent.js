import React from 'react'

const LoginContent = props => {

    return (
        <div className="register-form">
            <form action="">
                <label>Username</label>
                <div>
                    <input type="text" placeholder='Username' className="form-text"/>
                </div>
                            
                <label>Password</label>
                <div>
                    <input type="password" placeholder='Password' className="form-text"/>
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}
export default LoginContent;

