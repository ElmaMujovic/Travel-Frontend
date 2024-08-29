import axios from "axios";
import React, { useEffect, useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import Card from "../components/UI/Card";
import { useMainContext } from '../context/main-context';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../components/UI/profile.css';
import CardNew from "../components/UI/CardNew";

import '../components/UI/destinacijadetalji.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSwimmer, faWifi, faTv, faCar, faBus, faStar } from '@fortawesome/free-solid-svg-icons';
const Profile = () => {
    const{user, onSetUserHandler} = useMainContext();
   const[favCars, setFavCars] = useState([]);
   const navigate = useNavigate();
   const [rezervacije, setRezervacije] = useState([]);

   const DeleteProfile = async(e) =>
   {
        e.preventDefault();
       try{
           if(user !== null)
           {
           await axios.delete('http://edinak1-001-site1.ftempurl.com/api/User/delete-profile', 
           { data: { id: user.user.id} }
           )
           onSetUserHandler(null);
           navigate('/');
        }

       }catch(e)
       {
               console.log(e);
       }
   }
   const getRezervacije = async () => {
    try {
        if (user !== null) {
            const response = await axios.get(`http://localhost:7016/api/Rezervacija/ByUser/${user.user.id}`);
            setRezervacije(response.data);
        }
    } catch (e) {
        console.log(e);
    }
};

   const submit = (e) => {
    confirmAlert({
      title: 'Delete a car',
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
    const getFavoriteCars = async () => {
        try {
            if (user !== null) {
                const response = await axios.get(`https://localhost:7016/KorisnikDestinacija/user/destinacije/${user.user.id}`);
                setFavCars(response.data);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const getRezervacije = async () => {
        try {
            if (user !== null) {
                const response = await axios.get(`https://localhost:7016/api/Rezervacija/ByUser/${user.user.id}`);
                console.log(response.data)
                setRezervacije(response.data);
            }
        } catch (e) {
            console.log(e);
        }
    };

    getFavoriteCars();
    getRezervacije();
}, [user]);

   
   
   console.log(favCars)
   //prrr
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
                     
                     
<Link to={`/car-details/${car.id}`} key={car.id} className="fleet-page-card-link">
                        <CardNew

                            id={car.id} 
                            imagePath={`${car.imagePath}`} 
                            // opis = {car.opis}
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
                                <img
                                    src={rezervacija.list.slika.startsWith('/images/') ? `https://localhost:7016${rezervacija.list.slika}` : `https://localhost:7016/images/${rezervacija.list.slika}`}
                                    alt={rezervacija.list.naziv}
                                    className="destination-image"
                                />
                                {/* <div className="destination-icons">
                                    {rezervacija.list.imaBazen && <div className="icon-container"><FontAwesomeIcon icon={faSwimmer} /><div className="tooltip">Bazen</div></div>}
                                    {rezervacija.list.imaWiFi && <div className="icon-container"><FontAwesomeIcon icon={faWifi} /><div className="tooltip">WiFi</div></div>}
                                    {rezervacija.list.imaTV && <div className="icon-container"><FontAwesomeIcon icon={faTv} /><div className="tooltip">TV</div></div>}
                                    {rezervacija.list.imaParking && <div className="icon-container"><FontAwesomeIcon icon={faCar} /><div className="tooltip">Parking</div></div>}
                                    {rezervacija.list.imaPrevoz && <div className="icon-container"><FontAwesomeIcon icon={faBus} /><div className="tooltip">Prevoz</div></div>} */}
                                    {/* <div className="icon-container">
                                        <FontAwesomeIcon icon={faStar} />
                                        <div className="tooltip">{rezervacija.list.brojZvezdica} zvezdice</div>
                                    </div> */}
                               
                               {/* </div> */}
                                <div className="price-info">
                                    {/* <div className="old-price">{rezervacija.list.staraCena} €</div> */}
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
    </div>

    
);
}

export default Profile;