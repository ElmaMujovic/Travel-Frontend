import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SliderSlick from "../components/UI/SliderSlick";
import CreatePackage from "./CreatePackage";

export const Home = () => {
  const [destinations, setDestinations] = useState([]);
  const [packageCreated, setPackageCreated] = useState(false);

  useEffect(() => {
    axios.get('https://localhost:7016/api/Paket')
      .then(res => setDestinations(res.data))
      .catch(err => console.error("Error fetching packages:", err));
  }, [packageCreated]);

  const handlePackageCreated = (newPackage) => {
    console.log("New package added:", newPackage);
    setPackageCreated(prev => !prev);
  };

  const handleDelete = (packageId) => {
    if (window.confirm("Da li ste sigurni da želite da obrišete ovaj paket?")) {
      axios.delete(`https://localhost:7016/api/Paket/${packageId}`)
        .then(() => {
          setDestinations(destinations.filter(destination => destination.id !== packageId));
          alert("Paket je uspešno obrisan.");
        })
        .catch(err => console.error("Error deleting package:", err));
    }
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
              <p>Tag: <Link to={`/destinacije-paketa/${destination.id}`}>{destination.tag}</Link></p>
              <img
                src={`https://localhost:7016/images/${destination.imagePath}`}
                style={{ height: "300px", width: "300px" }}
              />
              <button onClick={() => handleDelete(destination.id)}>Obriši</button>
              <Link to={`/uredi-paket/${destination.id}`}>
                <button>Uredi</button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
