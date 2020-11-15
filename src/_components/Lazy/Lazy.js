import React, { useEffect, useState } from 'react';
export default function Lazy() {
    const [lazy, setLazy] = useState("");
   
    useEffect(() => {
        const timeout = setTimeout(() => {
          setLazy("lazy");
         }, 3000);
     
        return () => clearTimeout(timeout);  },[]);

    return (
    <h1>{lazy}</h1> 
    )
}