import React from 'react';
import style from './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

function NavigationBar() {

return (
 <header>
   <div id="chrome-sticky-header" className="headerposition headerposition--unfixed">
    <div className="top-header-wrapper">
      <div className="top-header">
        <a className="logo-header" href="/">Appolonist</a>
      </div>
      <nav>
        <ul className="tablist" role="tablist">
         <li>
              <a id="women-products" className="women-tab" href="/products/women" role="tab" aria-label="Womens products">WOMEN</a>
          </li>
          <li>
              <a id="men-products" className="men-tab" href="/products/men" role="tab" aria-label="Mens products">MEN</a>
          </li>
        </ul>
        <ul className="user-list">
          <li className="user-list-item">
              <FontAwesomeIcon icon={ faUser } />
          </li>
          <li className="user-list-item">
              <FontAwesomeIcon icon={ faShoppingBag } />
          </li>
        </ul>
      </nav>

    </div>
   </div>
   <nav className="nav-bar">
   <p className="nav-women">
                <li><Link to="/products/women/dressess">Dressess</Link></li>
                <li><Link to="/products/women/hoodies">Hoodies</Link></li>
                <li><Link to="/products/women/t-shirts">T-shirts</Link></li>
                <li><Link to="/products/women/jumperscardigans">Jumpers&Cardigans</Link></li>
    </p>         
   </nav>
 </header>
);
}

export { NavigationBar };