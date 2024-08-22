import './Card.css';
import React  from 'react';

const Card = (props) => {
    const {id, image, name, price, description } = props;

    return ( 
        <div className='car-preview'key={id}>

        <div className='car'>
           <img src={`https://localhost:7016/images/` + image} alt=""/>
        </div>
        <p>{name}</p>
        {/* <p>{description}</p> */}
        <div className='line'></div>
        <div className='price'>
            <p>Day from</p>
            <p>${price}</p>
        </div>
        </div>
     );
}

export default Card;