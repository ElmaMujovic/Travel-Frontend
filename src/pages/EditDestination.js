import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditDestination = () => {
    const { id } = useParams(); // Uzimanje ID-a iz URL-a
    const [destination, setDestination] = useState({});
    const [image, setImage] = useState(null); // Za čuvanje izabrane slike
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://localhost:7016/api/Destinacija/${id}`)
            .then(res => setDestination(res.data))
            .catch(error => console.error('Error fetching destination:', error));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('Naziv', destination.naziv);
        formData.append('StringPath', image); // Dodajte izabranu sliku
        formData.append('Cena', destination.cena); // Dodajte cenu

        axios.put(`https://localhost:7016/api/Destinacija/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(() => navigate('/fleet')) // Navigira nazad na Fleet stranicu nakon uspešnog ažuriranja
        .catch(error => console.error('Error updating destination:', error));
    };

    return (
        <div>
            <h2>Uredi Destinaciju</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="naziv">Naziv</label>
                    <input
                        type="text"
                        id="naziv"
                        value={destination.naziv || ''}
                        onChange={(e) => setDestination({ ...destination, naziv: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor="image">Slika</label>
                    <input
                        type="file"
                        id="image"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                <div>
                    <label htmlFor="cena">Cena</label>
                    <input
                        type="number"
                        id="cena"
                        value={destination.cena || ''}
                        onChange={(e) => setDestination({ ...destination, cena: e.target.value })}
                    />
                </div>
                <button type="submit">Sačuvaj</button>
            </form>
        </div>
    );
};

export default EditDestination;
