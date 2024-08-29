import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../components/UI/Hotel.css'

const CreateHotel = () => {
    const [naziv, setNaziv] = useState('');
    const [opis, setOpis] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Validate inputs
            if (!naziv || !opis) {
                setError('Sva polja su obavezna.');
                return;
            }

            // Send POST request to create a new hotel
            await axios.post('https://localhost:7016/api/Hotel', {
                naziv,
                opis
            });
            setNaziv('');
            setOpis('');
            // Redirect to a different page after successful creation
            navigate('/hotel'); // Adjust this path based on your routing
            
        } catch (err) {
            console.error(err);
            setError('Došlo je do greške prilikom kreiranja hotela.');
        }
    };
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await axios.get('https://localhost:7016/api/Hotel');
                setHotels(response.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Došlo je do greške prilikom preuzimanja hotela.');
                setLoading(false);
            }
        };

        fetchHotels();
    }, []);

    return (
        <div>
        <div className="create-hotel">
            <h1>Kreiraj Novi Hotel</h1>
            <form onSubmit={handleSubmit}>
                {error && <div className="error">{error}</div>}
                <div className="form-group">
                    <label htmlFor="naziv">Naziv:</label>
                    <input
                        type="text"
                        id="naziv"
                        value={naziv}
                        onChange={(e) => setNaziv(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="opis">Opis:</label>
                    <textarea
                        id="opis"
                        value={opis}
                        onChange={(e) => setOpis(e.target.value)}
                    />
                </div>
                <button type="submit">Kreiraj Hotel</button>
            </form>
        </div>
         <div className="hotel-list">
         <h1>Lista Hotela</h1>
         <table>
             <thead>
                 <tr>
                     <th>ID</th>
                     <th>Naziv</th>
                     <th>Opis</th>
                 </tr>
             </thead>
             <tbody>
                 {hotels.map(hotel => (
                     <tr key={hotel.id}>
                         <td>{hotel.id}</td>
                         <td>{hotel.naziv}</td>
                         <td>{hotel.opis}</td>
                     </tr>
                 ))}
             </tbody>
         </table>
     </div>
     </div>
        
    );
};

export default CreateHotel;
