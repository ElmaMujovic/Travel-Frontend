import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/UI/Card';
const Fleet = () => {
    const[cars,setCars] = useState([]);
    const[destinations,setDestinations] = useState([]);
    const[searchDestination, setSearchDestinations]= useState('');
    const [car, setCar] = useState({});
    const[searchCar, setSearchCars]= useState('');
    const [filter, setFilter] = useState([]);
    const[f, setF] = useState(0);
    const [price, setPrice] = useState(50);

    const handleInput = (e) =>
    {
        setPrice(e.target.value);
    }
    function FilterByName(name) {
        axios.get(`http://edinak1-001-site1.ftempurl.com/api/Car/filtered?name=${name}`)
        .then(res => setFilter(res.data));
        setF(1);
    }

    function FilterByType (type)
    {
        axios.get(`http://edinak1-001-site1.ftempurl.com/api/Car/filteredbytype?type=${type}`)
        .then(res => setFilter(res.data));
        setF(1);
    }

    function FilterByPrice(price)
    {
        axios.get(`http://edinak1-001-site1.ftempurl.com/api/Car/filteredbyprice?price=${price}`)
        .then(res => setFilter(res.data))
        setF(1);
    }
    const ReturnAll = (e) =>
    {
        setF(0);
    }
    useEffect(() =>
    {
        axios.get('https://localhost:7016/api/Destinacija')
        .then(res => setDestinations(res.data));
    }, [])
    return ( <div className="page fleet-page">

<h1 style={{ textAlign: "center", margin: "2.5rem 0 1.5rem 0" }} >Our rental cars</h1>
            <div style={{ margin: "0rem 45rem", backgroundColor: "rgb(199, 209, 245)", maxWidth: "100px", height: "2px" }}></div>

            <p style={{ textAlign: "center", margin: "15px 0" }}>Choose any of ours featured cars</p>
            <div style={{ display: "flex" }}>
            <div className="dropdown">
            
    <button className="dropbtn">Filter 
    </button>
    {f===1 && <button onClick={ReturnAll} className="btnX">X</button>}
    <div className="dropdown-content">
      <div className="row">
        <div className="column">
          <h3>Price</h3>
          <input type="range" onInput={ handleInput } min="50" max="100" style={{padding:"0", marginLeft:"25px"}}/>
            <h4 style={{marginLeft:"60px"}}>Price:{ price }</h4>
            <button className="btnApply" onClick={()=>FilterByPrice(price)}>Apply</button>
        </div>
      </div>
    </div>
  </div>
                
                <input type="text" placeholder="Search..." onChange={e => { setSearchDestinations(e.target.value) }} style={{ marginLeft: "1.5rem", marginTop: "0.1rem", height: "2rem" }}></input>
                    </div>





            {
                <div className="" style={{    
                flexFlow: "row wrap",
                display: "flex",
                marginTop:"5rem",
                flexWrap:"wrap",
                justifyContent: "center"}}>

                    {destinations.filter((destination) => {
                        if (searchDestination === "") { return ( <Link to={`/cars/${destination.id}`}>{destination}</Link>) }
                        else if (destination.naziv.toLowerCase().includes(searchDestination.toLowerCase())) {
                            return ( <Link to={`/destination-details/${destination.id}`}>{filter}</Link>
                            )}
                        else return null;


                        
                    }).map((destination, key) => {

                       
                        return (
                            
                                <Link to={`/car-details/${destination.id}`} key={destination.id} style={{textDecoration:"none", color:"black"}}>
                            {f===0?(<Card key={destination.id} name={destination.naziv} price={destination.cena} image={destination.imagePath} description={destination.opis}/>) :""}

                                </Link>
                                
                      

                        )
                    })
                    
                    }

                    
                 {f===1? filter.map((car, key) => {
                        
                        return (
                                <Link to={`/car-details/${car.id}`} key={car.id} style={{textDecoration:"none", color:"black"}}>
                     <Card key={car.id} name={car.name} price={car.price} image={car.path}/>
                            </Link>
                      

                        )
                    }):""}

                </div>
                
                }

    </div> );
}
 
export default Fleet;