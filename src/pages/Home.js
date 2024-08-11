import React, { useEffect, useState } from "react";
import axios from "axios";
import SliderSlick from "../components/UI/SliderSlick";
import CreatePackage from "./CreatePackage";

export const Home = () => {
  const [destinations, setDestinations] = useState([]);
  const [packageCreated, setPackageCreated] = useState(false);

  useEffect(() => {
    // Fetch existing packages from the API on component mount
    axios.get('https://localhost:7016/api/Paket')
      .then(res => setDestinations(res.data))
      .catch(err => console.error("Error fetching packages:", err));
  }, [packageCreated]);

  const handlePackageCreated = (newPackage) => {
    console.log("New package added:", newPackage); // Log the newly created package
    setPackageCreated(prev => !prev); // Trigger re-fetch
  };

  return (
    <div className="home card-home">
      <SliderSlick />

      <div style={{ marginTop: "2rem" }}>
        {/* <CreatePackage onPackageCreated={handlePackageCreated} /> */}
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h2>Travel Packages</h2>
        <ul>
          {destinations.map((destination, index) => (
            <li key={index}>
              <h3>{destination.naziv}</h3>
              <p>{destination.opis}</p>
              <p>Tag: {destination.tag}</p>
              <img
                src={`https://localhost:7016/images/${destination.imagePath}`}
                style={{height:"300px", width:"300px"}}
              
              />

            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
