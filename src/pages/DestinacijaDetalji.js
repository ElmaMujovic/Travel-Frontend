



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../components/UI/destinacijadetalji.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSwimmer, faWifi, faTv, faCar, faBus, faStar } from '@fortawesome/free-solid-svg-icons';

const DestinacijaDetalji = () => {
    const { destinacijaId } = useParams();
    const [destinacija, setDestinacija] = useState(null);

    useEffect(() => {
        if (destinacijaId) {
            axios.get(`https://localhost:7016/api/List/destination/${destinacijaId}`)
                .then((res) => {
                    setDestinacija(res.data);
                })
                .catch(err => console.error('Greška prilikom učitavanja detalja destinacije:', err));
        }
    }, [destinacijaId]);

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
            </div>
            <div className="destinacija-opis">
                <p>{destinacija.opis}</p>
            </div>
        </div>
    );
}

export default DestinacijaDetalji;