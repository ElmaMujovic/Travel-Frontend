



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../components/UI/destinacijadetalji.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSwimmer, faWifi, faTv, faCar, faBus, faStar } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const DestinacijaDetalji = () => {
    const { destinacijaId } = useParams();
    const [destinacija, setDestinacija] = useState(null);
    const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
    console.log('Korisnik iz lokalnog skladišta:', userFromLocalStorage);
    const [rezervacijaStatus, setRezervacijaStatus] = useState('');
    const [dani, setDani] = useState('');
    const [noci, setNoci] = useState('');
    const [soba, setSoba] = useState('');
    const [napomena, setNapomena] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [brojOsoba, setBrojOsoba] = useState('');
    const [selectedHotelId, setSelectedHotelId] = useState('');
    const [hoteli, setHoteli] = useState([]);

    useEffect(() => {
        if (destinacijaId) {
            axios.get(`https://localhost:7016/api/List/destination/${destinacijaId}`)
                .then((res) => {
                    setDestinacija(res.data);
                })
                .catch(err => console.error('Greška prilikom učitavanja detalja destinacije:', err));
        }
        
        axios.get('https://localhost:7016/api/Hotel') // Preuzmi listu hotela
            .then(response => {
                setHoteli(response.data);
            })
            .catch(error => console.error('Greška prilikom učitavanja hotela:', error));
    }, [destinacijaId]);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleRezervacija = () => {
        if (!userFromLocalStorage) {
            setRezervacijaStatus('Morate biti prijavljeni da biste izvršili rezervaciju.');
            return;
        }

        const rezervacijaData = {
            korisnikId: userFromLocalStorage.user.id,
            listId: destinacija.id,
            datumRezervacije: new Date(),
            brojOsoba,
            dani,
            noci,
            soba,
            napomena,
            hotelId: selectedHotelId,
        };
        console.log('Rezervacija Data:', rezervacijaData);

        axios.post('https://localhost:7016/api/Rezervacija', rezervacijaData)
        .then(() => {
            setRezervacijaStatus('Uspešno ste izvršili rezervaciju.');
            closeModal(); // Zatvaranje modala nakon uspešne rezervacije
        })
        .catch(err => {
            console.error('Greška prilikom rezervacije:', err);
            if (err.response && err.response.data && err.response.data.message) {
                setRezervacijaStatus(err.response.data.message); // Prikazivanje specifične greške
            } else {
                setRezervacijaStatus('Došlo je do greške prilikom rezervacije.');
            }
        });
    };
    if (!destinacija) return <p>Učitavanje...</p>;

    return (
        <div className="destinacija-detalji">
            <h2 className="destinacija-titler">{destinacija.naziv}</h2>
            <div className="destinacija-image-wrapper">
                <img
                    src={destinacija.slika.startsWith('/images/') ? `https://localhost:7016${destinacija.slika}` : `https://localhost:7016/images/${destinacija.slika}`}
                    alt={destinacija.naziv}
                    className="destinacija-image"
                />
                <div className="destinacija-icons">
                    {destinacija.imaBazen && <div className="icon-container"><FontAwesomeIcon icon={faSwimmer} /><div className="tooltip">Bazen</div></div>}
                    {destinacija.imaWiFi && <div className="icon-container"><FontAwesomeIcon icon={faWifi} /><div className="tooltip">WiFi</div></div>}
                    {destinacija.imaTV && <div className="icon-container"><FontAwesomeIcon icon={faTv} /><div className="tooltip">TV</div></div>}
                    {destinacija.imaParking && <div className="icon-container"><FontAwesomeIcon icon={faCar} /><div className="tooltip">Parking</div></div>}
                    {destinacija.imaPrevoz && <div className="icon-container"><FontAwesomeIcon icon={faBus} /><div className="tooltip">Prevoz</div></div>}
                    <div className="icon-container">
                        <FontAwesomeIcon icon={faStar} />
                        <div className="tooltip">{destinacija.brojZvezdica} zvezdice</div>
                    </div>
                </div>
                <div className="price-info">
                    <div className="old-price">{destinacija.staraCena} €</div>
                    <div className="price">{destinacija.novaCena} €</div>
                </div>
                {/* <button onClick={openModal} className="rezervacija-button">
                Rezerviši
            </button> */}
            {rezervacijaStatus && <p className="rezervacija-status">{rezervacijaStatus}</p>}

            {/* Modal */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Forma za rezervaciju"
                className="rezervacija-modal"
                overlayClassName="rezervacija-overlay"
            >
                <h2>Unesite informacije za rezervaciju</h2>
                <div className="rezervacija-form">
                <input
                        type="text"
                        placeholder="Broj osoba"
                        value={brojOsoba}
                        onChange={(e) => setBrojOsoba(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Broj dana"
                        value={dani}
                        onChange={(e) => setDani(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Broj noći"
                        value={noci}
                        onChange={(e) => setNoci(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Broj soba"
                        value={soba}
                        onChange={(e) => setSoba(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Napomenna"
                        value={napomena}
                        onChange={(e) => setNapomena(e.target.value)}
                        required
                    />
                     <select
                            value={selectedHotelId}
                            onChange={(e) => setSelectedHotelId(e.target.value)}
                            required
                        >
                            <option value="">Izaberite hotel</option>
                            {hoteli.map(hotel => (
                                <option key={hotel.id} value={hotel.id}>
                                    {hotel.naziv}
                                </option>
                            ))}
                        </select>
                    
                </div>
                <button onClick={handleRezervacija} className="rezervacija-button">
                    Potvrdi rezervaciju
                </button>
                <button onClick={closeModal} className="rezervacija-button cancel-button">
                    Otkaži
                </button>
            </Modal>
            </div>
            <div className="destinacija-opis">
                <p>{destinacija.opis}</p>
            </div>

            <button onClick={openModal} className="rezervacija-button5">
                Rezerviši
            </button>
        </div>
    );
}

export default DestinacijaDetalji;