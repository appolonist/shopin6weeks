import React from 'react';
import style from './style.css';
import { Link } from 'react-router-dom';

export function LinkBar() {
    return (
    <nav className="linkBarNav">
        <p className="linkBar">
                <li className="linkBarListItem"><Link to="/products/dressess">Dressess</Link></li>
                <li className="linkBarListItem"><Link to="/products/hoodies">Hoodies</Link></li>
                <li className="linkBarListItem"><Link to="/products/t-shirts">T-shirts</Link></li>
                <li className="linkBarListItem"><Link to="/products/jumpers">Jumpers</Link></li>
        </p>
    </nav> 
    );
}
