import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';



export const Signup = () => {

  const host = "http://localhost:5000/api/auth";
  const navigation = useNavigate();
  const [user, setuser] = useState({ email: "", password: "", name: "" })

  const changehandle = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  }
  const SignUpHandel = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: user.email, password: user.password, name: user.name })
    })
    const auth = await response.json();
    console.log(auth);
    if (auth.success) {
      //redirect to home page after setting the token 
      localStorage.setItem('token', auth.authToken);
      navigation("/");
    }
    else {
      alert(auth.error);
    }
  }
  return (
    <div>
      <form onSubmit={SignUpHandel}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" name='email' id="email" aria-describedby="emailHelp" onChange={changehandle} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name='password' id="password" onChange={changehandle} required minLength={5} />
        </div>
        <div className="mb-3">
          <label className="form-check-label" htmlFor="name">Name</label>
          <input type="text" className="form-control" name='name' id="name" onChange={changehandle} required minLength={5} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form></div>
  )
}