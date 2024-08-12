import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import '../components/UI/DestinacijePaketa.css';

const DestinacijeList = () => {
  const { paketId } = useParams();


  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    if (paketId) {
      axios.get(`https://localhost:7016/api/DestinacijaPaketa/Paket/${paketId}`)
        .then((res) => {
          setDestinations(res.data);
        })
        .catch((err) => console.error("Greska prilikom ucitavanja destinacija:", err));
    }
  }, [paketId]);
  

  return (
    <div className="destinacije-list">
      <h2>Destinacije za Paket {paketId}</h2>
  
      <ul>
        {destinations.length > 0 ? (
          destinations.map((destinations) => (
            <li key={destinations.id}>
              <h3>{destinations.naziv}</h3>
              <p>{destinations.opis}</p>
              <img
  src={`https://localhost:7016/images/${destinations.slika}`} // Možda treba da bude samo "/images/${destinations.slika}"
  style={{ height: "300px", width: "300px" }}
  required
            
              />
         
            </li>
          ))
        ) : (
          <p>Nema dostupnih destinacija za ovaj paket.</p>
        )}
      </ul>
    </div>
  );
};

export default DestinacijeList;
