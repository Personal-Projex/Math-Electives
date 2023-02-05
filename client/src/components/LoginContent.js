import React, { useState } from 'react'

const LoginContent = props => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState(false);
    const [retVal, setRetVal] = useState('');

    async function submitHandler(e) {
        e.preventDefault();

        const user = {
            username: username,
            password: password,
        }

        const response = await fetch('https://math-electives-api.onrender.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        console.log(user.username);

        const returnData = await response.json();
        console.log(returnData);


        setAlert(alert => true);
        let added = false;
        if (returnData.message == null) {
            setRetVal(retVal => 'Logged in');
            added = true;
            document.documentElement.style.setProperty('--timerBarColour', 'lime');
            props.handleUsername(username);

            // Change Login text to Logout
            props.handleLogin(false);
        } else {
            setRetVal(retVal => returnData.message);
            document.documentElement.style.setProperty('--timerBarColour', 'red');
        }

        if (added) {
            document.documentElement.style.setProperty('--timerBarLength', '1.3s');
            setTimeout(() => {
                setAlert(alert => !alert);
                window.location.reload(false);
            }, 1300);
        } else {
            // Make the alert disappear after 2 seconds
            setTimeout(() => {
                setAlert(alert => !alert);
            }, 2000);
        }
    }

    return (
        <>
            {alert &&
                <div>
                    <div className="timer-bar"></div>
                    <div class="alert-box">
                        <p class="alert">{retVal}</p>
                    </div>
                </div>
            }

            <div className="register-content">
                <div className="register-container">
                    <form action="" onSubmit={submitHandler}>
                        <label>Username</label>
                        <div>
                            <input type="text" placeholder='Username' className="form-text" onChange={e => setUsername(e.target.value)} />
                        </div>

                        <label>Password</label>
                        <div>
                            <input type="text" placeholder='Password' className="password-text" onChange={e => setPassword(e.target.value)} />
                        </div>
                        <button type='submit'>Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}
export default LoginContent;