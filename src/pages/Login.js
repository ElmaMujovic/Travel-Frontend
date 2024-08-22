import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { useMainContext } from '../context/main-context'
import { Link, useNavigate } from 'react-router-dom'
import img from './images/LoginImg.svg';
import jwt_decode from "jwt-decode";
import showPwdImg from './images/show-password.svg';
import hidePwdImg from './images/hide-password.svg';
import '../components/UI/Login.css';
/* eslint-disable */
/*global google*/

const Login = () => {
    const { user, onSetUserHandler } = useMainContext();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const navigate = useNavigate();
    const [inputErr, setInputErr] = useState(false);
    const   [isRevealPwd, setIsRevealPwd] = useState(false);
    
    async function handleCallbackResponse(response) {
        const userObject = jwt_decode(response.credential)
        console.log(userObject)
    
        try {
          const res = await axios.post("http://rcedina-001-site1.atempurl.com/api/Identity/google-login", { email: userObject.email });
          const user = res.data;
          onSetUserHandler(user)
          localStorage.setItem("user", JSON.stringify(user))
          console.log(user)
          axios.defaults.headers.common[
          "Authorization"
          ] = `Bearer ${user.token}`;
          navigate('/')
        onSetUserHandler(user)
        } catch (error) {
            console.log(error)
          }
        }

    useEffect(() => {
        google.accounts.id.initialize({
          client_id: "481714838175-qbaam6h6o26bideddg865e2phpvgd5e1.apps.googleusercontent.com",
          callback: handleCallbackResponse
        });
        
        google.accounts.id.renderButton(
          document.getElementById("signInDiv"),
          { theme: "outline", size: "large" }
        )
      }, [user])


    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [navigate, user])

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        console.log(inputErr)

        
        setError(null)
        if(email !== "" && password !== "")
        {
        try {
            const response = await axios.post('https://localhost:7016/api/Identity/login', { email, password })
            const user = response.data;
            console.log(user.token)
            onSetUserHandler(user)
            localStorage.setItem("user", JSON.stringify(user))
            console.log(user)
            axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${user.token}`;
            

        } catch (error) {
            setError(error.response.data.error)
        }}
        else
        {
            setError("You must fill in all of the fields!")
        }
    }

    return (
        <div className='page login-page'>
            <div className='auth-card'>
                {/* <div className='auth-card image'><img src={img} alt="" /></div> */}
                <form onSubmit={onSubmitHandler}>
                    <div className='header'><h2>Dobrodošli nazad</h2></div>
    
                    <div className='form-control'>
                        <label>Email</label>
                        <input type='email' onChange={(e) => setEmail(e.target.value)} />
                    </div>
    
                    <div className='form-control'>
                        <label>Lozinka</label>
                        <div className='pwd-container'>
                            <input type={isRevealPwd ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} />
                            <img
                                alt=''
                                title={isRevealPwd ? "Hide password" : "Show password"}
                                src={isRevealPwd ? hidePwdImg : showPwdImg}
                                onClick={() => setIsRevealPwd(prevState => !prevState)}
                            />
                        </div>
                        {/* <Link to='/forgot-password' className='form-control-link'>Forgot your password?</Link> */}
                    </div>
    
                    {error && <div style={{ fontSize: "10px", marginLeft: "10px" }}>{error}</div>}
    
                    <div className='form-control-button'>
                        <input type='submit' value='Login' />
                        <p>Nemate nalog? Prijavite se
                        <Link to='/register'> ovde!</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
    
}

export default Login