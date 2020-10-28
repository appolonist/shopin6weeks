import React, {useState, useEffect} from 'react';

import './style.css';

export function AdvertBanner({images=[], interval=3000}){
    const [thumbnails, setThumnails] = useState([]);
    const [previousSlideStyle, setPreviousSlideStyle] = useState("");
    const [currentSlide, setCurrentSlide] = useState(0);
    const [nextSlideStyle, setNextSlideStyle] = useState("");
    const [currentSlideStyle, setCurrentSlideStyle] = useState("");

    useEffect(()=>{
        setThumnails(images);

        setCurrentSlideStyle(images[currentSlide]);

        if(currentSlide>0){

            setPreviousSlideStyle(images[currentSlide-1]);

        }else{

            setPreviousSlideStyle(images[images.length-1]);
        }

        if(currentSlide === images.length-1){
            setNextSlideStyle(images[0]);
        }else{
            setNextSlideStyle(images[currentSlide+1]);
        } 

        const loop = setInterval(()=>{
            if(currentSlide === images.length-1){
                setCurrentSlide(0);
            }else{
                setCurrentSlide(currentSlide+1);
            }
        }, interval);
        return () => clearInterval(loop); 
    }, [images, currentSlide, interval]);

    return (

        <section className="slideshow">
            <div className="slide-holder">
                <section className="slide previous-slide">
                    <img src={previousSlideStyle} className="slide-thumbnail"/>
                </section>
                <section className="slide current-slide">
                   <a className="advertBannerLink" href="/products/discounts"> 
                        <img src={currentSlideStyle} className="slide-thumbnail"/>
                    </a>
                </section>
                <section className="slide next-slide">
                    <img src={nextSlideStyle} className="slide-thumbnail"/>
                </section>
            </div>
        </section>
    )
}
