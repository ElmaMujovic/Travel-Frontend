import React, { useState } from 'react';
import axios from 'axios';

const CreateCar = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [path, setPath] = useState(null);
    const [price, setPrice] = useState('');
   

    const submitHandler = async (e) => {
        e.preventDefault();

        // if(image === null) return

        const formData = new FormData();
        formData.append("stringPath", path);
        formData.append("naziv", name);
        formData.append("cena", Number(price));
        formData.append("opis", description);

        try{
            await axios.post("https://localhost:7016/api/Destinacija", formData);
            console.log(path);
            alert("You have successfully created a destination");
        }
        catch(e)
        {
            console.log(e);
        }
        
    }

    return (
        <div className='create-car'>
            <form onSubmit={submitHandler}>
            <h2>Create a destination</h2>
                <div className="form-control-two">
                    <div className="form-control">
                        <label htmlFor="name">Name</label>
                        <input type="text" id='name' onChange={(e) => setName(e.target.value)} />
                    </div>
                </div>
                <div className="form-control-two">
                    <div className="form-control">
                        <label htmlFor="doors">Description</label>
                        <input type="text" id='doors' onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="engine">Price</label>
                        <input type="number" id='engine' onChange={(e) => setPrice(e.target.value)} />
                    </div>
                </div>
                <div className="form-control">
                    <label htmlFor="image">Image</label>
                    <input type="file" name="image" id="image" onChange={(e) =>
                        setPath(e.target.files[0])
                    } />
                </div>
                <div className="form-control">
                    <input type="submit" value="Create a destination" />
                </div>
            </form>
        </div>
    )
}

export default CreateCar