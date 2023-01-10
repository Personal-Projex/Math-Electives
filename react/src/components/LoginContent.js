import React, {useState} from 'react'

const LoginContent = props => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function submitHandler(e) {
        e.preventDefault();

        const user = {
            username: username,
            password: password,
        }

        const response = await fetch('http://127.0.0.1:8000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        const returnData = await response.json();
        console.log(returnData);

    } 

    return (
        <div className="register-form">
            <form action="" onSubmit={submitHandler}>
                <label>Username</label>
                <div>
                    <input type="text" placeholder='Username' className="form-text"  onChange={e=>setUsername(e.target.value)}/>
                </div>
                            
                <label>Password</label>
                <div>
                    <input type="password" placeholder='Password' className="form-text"  onChange={e=>setPassword(e.target.value)}/>
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}
export default LoginContent;

