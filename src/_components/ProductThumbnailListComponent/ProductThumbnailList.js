import React, { Suspense, lazy} from 'react';
import style from './style.css';
import { ProductThumbnail } from "./";

const ProductThumbnailList = () => {
    const arr =["../../static/img/products/dressess/dress0.jpg",
                "../../static/img/products/women/jumpers/jumper0.jpg",
                "../../static/img/products/women/t-shirts/t-shirt0.jpg",
                "../../static/img/products/women/hoodies/hoodie0.jpg"]
    return (
       <ul>
           {arr.map((url, index)=>
           <li key={index}>
               <ProductThumbnail imgUrl={url}/>
           </li>
           )}
       </ul>
 
        
 
        
    
    )
}

export default { ProductThumbnailList };