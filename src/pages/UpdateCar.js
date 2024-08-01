import React, { useState } from 'react';
import axios from 'axios';
import {  useNavigate, useParams } from 'react-router-dom';

const UpdateCar = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [day1, setDay1] = useState(0);
    const [day2, setDay2] = useState(0);
    const [day3, setDay3] = useState(0);
    const [path, setPath] = useState(null);
    const {id} = useParams();
    const navigate = useNavigate();
    const submitHandler = async (e) => {
        e.preventDefault();

        // if(image === null) return

        const formData = new FormData();
        formData.append("name", name);
        formData.append("path", path);
        formData.append("price", Number(price));
        formData.append("day1", Number(day1));
        formData.append("day2", Number(day2));
        formData.append("day3", Number(day3));

        try{
            await axios.put(`http://edinak1-001-site1.ftempurl.com/api/Car/${id}`, formData)
            .then(res => console.log(res));
            console.log('Updated!');
            navigate('/fleet');
        }
         catch(e){
            console.log(e.response);
         }
    }

    return (
        <div className='create-car'>
            <form onSubmit={submitHandler}>
                <div className="form-control-two">
                    <div className="form-control">
                        <label htmlFor="name">Name</label>
                        <input type="text" id='name' onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="price">Price</label>
                        <input type="number" id='price' onChange={(e) => setPrice(e.target.value)} />
                    </div>
                </div>
                <div className="form-control-two">
                    <div className="form-control">
                        <label htmlFor="day1">Day 1</label>
                        <input type="number" id='day1' onChange={(e) => setDay1(e.target.value)} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="day2">Day 2</label>
                        <input type="number" id='day2' onChange={(e) => setDay2(e.target.value)} />
                    </div>
                </div>
                <div className="form-control-two">
                    <div className="form-control">
                        <label htmlFor="day3">Day 3</label>
                        <input type="number" id='day3' onChange={(e) => setDay3(e.target.value)} />
                    </div>
                </div>  
                <div className="form-control">
                    <label htmlFor="image">Image</label>
                    <input type="file" name="image" id="image" onChange={(e) =>
                        setPath(e.target.files[0])
                    } />
                </div>
                <div className="form-control">
                    <input type="submit" value="Update car" />
                </div>
            </form>
        </div>
    )
}

export default UpdateCar