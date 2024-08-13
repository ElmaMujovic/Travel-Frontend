import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home'
import Login from './pages/Login'
import Navigation from './components/UI/Navigation'
import { useMainContext } from './context/main-context'
import axios from 'axios'
import Register from './pages/Register';
import Footer from './components/UI/Footer';
import Fleet from './pages/Fleet';
import Contact from './pages/Contact';
import "slick-carousel/slick/slick.css";
import 'slick-carousel/slick/slick-theme.css';
import About from './pages/About';
import CreateCar from './pages/CreateCar';
import CarDetails from './pages/CarDetails';
import Profile from './pages/Profile';
import UpdateCar from './pages/UpdateCar';
import UpdateProfile from './pages/UpdateProfile';
import Verify from './pages/Verify';
import jwt_decode from "jwt-decode";
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
import ChangeInfo from './pages/ChangeInfo';
import Error from './pages/Error';
import CreatePackage from './pages/CreatePackage';
import DestinacijePaketa from './pages/DestinacijePaketa';
import DestinacijeList from './pages/DestinacijeList'; // Dodaj ovu liniju
import EditPackage from './pages/EditPackage';
import EditDestinationList from './pages/EditDestinationList';


/* eslint-disable */

function App() {
  
  const { onSetUserHandler, user } = useMainContext()

  async function handleCallbackResponse(response) {
    const userObject = jwt_decode(response.credential)

    try {
      const res = await axios.post("http://edinak1-001-site1.ftempurl.com/api/Identity/google-login", { email: userObject.email });
      const user = res.data;
      onSetUserHandler(user)
      localStorage.setItem("user", JSON.stringify(user))
      console.log(user.token)
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${user.token}`;
      navigate('/')

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user != null) {
      localStorage.setItem("user", JSON.stringify(user))
      console.log(user.token)
      onSetUserHandler(user)
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${user.token}`;
    }
  }, []);

  return (
    <div style={{position:"relative"}}>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/fleet' element={<Fleet />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<About />} />
          <Route path='/create-car' element={<CreateCar />} />
          <Route path='/car-details/:id' element={<CarDetails />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/update-car/:id' element={<UpdateCar />} />
          <Route path='/update-profile' element={<UpdateProfile />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/reset-password/:token' element={<ResetPassword/>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route path='/change-info' element={<ChangeInfo/>}/>
          <Route path='/create-package' element={<CreatePackage/>}/>
          <Route path='/create-package-destinacija' element={<DestinacijePaketa/>}/>
          <Route path="/destinacije-paketa/:paketId" element={<DestinacijeList />} />
          <Route path="/uredi-paket/:id" element={<EditPackage />} />
          <Route path="/uredi-destinaciju-lista/:destinationId" element={<EditDestinationList />} />

          

          <Route path="/*" element={<Error/>} />
        </Routes>
      </Router>
      
    <Footer />
    </div>
  );
}

export default App;
