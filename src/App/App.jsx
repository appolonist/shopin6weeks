import React from 'react';
import { Header } from '../Header';
import { ImgComponent } from '../ImgComponent';
import img from './img.png';
import './style.css';
export const App = () => {
    return (
    <>
    <Header />
    <ImgComponent  src={img} alt={'tryIT'} />
    <img src='../dist/img/clound.png' />
    </>
    )
}
