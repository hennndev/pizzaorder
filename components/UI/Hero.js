import React from 'react'
import Slider from 'react-slick'
import HeroItem from './HeroItem';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { heroImages } from '../../consts/consts'


const Hero = () => {
    const settings = {
        infinite: true,
        autoplay: true,
        fade: true,
        speed: 2000,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        pauseOnHover: false,
        slidesToScroll: 1,
        cssEase: "linear",
    };

    return (
        <div className="overflow-x-hidden">
            <Slider {...settings}>
                <div>
                    <HeroItem hero={heroImages[0]}/>
                </div>
                <div>
                    <HeroItem hero={heroImages[1]}/>
                </div>
                <div>
                    <HeroItem hero={heroImages[2]}/>
                </div>
            </Slider>
        </div>
    )
}

export default Hero
