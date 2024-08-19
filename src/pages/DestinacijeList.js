import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import '../components/UI/DestinacijePaketa.css';
import '../components/UI/DestinacijeLista.css';



///PRIKAZ PRVIH DESTINACIJJA 
const DestinacijeList = () => {
  const { paketId } = useParams();
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    if (paketId) {
      axios.get(`https://localhost:7016/api/DestinacijaPaketa/Paket/${paketId}`)
        .then((res) => {
          setDestinations(res.data);
        })
        .catch((err) => console.error("Greška prilikom učitavanja destinacija:", err));
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
      <div className="destinacije-grid">
        {destinations.length > 0 ? (
          destinations.map((destination) => (
            <div className="destinacija-card" key={destination.id}>
              <img
                src={`https://localhost:7016/images/${destination.slika}`}
                alt={destination.naziv}
                className="destinacija-image"
              />
              <h3 className="destinacija-title">{destination.naziv}</h3>
              <div className="overlay">
                <p className="destinacija-description">{destination.opis}</p>
                <Link to={`/destinacija-detalji/${destination.id}`}>
    <button className="kompletna-ponuda-button">Kompletna ponuda</button>
</Link>

              </div>
              <div className="action-buttons">
                <button onClick={() => handleDelete(destination.id)}>Obriši</button>
                <Link to={`/uredi-destinaciju-lista/${destination.id}`}>
                  <button>Uredi</button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>Nema dostupnih destinacija za ovaj paket.</p>
        )}
      </div>
    </div>
   );
};

export default DestinacijeList;
