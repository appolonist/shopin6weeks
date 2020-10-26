import React from 'react';
import style from './style.css';
import { Link } from 'react-router-dom';
import { Logo } from '../';
import { Toggler } from '../';
import { Menu } from '../';
function NavigationBar() {

return (
 <header>
   <nav className="navigationBar">
   <Logo />
   <Toggler />
   <Menu />
    {/*
   <p className="nav-women">
                <li><Link to="/products/women/dressess">Dressess</Link></li>
                <li><Link to="/products/women/hoodies">Hoodies</Link></li>
                <li><Link to="/products/women/t-shirts">T-shirts</Link></li>
                <li><Link to="/products/women/jumperscardigans">Jumpers&Cardigans</Link></li>
    </p>         
   */}
   </nav>
 </header>
);
}

export { NavigationBar };