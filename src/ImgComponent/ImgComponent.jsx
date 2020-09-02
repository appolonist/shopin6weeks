import React from "react";
import "./style.css";

export const ImgComponent = props => {
    
    return ( 
        <img src={props.src} alt={props.alt} />
         )
};