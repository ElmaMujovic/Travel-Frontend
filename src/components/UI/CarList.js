import { Link } from "react-router-dom";
import React from 'react';
import Card from "./Card";
import './Card.css';
const CarsList = (props) => {

    const { destinations } = props
    console.log("bloglist", destinations);

    const firstcar = destinations.slice(0,3)
    return ( 
        <div className="car-list">
        
            {firstcar.map((destination) => 
            (
               
                <Link to={`/car-details/${destination.id}`} key={destination.id} style={{textDecoration:"none", color:"black"}}>
                    <Card key={destination.id} name={destination.naziv} price={destination.cena} image={destination.imagePath} description={destination.opis}/>
                </Link>
               

            ))}

             </div>
           
       
     );
    
}
 
export default CarsList;