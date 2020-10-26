import React from 'react';
import style from './style.css';

function Toggler() {
    return (

        <ul className="toggler" role="tablist">
         <li className="togglerList" id="womenProducts">
              <a  className="women" href="/products/women" role="tab" aria-label="Womens products">WOMEN</a>
          </li>
          <li className="togglerList" id="menProducts">
              <a className="men" href="/products/men" role="tab" aria-label="Mens products">MEN</a>
          </li>
        </ul>
    )
}

export { Toggler };