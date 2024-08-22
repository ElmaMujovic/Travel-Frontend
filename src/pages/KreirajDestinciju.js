import React, { useState } from 'react';
import axios from 'axios';
import '../components/UI/KreirajDestinciju.css'

const KreirajDestinciju = () => {
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
            alert("Uspešno ste kreirali destinaciju");
        }
        catch(e)
        {
            console.log(e);
        }
    }

    return (
        <div className='create-destination'>
            <form onSubmit={submitHandler}>
                <h2>Kreiraj destinaciju</h2>
                <div className="form-group">
                    <label htmlFor="name">Ime</label>
                    <input type="text" id='name' onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Opis</label>
                    <input type="text" id='description' onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Cena</label>
                    <input type="number" id='price' onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Slika</label>
                    <input type="file" name="image" id="image" onChange={(e) =>
                        setPath(e.target.files[0])
                    } />
                </div>
                <div className="form-group">
                    <button type="submit">Kreiraj destinaciju</button>
                </div>
            </form>
        </div>
    )
}

export default KreirajDestinciju;
