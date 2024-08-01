import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'

const ChangeInfo = () => {
    const [yearOfEstablishment, setYearOfEstablishment] = useState();
    const [currentYear, setCurrentYear] = useState();
    const [minPrice, setMinPrice] = useState();
    const [maxPrice, setMaxPrice] = useState();
    const navigate = useNavigate();
    const submitHandler = async(e) =>
    {
        e.preventDefault();
        try{
           
            await axios.put(`http://edinak1-001-site1.ftempurl.com/api/Info`,
        {
            id:1,
            yearOfEstablishment: yearOfEstablishment,
            currentYear: currentYear,
            minPrice: minPrice,
            maxPrice: maxPrice
            
        }) 
        navigate('/about');
       
        }catch(e)
        {
            console.log(e);
        }
    }
    return ( 

        <div style={{height:"100vh"}} className="page contact-page">
            <form style={{marginTop:"10rem"}} onSubmit={submitHandler} >
                    <h1>Update informations</h1>
                        <div className='form-control'>
                            <label>Current year</label>
                            <input type='text' onChange={(e) => {setCurrentYear(e.target.value)}} />
                        </div>
                        <div className='form-control'>
                            <label>Year of establishment</label>
                            <input type='text' onChange={(e) => {setYearOfEstablishment(e.target.value)}} />
                    </div>
                    <div className='form-control'>
                        <label>Min Price</label>
                        <input type='text'  onChange={(e) => {setMinPrice(e.target.value)}} />
                    </div>
                    <div className='form-control'>
                        <label>Max Price</label>
                        <input type='text'  onChange={(e) => {setMaxPrice(e.target.value)}}/>
                    </div>
                    <div className="form-control">
                        <input type="submit" value="Update" />
                    </div>
                </form>
        </div>
     );
}
 
export default ChangeInfo;