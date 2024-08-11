import React, { useState } from 'react';
import axios from 'axios';
import '../components/UI/CreatePackage.css';

const CreatePackage = ({ onPackageCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [path, setPath] = useState(null);
  const [price, setPrice] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Naziv", name);
    formData.append("Opis", description);
    formData.append("StringPath", path); // Proveri naziv ovog polja na backendu
    formData.append("Tag", price); // Ako backend očekuje string ili broj, izmeni ovo polje u skladu s tim

    console.log("Form Data:", formData); // Proverite da li je formData pravilno popunjena

    try {
      const response = await axios.post("https://localhost:7016/api/Paket", formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      });
      console.log("Response data:", response.data);
      alert("You have successfully created a package");
      if (onPackageCreated) {
          onPackageCreated(response.data);
      }
  } catch (e) {
      console.error("Error creating package:", e);
      alert("An error occurred while creating the package");
  }
  
}

  return (
    <div className='create-package'>
      <form onSubmit={submitHandler}>
        <h2>Create Travel Package</h2>
        <div className="form-group">
          <label htmlFor="name">Package Name</label>
          <input
            type="text"
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Tag</label>
          <input
            type="number"
            id='price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={(e) => setPath(e.target.files[0])}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Create Package</button>
        </div>
      </form>
    </div>
  );
}

export default CreatePackage;
