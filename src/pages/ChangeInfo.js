import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const ChangeInfo = () => {
    const [title, setTitle] = useState('');
    const [economyPackage, setEconomyPackage] = useState('');
    const [familyPackage, setFamilyPackage] = useState('');
    const [luxuryPackage, setLuxuryPackage] = useState('');
    const [specialPackage, setSpecialPackage] = useState('');
    const [imageFile, setImageFile] = useState(null); // Za učitavanje slike
    const navigate = useNavigate();

    const submitHandler = async(e) => {
        e.preventDefault();
        
        // Formiranje podataka u formatu za slanje
        const formData = new FormData();
        formData.append('Id', 1);  // Stavljamo ID koji već postoji
        formData.append('Title', title);
        formData.append('EconomyPackage', economyPackage);
        formData.append('FamilyPackage', familyPackage);
        formData.append('LuxuryPackage', luxuryPackage);
        formData.append('SpecialPackage', specialPackage);
        if (imageFile) {
            formData.append('ImageUrl', imageFile); // Učitavanje slike
        }

        try {
            // Slanje zahteva ka API-u
            await axios.put(`https://localhost:7016/api/WhyChooseUs`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            // Navigacija ka /about nakon uspešnog ažuriranja
            navigate('/about');
        } catch(e) {
            console.log("Greška prilikom ažuriranja: ", e);
        }
    }

    return ( 
        <div style={{height:"100vh"}} className="page contact-page">
            <form style={{marginTop:"10rem"}} onSubmit={submitHandler}>
                <h1>Ažuriraj Informacije</h1>
                <div className='form-control'>
                    <label>Naslov</label>
                    <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className='form-control'>
                    <label>Ekonomični Paket</label>
                    <input type='text' value={economyPackage} onChange={(e) => setEconomyPackage(e.target.value)} />
                </div>
                <div className='form-control'>
                    <label>Porodični Paket</label>
                    <input type='text' value={familyPackage} onChange={(e) => setFamilyPackage(e.target.value)} />
                </div>
                <div className='form-control'>
                    <label>Luksuzni Paket</label>
                    <input type='text' value={luxuryPackage} onChange={(e) => setLuxuryPackage(e.target.value)} />
                </div>
                <div className='form-control'>
                    <label>Posebni Paket</label>
                    <input type='text' value={specialPackage} onChange={(e) => setSpecialPackage(e.target.value)} />
                </div>
                <div className='form-control'>
                    <label>Učitaj Sliku</label>
                    <input type='file' onChange={(e) => setImageFile(e.target.files[0])} />
                </div>
                <div className="form-control">
                    <input type="submit" value="Ažuriraj" />
                </div>
            </form>
        </div>
    );
}
 
export default ChangeInfo;
