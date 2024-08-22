import axios from "axios";
import React, { useEffect, useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import Card from "../components/UI/Card";
import { useMainContext } from '../context/main-context';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../components/UI/profile.css';
const Profile = () => {
    const{user, onSetUserHandler} = useMainContext();
   const[favCars, setFavCars] = useState([]);
   const navigate = useNavigate();
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
   
  
   useEffect(()=>
   {

    const getFavoriteCars = async() =>
    {
        try{
            if(user !== null){

            const response = await axios.get(`https://localhost:7016/KorisnikDestinacija/user/destinacije/${user.user.id}`)
            setFavCars(response.data);}
            
             
        }catch(e)
        {
            console.log(e)
        }
    }


    getFavoriteCars();
    
   },[user])
   
   
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
                        <Card 
                            id={car.id} 
                            imagePath={`${car.imagePath}`} 
                            naziv={car.naziv} 
                            cena={car.cena} 
                        />
                    </div>
                ))
            )}
        </div>
    </div>
);
}

export default Profile;