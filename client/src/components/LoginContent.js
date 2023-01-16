import React, {useState} from 'react'
import AlertTimerComponent from './AlertTimer';

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

        const response = await fetch('http://127.0.0.1:8000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        const returnData = await response.json();
        console.log(returnData);

        setAlert(alert => true);
        if (returnData.message == null) {
            setRetVal(retVal => 'Logged in');
        } else {
            setRetVal(retVal => returnData.message);
        }
        
        // Make the alert disappear after 1.5 seconds
        setTimeout(() => {
            setAlert(alert => false);
        }, 3000);
    } 

    const timerBar = document.getElementsByClassName('timer-bar')[0]
    setInterval(() => {
        const computedStyle = getComputedStyle(timerBar);
        const width = parseFloat(computedStyle.getPropertyValue('--width')) || 0;
        timerBar.style.setProperty('--width', width + .1)
    })


    return (
        <>
            { alert &&
            <div>
                <AlertTimerComponent/>
                <div class="alert-box-login">
                    <p class="alert">{retVal}</p>
                </div>
            </div>
            }

            <div className="register-content">
                <div className="register-container">
                    <form action="" onSubmit={submitHandler}>
                        <label>Username</label>
                        <div>
                            <input type="text" placeholder='Username' className="form-text"  onChange={e=>setUsername(e.target.value)}/>
                        </div>
                                    
                        <label>Password</label>
                        <div>
                            <input type="text" placeholder='Password' className="password-text"  onChange={e=>setPassword(e.target.value)}/>
                        </div>
                        <button type='submit'>Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}
export default LoginContent;

