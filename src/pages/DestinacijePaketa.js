import React, { useState, useEffect } from "react";
import axios from "axios";
import '../components/UI/DestinacijePaketa.css';

const DestinacijePaketa = () => {
  const [paketi, setPaketi] = useState([]);
  const [selectedPaketId, setSelectedPaketId] = useState("");
  const [nazivDestinacije, setNazivDestinacije] = useState("");
  const [opisDestinacije, setOpisDestinacije] = useState("");
  const [imagePath, setImagePath] = useState(null);

  useEffect(() => {
    // Fetch all available packages
    axios.get("https://localhost:7016/api/Paket")
      .then((res) => setPaketi(res.data))
      .catch((err) => console.error("Greska prilikom ucitavanja paketa:", err));
  }, []);

  const handlePaketChange = (e) => {
    setSelectedPaketId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("paketId", selectedPaketId);
    formData.append("naziv", nazivDestinacije);
    formData.append("opis", opisDestinacije); // Ispravljeno ovde
    formData.append("slika", imagePath);

    axios.post("https://localhost:7016/api/DestinacijaPaketa", formData)
      .then((res) => {
        alert("Destinacija je uspesno dodata!");
      })
      .catch((err) => {
        console.error("Greska prilikom dodavanja destinacije:", err);
        alert("Doslo je do greske prilikom dodavanja destinacije.");
      });
  };

  return (
    <div className="destinacije-paketa">
      <h2 className="title">Dodaj Destinaciju za Paket</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <div className="form-group">
          <label>Izaberi Paket:</label>
          <select value={selectedPaketId} onChange={handlePaketChange}>
            <option value="">Izaberi paket</option>
            {paketi.map((paket) => (
              <option key={paket.id} value={paket.id}>
                {paket.naziv}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Naziv Destinacije:</label>
          <input
            type="text"
            value={nazivDestinacije}
            onChange={(e) => setNazivDestinacije(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Opis Destinacije:</label>
          <textarea
            value={opisDestinacije}
            onChange={(e) => setOpisDestinacije(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Slika Destinacije:</label>
          <input
            type="file"
            onChange={(e) => setImagePath(e.target.files[0])}
          />
        </div>
        <button type="submit" className="submit-button">Dodaj Destinaciju</button>
      </form>
    </div>
  );
};

export default DestinacijePaketa;
