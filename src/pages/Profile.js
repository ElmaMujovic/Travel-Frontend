import axios from "axios";
import React, { useEffect, useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import Card from "../components/UI/Card";
import { useMainContext } from '../context/main-context';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
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

            const response = await axios.get(`http://edinak1-001-site1.ftempurl.com/api/User/favourites/${user.user.id}`)
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

       <div className="page profile-page">
        <div className="user-info">
            <div className="user-image">
                {user && <img src={`https://localhost:7016/images/` + user.user.imagePath } alt="" />}
                <Link to={'/update-profile'}><p>Edit profile</p></Link><br /><br /><br /><br />
                <button onClick={submit}>Delete my account</button>
            </div>
            <div className="user-details">
            {!user?<p></p>:<h2 style={{textAlign:"center", paddingBottom:"3rem"}}>Your account</h2>}
            {!user?<p></p>:<p>First name: {user.user.ime}</p>}
            {!user?<p></p>:<p>Last name: {user.user.prezime} </p>}
            {!user?<p></p>:<p>Email: {user.user.email} </p>}
            {!user?<p></p>:<p>City: {user.user.grad}</p>}
            {!user?<p></p>:<p>Phone number: {user.user.godina}</p>}
            {/* <button onClick={handleSubmit}>Delete my profile</button> */}
            </div>
        </div>
        <h1 style={{textAlign:"center"}}>My Favorites Cars</h1>
        <div style={{display:"flex", justifyContent:"center"}}>
            
           {favCars.map((car, index) =>
           {
                return(
                    <div className="removeFavCar" key={car.car.id}>
                    <Card id={car.car.id} image={car.car.path} name={car.car.name} price={car.car.price} key={car.id} className="favCards"/>
                    </div>
                )
           })}
        </div>
       </div>
     );
}
 
export default Profile;