import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useMainContext } from '../../context/main-context';
import './Navigation.css';
import axios from 'axios';

const Navigation = () => {
    const { user, onSetUserHandler } = useMainContext();
    const navigate = useNavigate();

    const logoutHandler = () => {
        onSetUserHandler(null);
        axios.defaults.headers.common["Authorization"] = '';
        localStorage.removeItem("user");
        navigate('/');
        console.log("user", user);
    }

    return (
        <div className='navigation'>
            <ul className='nav-links'>
                <Link to='/'>Početna</Link>
                {user && user.role === 'User' ? <Link to="/about">O nama</Link> : ""}
                {!user && <Link to='/login'>Login</Link>}
                {user && (user.role === 'User' || user.role === 'Moderator') ? <Link to="/fleet">Destinacije</Link> : ""}
                {user && user.role === 'Moderator' ? <Link to="/create-destination">Kreiraj destinaciju</Link> : ""}
                {user && user.role === 'Admin' ? <Link to="/create-package">Kreiraj paket</Link> : ""}
                {user && user.role === 'Admin' ? <Link to="/create-package-destinacija">Destinacije paketa</Link> : ""}
                {user && user.role === 'Admin' ? <Link to="/create-list">Kreiraj listu</Link> : ""}
                {user && user.role === 'Admin' ? <Link to="/hotel">Hotel</Link> : ""}
                {user && <Link to='/profile'>Moj profil</Link>}

                <li className='second-part'>
                    {user && 
                        <button 
                            onClick={logoutHandler} 
                            style={{ 
                                backgroundColor: 'transparent', 
                                border: 'none', 
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <FontAwesomeIcon icon={faSignOutAlt} size="lg" color="white" />
                            <b className='travelapp-text'>TravelApp</b>
                        </button>
                    }
                </li>
            </ul>
        </div>
    )
}

export default Navigation;
