
import 'react-confirm-alert/src/react-confirm-alert.css';
import img1 from './images/rentacar.png'
import img2 from './images/cu.jpg'
import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useMainContext } from '../context/main-context'
const About = () => {

    const [info, setInfo] = useState('');
    const { user } = useMainContext();

    
    useEffect(()=>
    {
      
      const getInfo = async () =>
    {
      await axios.get('http://edinak1-001-site1.ftempurl.com/api/Info')
      .then(res=>setInfo(res.data))
    }
       getInfo()

    },[])
    console.log(info)
    return ( 
        <div className="aboutus" style={{alignItems:"center"}}>
        <h1 style={{textAlign:"center", margin:"50px"}}>Welcome To Our Profile  <br></br>
    Learn more about Car2Go Rental </h1>
    <div className='first'><img  src={img1}  alt="" />
    <div className='paragraf1'>
      <b>Car2Go rental</b> founded in {info && info.yearOfEstablishment} can accommodate your vehicle needs,
       offering all types of cars, scooters and ATV’s in Paros and Antiparos areas.
        For over {info.currentYear} years we are known for our superior customer service,
         our new and well-maintained vehicles and the variety and quality
          of extra services we offer at the lowest possible cost.
      </div>
    </div>

    <div className="second">
      <h1 style={{textAlign:"center", margin:"10px", marginTop:"20px"}}>Your safety first!</h1>
      <p>Service Stations are found allover Paros and Antiparos through number of specialized
         partner tour agencies and hotels. We strive to be always on time and provide our services 
         allover both islands at the shortest possible waiting time for you.
          We drop off and collect the vehicle of your choice at any point in Paros. 
          We do not charge delivery or pickup fees anywhere in Paros, including Paros Airport, 
          Port of Paros and main areas such as Parikia, Naousa, Lefkes, Aliki and many many more.
           We also deliver and pick-up for free at any hotel in these areas.</p>
    </div>

    <div className='chooseus'>
      <div className='paragraf2'>
        <h3 style={{margin:"15px"}}>Why choose us?</h3>
        <p> &#8226; Economy cars (small, versatile, fuel-efficient, easy to drive everyday cars) </p>
        <p> &#8226;Mid-size hatchbacks (the ideal choice for more than two people)</p>
            <p>&#8226;Automatic and Hybrid-automatic cars (Fuel efficient, smart, easy to drive smart cars with plenty of space)</p> 
           <p> &#8226; People carriers (7-seater and 9-seater minibus options, so the whole pack can travel together) </p>

      </div>
      <img  alt="" src={img2} />
    </div>
    {user && user.role === 'Admin' ?<div style={{textAlign:"center"}}><Link to='/change-info'><button style={{width:"180px", padding:"1rem", marginBottom:"1rem"}}>Update informations</button></Link></div> : ''}
    
    
  </div>
);

     
}
 
export default About;