import React from 'react';
import style from './style.css';

export default function ProductThumbnailList() {
    const arr =["../../static/img/products/dressess/dress0.jpg",
                "../../static/img/products/women/jumpers/jumper0.jpg",
                "../../static/img/products/women/t-shirts/t-shirt0.jpg",
                "../../static/img/products/women/hoodies/hoodie0.jpg"]
    return (
       <ul>
           {arr.map((url, index)=>
           <li key={index}>
                <img className="thumb" src={url} />
           </li>
           )}
       </ul> 
    
    )
}
