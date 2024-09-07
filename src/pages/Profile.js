import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import CardNew from "../components/UI/CardNew";
import { useMainContext } from '../context/main-context';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../components/UI/profile.css';

const Profile = () => {
    const { user, onSetUserHandler } = useMainContext();
    const [favCars, setFavCars] = useState([]);
    const [rezervacije, setRezervacije] = useState([]);
    const [reservedDestinations, setReservedDestinations] = useState([]);
    const navigate = useNavigate();

    // Delete Profile
    const DeleteProfile = async (e) => {
        e.preventDefault();
        try {
            if (user !== null) {
                await axios.delete('https://localhost:7016/api/User/delete-profile', 
                { data: { id: user.user.id } });
                onSetUserHandler(null);
                navigate('/');
            }
        } catch (e) {
            console.log(e);
        }
    };

    // Confirm delete profile
    const submit = (e) => {
        confirmAlert({
            title: 'Delete profile',
            message: 'Are you sure to do this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => DeleteProfile(e)
                },
                {
                    label: 'No',
                    onClick: () => console.log("canceled")
                }
            ]
        });
    };

    useEffect(() => {
        const fetchFavCars = async () => {
            try {
                if (user !== null) {
                    // Fetch favorite cars independently
                    const favCarsResponse = await axios.get(`https://localhost:7016/KorisnikDestinacija/user/destinacije/${user.user.id}`);
                    setFavCars(favCarsResponse.data);
                }
            } catch (e) {
                console.log(e);
            }
        };
    
        const fetchOtherData = async () => {
            try {
                if (user !== null) {
                    // Fetch reservations
                    const rezervacijeResponse = await axios.get(`https://localhost:7016/api/Rezervacija/ByUser/${user.user.id}`);
                    setRezervacije(rezervacijeResponse.data);
    
                    // Fetch reserved destinations
                    const reservedDestinationsResponse = await axios.get(`https://localhost:7016/api/RezervacijaDestinacije/ByUser/${user.user.id}`);
                    setReservedDestinations(reservedDestinationsResponse.data);
                }
            } catch (e) {
                console.log(e);
            }
        };
    
        // Fetch favorite cars first
        fetchFavCars().then(() => {
            // After fetching favorite cars, fetch other data
            fetchOtherData();
        });
    
    }, [user]);
    

    return (
        <div className="profile-page">
            <div className="profile-info">
                <div className="profile-image">
                    {user && <img src={`https://localhost:7016/images/` + user.user.imagePath} alt="Profilna slika" />}
                    <Link to={'/update-profile'} className="edit-profile-link">Uredi profil</Link>
                </div>
                <div className="profile-details">
                    {!user ? <p>Učitavanje...</p> : (
                        <>
                            <h2 className="profile-title">Moj profil</h2>
                            <p>Ime: {user.user.ime}</p>
                            <p>Prezime: {user.user.prezime}</p>
                            <p>E-mail: {user.user.email}</p>
                            <p>Grad: {user.user.grad}</p>
                            <p>Broj godina: {user.user.godina}</p>
                        </>
                    )}
                </div>
            </div>

            <h1 className="favorites-title">Moje omiljene destinacije</h1>
            <div className="favorites-container">
                {favCars.length === 0 ? (
                    <p>Nema omiljenih destinacija</p>
                ) : (
                    favCars.map((car) => (
                        <div className="favorite-card" key={car.id}>
                            <Link to={`/car-details/${car.id}`} className="fleet-page-card-link">
                                <CardNew
                                    id={car.id} 
                                    imagePath={`${car.imagePath}`} 
                                    naziv={car.naziv} 
                                    cena={car.cena} 
                                />
                            </Link>
                        </div>
                    ))
                )}
            </div>

            <h1 className="reservations-title">Moje rezervacije paketa</h1>
            <div className="reservations-container">
                {rezervacije.length === 0 ? (
                    <p>Nema rezervacija</p>
                ) : (
                    rezervacije.map((rezervacija) => (
                        <div className="reservation-card" key={rezervacija.id}>
                            <div className="destination-image-wrapper">
                            <Link to={'/destinacija-detalji/'+ rezervacija.list.destinacijaPaketaId} className="edity-profile-link">

                                <img
                                    src={rezervacija.list.slika.startsWith('/images/') ? `https://localhost:7016${rezervacija.list.slika}` : `https://localhost:7016/images/${rezervacija.list.slika}`}
                                    alt={rezervacija.list.naziv}
                                    className="destination-image"
                                />
                                </Link>
                                <div className="price-info">
                                    <div className="pricee">{rezervacija.list.novaCena} €</div>
                                </div>
                            </div>
                            <h2 className="destinacija-titlee">{rezervacija.list.naziv}</h2>
                            <div className="reservation-details">
                                <p><strong>Datum rezervacije:</strong> {new Date(rezervacija.datumRezervacije).toLocaleDateString()}</p>
                                <p><strong>Broj osoba:</strong> {rezervacija.brojOsoba}</p>
                                <p><strong>Dani:</strong> {rezervacija.dani}</p>
                                <p><strong>Noći:</strong> {rezervacija.noci}</p>
                                <p><strong>Soba:</strong> {rezervacija.soba}</p>
                                <p><strong>Napomena:</strong> {rezervacija.napomena}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            
            <h1 className="reserved-destinations-title">Moje rezervisane destinacije</h1>
            <div className="reserved-destinations-container">
                {reservedDestinations.length === 0 ? (
                    <p>Nema rezervisanih destinacija</p>
                ) : (
                    reservedDestinations.map((destination) => (
                        <div className="reserved-destination-card" key={destination.id}>
                            <Link to={'/car-details/'+ destination.destinacija.id} className="edit-profile-link">
                            <img
                                src={"https://localhost:7016/images/" + destination.destinacija.imagePath}
                                alt={destination.naziv}
                                className="reserved-destination-image"
                            />
                            
                </Link>
                            <div className="reserved-destination-details">
                                <h2>{destination.destinacija.naziv}</h2>
                                <h2>{destination.destinacija.cena } €</h2>

                                <p><strong>Datum rezervacije:</strong> {new Date(destination.datumPolaska).toLocaleDateString()}</p>

                                {/* <p><strong>Datum rezervacije:</strong> {new Date(destination.datumRezervacije).toLocaleDateString()}</p> */}
                                <p><strong>Broj osoba:</strong> {destination.brojOsoba}</p>
                                <p><strong>Napomena:</strong> {destination.napomena}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Profile;
