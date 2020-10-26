import React from 'react';
import style from './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
function Menu() {
    return(
        <ul className="menu">
            <li className="menuList">
                <FontAwesomeIcon icon={ faUser } />
            </li>
            <li className="menuList">
                <FontAwesomeIcon icon={ faShoppingBag } />
            </li>
      </ul>
    )
}

export { Menu }