import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
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

  const handleDelete = (destinationId) => {
    if (window.confirm("Da li ste sigurni da želite da obrišete ovu destinaciju?")) {
      axios.delete(`https://localhost:7016/api/DestinacijaPaketa/${destinationId}`)
        .then(() => {
          setDestinations(destinations.filter(destination => destination.id !== destinationId));
          alert("Destinacija je uspešno obrisana.");
        })
        .catch(err => console.error("Greška prilikom brisanja destinacije:", err));
    }
  };

  return (
    <div className="destinacije-list">
      <h2>Destinacije za Paket {paketId}</h2>

      <ul>
        {destinations.length > 0 ? (
          destinations.map((destination) => (
            <li key={destination.id}>
              <h3>{destination.naziv}</h3>
              <p>{destination.opis}</p>
              <img
                src={`https://localhost:7016/images/${destination.slika}`}
                style={{ height: "300px", width: "300px" }}
                alt={destination.naziv}
              />
              <button onClick={() => handleDelete(destination.id)}>Obriši</button>
              <Link to={`/uredi-destinaciju-lista/${destination.id}`}>
                <button>Uredi</button>
              </Link>
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
