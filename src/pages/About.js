import 'react-confirm-alert/src/react-confirm-alert.css';
import img1 from './images/turisticka_agencija1.jpg'; // Slike vezane za turističku agenciju
import img2 from './images/turisticka_agencija2.avif';
import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useMainContext } from '../context/main-context';


import '../components/UI/About.css';
const About = () => {
  const [info, setInfo] = useState('');
  const { user } = useMainContext();

  useEffect(() => {
    const getInfo = async () => {
      await axios.get('http://elmicaanovouser-001-site1.etempurl.com/api/Info')
        .then(res => setInfo(res.data));
    };
    getInfo();
  }, []);

  console.log(info);

  return (
    <div className="about-us-container" style={{ alignItems: "center" }}>
      <h1 style={{ textAlign: "center", margin: "50px" }}>
        Dobrodošli na naš profil
        <br />
        Saznajte više o našoj turističkoj agenciji
      </h1>
      
      <div className='about-us-section'>
        <img src={img1} alt="Turistička agencija" />
        <div className='about-us-paragraph'>
          <b>Naša turistička agencija</b> osnovana {info && info.yearOfEstablishment}. godine
          može zadovoljiti sve vaše potrebe za putovanjima, nudeći razne aranžmane širom sveta.
          Već više od {info.currentYear} godina poznati smo po izvanrednoj usluzi,
          našim dobro organizovanim turama i kvalitetu dodatnih usluga koje nudimo
          po najpovoljnijim cenama.
        </div>
      </div>

      <div className="safety-section">
        <h1 style={{ textAlign: "center", margin: "10px", marginTop: "20px" }}>Vaša sigurnost na prvom mestu!</h1>
        <p>
          Naše agencije su prisutne u brojnim mestima, kroz mrežu partnera i hotela.
          Trudimo se da uvek budemo tačni i pružimo naše usluge u najkraćem mogućem roku.
          Nudimo dostavu i preuzimanje putnih aranžmana na bilo kojoj lokaciji,
          bez dodatnih troškova, uključujući aerodrome, luke i glavna turistička mesta.
        </p>
      </div>

      <div className='why-choose-us'>
        <div className='why-choose-us-paragraph'>
          <h3 style={{ margin: "15px" }}>Zašto izabrati nas?</h3>
          <p> &#8226; Ekonomični aranžmani (povoljni, svestrani, lako dostupni)</p>
          <p> &#8226; Porodični paketi (savršeni za veće grupe)</p>
          <p> &#8226; Luksuzni aranžmani (za one koji žele vrhunski komfor)</p>
          <p> &#8226; Posebni aranžmani (personalizovane ture i putovanja)</p>
        </div>
        <img src={img2} alt="Turistički aranžmani" />
      </div>

      {user && user.role === 'Admin' ? (
        <div style={{ textAlign: "center" }}>
          <Link to='/change-info'>
            <button className='buttonzaabout' style={{ width: "180px", padding: "1rem", marginBottom: "1rem" }}>Ažuriraj informacije</button>
          </Link>
        </div>
      ) : ''}
    </div>
  );
};

export default About;
