import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login(props) {

    const navigation = useNavigate();
    const host = "http://localhost:5000/api/auth";
    const [cred, setcred] = useState({email: "", password: ""});
    const {SetAlert} = props; 

    const onValChange = (e)=>{
        setcred({...cred, [e.target.name]: e.target.value});
    }

    const LoginHandle = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: cred.email, password: cred.password}) 
        })
        const auth = await response.json();
        console.log(auth);
        if (auth.success) {
            //redirect to home page
            localStorage.setItem('token', auth.authToken);
            SetAlert("Loggedin Successfully", "success");
            navigation("/");

        }
        else {
            SetAlert(auth.error, "danger");
        }

    }
    return (
        <div>
            <form onSubmit={LoginHandle}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' id="email" aria-describedby="emailHelp" onChange={onValChange}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' id="password" onChange={onValChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}
