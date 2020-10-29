import React from 'react';
import style from './style.css';

export function ProductThumbnail(prop) {
    return(
        <img className="thumb" src={prop.imgUrl} />
    );
}