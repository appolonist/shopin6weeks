import React from 'react';
import { Logo } from '../Logo';
import { Navbar } from '../Navbar';
import './style.css';

export const Header = () => {
    
       return(
           <header>
               <Logo />
               <Navbar />
           </header>       
        )
};

