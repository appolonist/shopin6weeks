import React from 'react';
import { Header } from '../Header';
import { ImgComponent } from '../ImgComponent';
import './style.css';
import img from './img.png';
export const App = () => {
    return (
    <>
    <Header />
    <ImgComponent  src={img} alt={'tryIT'} />
    </>
    )
}
