import React, { useEffect, useState } from "react";
import axios from "axios";
import CarList from "../components/UI/CarList";
import SliderSlick from "../components/UI/SliderSlick";
import LittleCard from "../components/UI/LittleCard";
import PopularDestinations from "./PopularDestinations";

import wheel from './images/wheel.png';
import loc from './images/loc.png';
import mil from './images/step.png';
import CreatePackage from "./CreatePackage";

export const Home = () => {
  const [destinations, setDestinations] = useState(null);

  useEffect(() => {
    axios.get('https://localhost:7016/api/Destinacija')
      .then(res => setDestinations(res.data));
  }, []);

  return (
    <div className="home card-home">
      <SliderSlick />
     
    
    </div>
  );
}

export default Home;
