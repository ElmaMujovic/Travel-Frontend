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
        //user && user.role === "A" ?
    }

    return (
        <div className='navigation'>
            <ul>
                <Link to='/'>Home</Link>
                <Link to='/about'>About</Link>
                {!user && <Link to='/login'>Login</Link>}
                {user && <button onClick={logoutHandler} style={{textDecoration:"none", border:"none", backgroundColor:"rgb(199, 209, 245)", color:"white", marginTop:"10px", fontSize:"15px", marginRight:"6px"}}>Logout</button>}
                <Link to='/fleet'>Fleet</Link>
                <Link to='/contact'>Contact</Link>
                {user && user.role === 'Admin'? <Link to="/create-car">Create car</Link>:""}
                {user &&  <Link to='/profile'>My Profile</Link>}
                <li className='second-part'><b>Car2Go</b></li>

            </ul>
           
        </div>
    )
}

export default Navigation