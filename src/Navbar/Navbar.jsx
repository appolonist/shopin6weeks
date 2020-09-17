import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './style.css';
import {App} from "../App"

function Navbar() {
    
       return ( 

           <nav>
            <Router>
                <Link to="/">Home</Link>
            </Router>
            </nav>
        
       )
};

export {Navbar};