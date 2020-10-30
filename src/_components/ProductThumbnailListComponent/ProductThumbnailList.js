import React from 'react';
import style from './style.css';
import { ProductThumbnail } from './';
export function ProductThumbnailList() {
    const arr =["../../static/img/products/dressess/dress0.jpg",
                "../../static/img/products/women/jumpers/jumper0.jpg",
                "../../static/img/products/women/t-shirts/t-shirt0.jpg",
                "../../static/img/products/women/hoodies/hoodie0.jpg"]
    return (
        <React.Suspense>
            {arr.map((arrUrl, index)=><ProductThumbnail key={index} imgUrl={arrUrl}/>)}
        </React.Suspense>
        
    
    )
}