import React, { useState } from 'react'

const RegisterContent = props => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState(false);
    const [retVal, setRetVal] = useState('');

    async function submitHandler(e) {
        e.preventDefault();

        const user = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password,
        }

        let response = await fetch('https://math-electives-server.onrender.com/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        const returnData = await response.json();
        console.log(returnData);


        setAlert(alert => true);
        let added = false;
        if (returnData.message == null) {
            setRetVal(retVal => 'Registered. Please log in');
            added = true;
            document.documentElement.style.setProperty('--timerBarColour', 'lime');
            // props.handleUsername(username);
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
                    <div className="alert-box">
                        <p className="alert">{retVal}</p>
                    </div>
                </div>
            }

            <div className="register-content">
                <div className="register-container">
                    <form action="" onSubmit={submitHandler}>
                        <label>First Name</label>
                        <div>
                            <input type="text" placeholder='First Name' onChange={e => setFirstName(e.target.value)} />
                        </div>

                        <label>Last Name</label>
                        <div>
                            <input type="text" placeholder='Last Name' onChange={e => setLastName(e.target.value)} />
                        </div>

                        <label>Username</label>
                        <div>
                            <input type="text" placeholder='Username' onChange={e => setUsername(e.target.value)} />
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
export default RegisterContent;