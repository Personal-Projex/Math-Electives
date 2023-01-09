import React from 'react'

const RegisterContent = props => {
    return (
        <>
            <div className="register-form">
                <form>
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
                                <input type="text" placeholder='Password' className="form-text"/>
                            </div>
                            
                            <input type="submit" value = "Register"/>
                        </form>
                    </div>
        </>
    )
}
export default RegisterContent;

