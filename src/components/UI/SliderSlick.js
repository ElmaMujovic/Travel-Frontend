import React from "react";
import Slider from "react-slick";
import { Component } from "react";
import video1 from './izmenadrugi.mp4';
import video2 from './izmenaprvi.mp4';
import video3 from './izmenatreci.mp4';

export default class SimpleSlider extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000, // Podešavanje brzine automatskog prelaza na 5 sekundi
        };

        return (
            <div className='home-page'>
                <Slider {...settings}>
                    <div className="home slick-home">
                        <video src={video1} autoPlay loop muted style={{ width: "100%", height: "100vh", objectFit: "cover" }} />
                    </div>
                    <div className="home slick-home">
                        <video src={video2} autoPlay loop muted style={{ width: "100%", height: "100vh", objectFit: "cover" }} />
                    </div>
                    <div className="home slick-home">
                        <video src={video3} autoPlay loop muted style={{ width: "100%", height: "100vh", objectFit: "cover" }} />
                    </div>
                </Slider>
            </div>
        );
    }
}
