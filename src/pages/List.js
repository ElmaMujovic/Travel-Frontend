import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../components/UI/kreirajlistu.css';

const CustomList = () => {
    const [paketi, setPaketi] = useState([]);
    const [destinacije, setDestinacije] = useState([]);
    const [selectedPaketId, setSelectedPaketId] = useState('');
    const [selectedDestinacijaId, setSelectedDestinacijaId] = useState('');
    const [naziv, setNaziv] = useState('');
    const [opis, setOpis] = useState('');
    const [staraCena, setStaraCena] = useState('');
    const [novaCena, setNovaCena] = useState('');
    const [imaBazen, setImaBazen] = useState(false);
    const [imaWiFi, setImaWiFi] = useState(false);
    const [imaTV, setImaTV] = useState(false);
    const [imaParking, setImaParking] = useState(false);
    const [imaPrevoz, setImaPrevoz] = useState(false);
    const [brojZvezdica, setBrojZvezdica] = useState(0);
    const [slika, setSlika] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        // Dobijanje paketa
        axios.get('https://localhost:7016/api/Paket')
            .then(res => {
                setPaketi(res.data);
            })
            .catch(err => console.error('Greška prilikom dobavljanja paketa:', err));
    }, []);

    useEffect(() => {
        if (selectedPaketId) {
            // Dobijanje destinacija za izabrani paket
            axios.get(`https://localhost:7016/api/DestinacijaPaketa/Paketnew/${selectedPaketId}`)
                .then(res => {
                    setDestinacije(res.data);
                })
                .catch(err => console.error('Greška prilikom dobavljanja destinacija:', err));
        }
    }, [selectedPaketId]);

    const handleCreate = () => {
        const formData = new FormData();
        formData.append('naziv', naziv);
        formData.append('opis', opis);
        formData.append('staraCena', staraCena);
        formData.append('novaCena', novaCena);
        formData.append('imaBazen', imaBazen);
        formData.append('imaWiFi', imaWiFi);
        formData.append('imaTV', imaTV);
        formData.append('imaParking', imaParking);
        formData.append('imaPrevoz', imaPrevoz);
        formData.append('brojZvezdica', brojZvezdica);
        if (slika) {
            formData.append('slika', slika);
        }
        formData.append('paketId', selectedPaketId);
        formData.append('destinacijaPaketaId', selectedDestinacijaId);

        axios.post('https://localhost:7016/api/List', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        .then(() => {
            alert('Nova lista uspešno kreirana.');
            navigate('/');
        })
        .catch(err => console.error('Greška prilikom kreiranja liste:', err));
    };

    return (
        <div className="create-list">
            <h2>Kreiraj novu destinaciju</h2>
            <div className="form-group">
                <label>Paket:</label>
                <select value={selectedPaketId} onChange={(e) => setSelectedPaketId(e.target.value)} required>
                    <option value="">Izaberi paket</option>
                    {paketi.map((paket) => (
                        <option key={paket.id} value={paket.id}>{paket.naziv}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Destinacija:</label>
                <select value={selectedDestinacijaId} onChange={(e) => setSelectedDestinacijaId(e.target.value)} required>
                    <option value="">Izaberi destinaciju</option>
                    {destinacije.map((destinacija) => (
                        <option key={destinacija.id} value={destinacija.id}>{destinacija.naziv}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Naziv:</label>
                <input type="text" value={naziv} onChange={(e) => setNaziv(e.target.value)} required />
            </div>

            <div className="form-group">
                <label>Opis:</label>
                <textarea value={opis} onChange={(e) => setOpis(e.target.value)} />
            </div>

            <div className="form-group">
                <label>Stara Cena:</label>
                <input type="text" value={staraCena} onChange={(e) => setStaraCena(e.target.value)} />
            </div>

            <div className="form-group">
                <label>Nova Cena:</label>
                <input type="text" value={novaCena} onChange={(e) => setNovaCena(e.target.value)} />
            </div>

            <div className="form-group">
                <label>Broj Zvezdica:</label>
                <input
                  type="number"
                  value={brojZvezdica || ''} // Dodajte || '' kako biste izbegli NaN
                  onChange={(e) => setBrojZvezdica(Number(e.target.value) || 0)} // Koristite Number i postavite podrazumevanu vrednost
                />
            </div>

            <div className="form-group">
                <label>Ima Bazen:</label>
                <input type="checkbox" checked={imaBazen} onChange={(e) => setImaBazen(e.target.checked)} />
            </div>

            <div className="form-group">
                <label>Ima WiFi:</label>
                <input type="checkbox" checked={imaWiFi} onChange={(e) => setImaWiFi(e.target.checked)} />
            </div>

            <div className="form-group">
                <label>Ima TV:</label>
                <input type="checkbox" checked={imaTV} onChange={(e) => setImaTV(e.target.checked)} />
            </div>

            <div className="form-group">
                <label>Ima Parking:</label>
                <input type="checkbox" checked={imaParking} onChange={(e) => setImaParking(e.target.checked)} />
            </div>

            <div className="form-group">
                <label>Ima Prevoz:</label>
                <input type="checkbox" checked={imaPrevoz} onChange={(e) => setImaPrevoz(e.target.checked)} />
            </div>

            <div className="form-group">
                <label>Slika:</label>
                <input type="file" onChange={(e) => setSlika(e.target.files[0])} />
            </div>

            <div className="form-group">
                <button onClick={handleCreate}>Kreiraj Listu</button>
            </div>
        </div>
    );
}

export default CustomList;

