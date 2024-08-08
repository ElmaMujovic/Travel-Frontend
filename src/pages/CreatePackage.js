import React, { useState } from 'react';
import axios from 'axios';
import '../components/UI/CreatePackage.css';
const CreatePackage = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [path, setPath] = useState(null);
    const [price, setPrice] = useState('');
   
    const submitHandler = async (e) => {
        e.preventDefault();

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
        <div className='create-package'>
            <form onSubmit={submitHandler}>
                <h2>Create Travel Package</h2>
                <div className="form-group">
                    <label htmlFor="name">Package Name</label>
                    <input type="text" id='name' onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input type="text" id='description' onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Tag</label>
                    <input type="number" id='price' onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input type="file" name="image" id="image" onChange={(e) =>
                        setPath(e.target.files[0])
                    } />
                </div>
                <div className="form-group">
                    <button type="submit">Create Package</button>
                </div>
            </form>
        </div>
    )
}

export default CreatePackage;
