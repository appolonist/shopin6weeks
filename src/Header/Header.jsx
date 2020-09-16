import React from 'react';
import { Logo } from '../Logo';
import { Navbar } from '../Navbar';
import './style.css';

function Header() {
    
       return(
           <header>
               <Logo />
               <Navbar />
           </header>       
        )
};

export {Header};
