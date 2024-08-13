import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SliderSlick from "../components/UI/SliderSlick";
import '../components/UI/home.css';

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

      <div className="packages-container">
        <h2>PAKETI</h2>
        <div className="packages-grid">
          {destinations.map((destination, index) => (
            <div className="package-card" key={index}>
              <div className="image-container">
                <img
                  src={`https://localhost:7016/images/${destination.imagePath}`}
                  alt={destination.naziv}
                />
                <h3 className="package-title">{destination.naziv}</h3>
                <Link to={`/destinacije-paketa/${destination.id}`} className="package-tag">
                  {destination.tag} <span className="arrow">→</span>
                </Link>
              </div>
              <p className="package-description">{destination.opis}</p>
              <div className="package-actions">
                <button class="edit-button" onClick={() => handleDelete(destination.id)}>Obriši</button>
                <Link to={`/uredi-paket/${destination.id}`}>
                  <button class="delete-button"> Uredi</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
