import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import '../components/UI/EditPackage.css';


const EditDestinationList = () => {
  const { destinationId } = useParams();
  const [destination, setDestination] = useState({
    naziv: "",
    opis: "",
    slika: "",
  });
  const [newImage, setNewImage] = useState(null); // Dodaj state za novu sliku
  const navigate = useNavigate();

  useEffect(() => {
    if (destinationId) {
      axios.get(`https://localhost:7016/api/DestinacijaPaketa/${destinationId}`)
        .then(res => setDestination(res.data))
        .catch(err => console.error("Greska prilikom ucitavanja destinacije:", err));
    }
  }, [destinationId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDestination(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]); // Setuj novu sliku
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("naziv", destination.naziv);
    formData.append("opis", destination.opis);

    if (newImage) {
      formData.append("slika", newImage); // Dodaj novu sliku u formData
    }

    axios.put(`https://localhost:7016/api/DestinacijaPaketa/${destinationId}`, formData)
      .then(() => {
        alert("Destinacija je uspešno izmenjena.");
        navigate(`/destinacije-paketa/${destination.paketId}`); // Navigacija nazad na listu destinacija
      })
      .catch(err => console.error("Greška prilikom izmena destinacije:", err));
  };

  return (
    <div className="edit-package"> {/* Promeni klasu u edit-package */}
      <h2>Uredi Destinaciju</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group"> {/* Dodaj klasu form-group */}
          <label htmlFor="naziv">Naziv:</label>
          <input
            type="text"
            id="naziv"
            name="naziv"
            value={destination.naziv}
            onChange={handleChange}
          />
        </div>
        <div className="form-group"> {/* Dodaj klasu form-group */}
          <label htmlFor="opis">Opis:</label>
          <textarea
            id="opis"
            name="opis"
            value={destination.opis}
            onChange={handleChange}
          />
        </div>
        <div className="form-group"> {/* Dodaj klasu form-group */}
          <label htmlFor="slika">Izaberite novu sliku (opciono):</label>
          <input
            type="file"
            id="slika"
            onChange={handleImageChange}
          />
        </div>
        <div className="form-group"> {/* Dodaj klasu form-group */}
          <button type="submit">Sačuvaj izmene</button>
        </div>
      </form>
    </div>
  );
};

export default EditDestinationList;
