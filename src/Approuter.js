import React from 'react'
import Home from './components/Home'
import { Routes, Route } from "react-router-dom";
import About from './components/About';
import { Signup } from './components/Signup';
import Login from './components/Login';
export default function Approuter(props) {
    const {SetAlert} = props; //destructing 
    return (
        <Routes>
            <Route path="/" element={<Home SetAlert={SetAlert}/>} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<Signup SetAlert={SetAlert}/>} />
            <Route path="/login" element={<Login SetAlert={SetAlert}/>} />
        </Routes>
    )
}
