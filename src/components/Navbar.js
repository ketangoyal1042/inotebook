import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar(props) {

    let location = useLocation();
    let navigate = useNavigate();
    const {SetAlert} = props;
    const handlelogout = ()=>{
        localStorage.clear();
        SetAlert("Logged out Successfully", "success");
        navigate('/login');
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">iNotes</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token')?<form className="d-flex" >
                    <Link type="button" className="btn btn-success mx-2" to="/login">Login</Link>
                    <Link type="button" className="btn btn-danger" to="/Signup">SignUp</Link>
      </form>:<button type="button" className="btn btn-success mx-2"  onClick={handlelogout}>Logout</button>}
      
                </div>
            </div>
        </nav>
    )
}


