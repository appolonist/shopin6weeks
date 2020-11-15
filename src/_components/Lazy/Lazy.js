import React, { useEffect, useState } from 'react';
export default function Lazy() {
    const [lazy, setLazy] = useState("component mounted hmr test ");
   
    useEffect(() => {
        const timeout = setTimeout(() => {
          setLazy("lazy");
         }, 3000);
     
        return () => clearTimeout(timeout);  },[lazy]);

    return (
    <h1>{lazy}</h1> 
    )
}