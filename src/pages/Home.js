import React, { useEffect, useState } from "react";
import axios from "axios";
import CarList from "../components/UI/CarList";
import SliderSlick from "../components/UI/SliderSlick";
import LittleCard from "../components/UI/LittleCard";
import PopularDestinations from "./PopularDestinations";

import wheel from './images/wheel.png';
import loc from './images/loc.png';
import mil from './images/step.png';

export const Home = () => {
  const [destinations, setDestinations] = useState(null);

  useEffect(() => {
    axios.get('https://localhost:7016/api/Destinacija')
      .then(res => setDestinations(res.data));
  }, []);

  return (
    <div className="home card-home">
      <SliderSlick />
      {destinations && <CarList destinations={destinations} />}
      <div className="info">
        {/* <div style={{ textAlign: "center" }}>
          <h2 style={{ paddingTop: "1.5rem" }}>Why choose us</h2>
          <p>We are #1 renting high-end vehicles</p>
        </div>
        <div className="infocard">
          <LittleCard imgsrc={wheel} p1="Liability insurance to improve your security" p2="Travel with tranquility with us. We offer civil liability insurance for all our vehicles, and security options as child seat to accommodate your entire family." />
          <LittleCard imgsrc={mil} p1="Unlimited mileage on all vehicles" p2="Enjoy your trip without thinking how many kilometers you can drive, because you have unlimited mileage to have a satisfactory experience." />
          <LittleCard imgsrc={loc} p1="Pick up your car at your desired location" p2="Choose the desired location on the search form. If you can't find your desired location, please contact us for custom pricing." />
        </div> */}
      </div>
      <PopularDestinations />
    </div>
  );
}

export default Home;
