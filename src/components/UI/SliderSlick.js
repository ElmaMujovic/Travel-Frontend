import React from "react";
import Slider from "react-slick";
import { Component } from "react";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './slider.css';

// Importuj slike koje želiš koristiti u slideru
import slika1 from './gradovi-evrope.jpg';
import slika2 from './nova-malta1-53e210.jpg';
import slika3 from './grcka.png';
import slika4 from './antalya-53f5d7.jpg';
import slika5 from './steven-wilcox-jmhagyphppu-unsplash-545c90.jpg';

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
            prevArrow: <button className="custom-prev custom-arrow">{"<"}</button>,
            nextArrow: <button className="custom-next custom-arrow">{">"}</button>,
            appendDots: dots => (
                <div style={{ position: "absolute", bottom: "10px", display: "flex", justifyContent: "center", width: "100%" }}>
                    <ul style={{ margin: "0px", padding: "0px", display: "flex" }}> {dots} </ul>
                </div>
            ),
            customPaging: i => (
                <div className="custom-dot"></div>
            )
        };

        return (
            <div className='home-page'>
                <Slider {...settings}>
                    <div className="home slick-home">
                        <img src={slika1} alt="Slika 1" />
                        <div className="text-overlay">
                            <h2>GRADOVI EVROPE</h2>
                        </div>
                    </div>
                    <div className="home slick-home">
                        <img src={slika2} alt="Slika 2" />
                        <div className="text-overlay">
                            <h2>MALTA 2024</h2>
                        </div>
                    </div>
                    <div className="home slick-home">
                        <img src={slika3} alt="Slika 3" />
                        <div className="text-overlay">
                            <h2>Grčka leto 2024</h2>
                        </div>
                    </div>
                    <div className="home slick-home">
                        <img src={slika4} alt="Slika 4" />
                        <div className="text-overlay">
                            <h2>Turska leto 2024</h2>
                        </div>
                    </div>
                    <div className="home slick-home">
                        <img src={slika5} alt="Slika 5" />
                        <div className="text-overlay">
                            <h2>Tajland</h2>
                        </div>
                    </div>
                </Slider>
            </div>
        );
    }
}
