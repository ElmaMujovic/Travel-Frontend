import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMainContext } from '../../context/main-context'
import './Navigation.css'
import axios from 'axios'

const Navigation = () => {
    const { user, onSetUserHandler } = useMainContext();
    const navigate = useNavigate();
    const logoutHandler = () => {
        onSetUserHandler(null)
        axios.defaults.headers.common[
            "Authorization"
          ] = '';
        localStorage.removeItem("user");
        navigate('/');
        console.log("user", user)
        //user && user.role === "A" ?
    }

    return (
        <div className='navigation'>
            <ul>
                <Link to='/'>Početna</Link>
                {/* <Link to='/about'>About</Link> */}
                {user && user.role === 'User'? <Link to="/about">O nama</Link>:""}
                {!user && <Link to='/login'>Login</Link>}
                {user && <button onClick={logoutHandler} style={{textDecoration:"none", border:"none", backgroundColor:"rgb(199, 209, 245)", color:"white", marginTop:"10px", fontSize:"15px", marginRight:"6px"}}>Logout</button>}
                <Link to='/contact'>Kontakt</Link>
                {user && (user.role === 'User' || user.role === 'Moderator') ? <Link to="/fleet">Fleet</Link> : ""}

                {user && user.role === 'Moderator'? <Link to="/create-destination">Kreiraj destinaciju</Link>:""}
                {user && user.role === 'Admin'? <Link to="/create-package">Kreiraj paket</Link>:""}
                {user && user.role === 'Admin'? <Link to="/create-package-destinacija">Destinacije paketa</Link>:""}
                {user && user.role === 'Admin'? <Link to="/create-list">Kreiraj listu</Link>:""}
                <Link to="/hotel">Hotel</Link>


                {user &&  <Link to='/profile'>Moj profil</Link>}

                <li className='second-part'><b>TravelApp</b></li>
                


            </ul>
           
        </div>
    )
}

export default Navigation