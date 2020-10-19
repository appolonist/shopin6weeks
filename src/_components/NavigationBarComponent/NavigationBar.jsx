import React from 'react';
import style from './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faShoppingBag } from '@fortawesome/free-solid-svg-icons'

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
   <nav>
     cololo
   </nav>
 </header>
);
}

export { NavigationBar };