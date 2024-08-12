import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import '../components/UI/EditPackage.css';



const EditPackage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [naziv, setNaziv] = useState("");
  const [stringPath, setStringPath] = useState(null);
  const [tag, setTag] = useState("");

  useEffect(() => {
    axios.get(`https://localhost:7016/api/Paket/${id}`)
      .then(res => {
        setNaziv(res.data.naziv);
        setTag(res.data.tag);
        // Proveri da li se podaci pravilno setuju
      })
      .catch(err => console.error("Error fetching package:", err));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Naziv", naziv);
    formData.append("Tag", tag);

    if (stringPath) {
      formData.append("StringPath", stringPath);
    }

    axios.put(`https://localhost:7016/api/Paket/${id}`, formData)
      .then(() => {
        alert("Paket je uspešno ažuriran.");
        navigate("/");
      })
      .catch(err => console.error("Error updating package:", err));
  };

  return (
    <div className="edit-package">
      <h2>Uredi Paket</h2>
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label>Naziv:</label>
          <input
            type="text"
            value={naziv}
            onChange={(e) => setNaziv(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Tag:</label>
          <input
            type="number"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Izaberite novu sliku (opciono):</label>
          <input
            type="file"
            onChange={(e) => setStringPath(e.target.files[0])}
          />
        </div>
        <div className="form-group">
          <button type="submit">Ažuriraj Paket</button>
        </div>
      </form>
    </div>
  );
};

export default EditPackage;
