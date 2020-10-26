import React from 'react';
import style from './style.css';
import { Logo } from '../';
import { Toggler } from '../';
import { Menu } from '../';
import { LinkBar } from '../';

function NavigationBar() {

return (
 <header>
   <nav className="navigationBar">
   <Logo />
   <Toggler />
   <Menu />
   </nav>
   <LinkBar />
 </header>
  );
}

export { NavigationBar };