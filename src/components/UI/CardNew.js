import './Card.css';
import React  from 'react';

const CardNew = (props) => {
    const {id, image, name, price, description, opis, naziv,imagePath, cena } = props;

    return ( 
        <div className='car-preview'key={id}>

        <div className='car'>
           <img src={`https://localhost:7016/images/` + imagePath} alt=""/>
       
        </div>
        <p>{name}</p>
        {/* <p>{description}</p> */}
        <div className='line'></div>
        <div className='cena'>
            <p></p>
            <p>${cena}</p>
            <p>{naziv}</p>
            <p>{opis}</p>

        </div>
        </div>
     );
}

export default CardNew;