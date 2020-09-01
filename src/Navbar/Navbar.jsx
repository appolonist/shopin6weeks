import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './style.css';
import App from "../App";


export const Navbar = () => {
    
       return ( 

           <nav>
            <Router>
                <Link to="/">Home</Link>
                <Route path="/" component={App} />
            </Router>
            </nav>
        
       )
};