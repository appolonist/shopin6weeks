import React from 'react';
import style from './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

function NavigationBar() {

return (
 <header>
   <div id="chrome-sticky-header" class="headerposition headerposition--unfixed">
    <div class="top-header-wrapper">
      <div class="top-header">
        <a class="logo-header" href="/">Appolonist</a>
      </div>
      <nav>
        <ul class="tablist" role="tablist">
         <li>
              <a id="women-products" class="women-tab" href="/products/women" role="tab" aria-label="Womens products">WOMEN</a>
          </li>
          <li>
              <a id="men-products" class="men-tab" href="/products/men" role="tab" aria-label="Mens products">MEN</a>
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
   <nav class="nav-bar">
   <p class="nav-women">
                <span><Link to="/products/women/dressess">Dressess</Link></span>
                <span><Link to="/products/women/hoodies">Hoodies</Link></span>
                <span><Link to="/products/women/t-shirts">T-shirts</Link></span>
                <span><Link to="/products/women/jumperscardigans">Jumpers&Cardigans</Link></span>
    </p>         
   </nav>
 </header>
);
}

export { NavigationBar };