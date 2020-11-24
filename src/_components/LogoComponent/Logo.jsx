import React from 'react';
import style from './style.css';


function Logo() {
    return (
        <nav data-test="logoComponent">
            <a data-test="logoLink" className="logo-nav" href="/">Appolonist</a>
        </nav>
    )
}

export { Logo };