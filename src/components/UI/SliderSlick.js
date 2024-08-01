import React from "react";
import Slider from "react-slick";
import { Component } from "react";
import img from './car3.png'
import img2 from './car4.png'
import img3 from './car2.png'
export default class SimpleSlider extends Component {
  
 

    render() {
      
    
      const settings = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
       
      };

  
      
      return (
        <div className='home-page'>
          <Slider {...settings}>
            <div >
             <div className="home slick-home">
                <div className="text"><h1>Premium <br /> Car Rental <br /> in New York</h1> Don't deny yourself the pleasure of <br /> driving the best premium cars from <br /> around the world here and now</div>
                <img src={img} alt="" />
             </div>
            </div>
            <div>
            <div className="home slick-home">
                <div className="text"><h1>Reserve a Car Near You <br /> and Drive in Minutes!</h1><p>Car rent services for  <br /> various terrain with guaranteed quality</p> </div>
                <img src={img2}  style={{width:"600px"}} alt="" />
             </div>
            </div>
            <div>
            <div className="home slick-home">
            <img src={img3}  style={{width:"700px", marginLeft:"0px"}} alt="" />
            <div className="text" style={{marginRight:"3rem"}}><h1>&#10003; Deals for every budget</h1><h1>&#10003; Best price guaranteed</h1><h1>&#10003; Support 24/7</h1></div>
             </div>
            </div>
           
          </Slider>
        </div>
      );
    }
  }

