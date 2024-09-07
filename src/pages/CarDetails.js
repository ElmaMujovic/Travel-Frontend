import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useMainContext } from "../context/main-context";
import CommentCard from "../components/UI/CommentCard";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import '../components/UI/DestinationDetails.css';

const CarDetails = () => {
    const { id } = useParams();
    const [destination, setDestination] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const { user } = useMainContext();
    const navigate = useNavigate();
    const [text, setText] = useState('');
    const [comment, setComment] = useState([]);
    const [favAd, setFavsAd] = useState(null);
    const [discount, setDiscount] = useState({});
    const [isFavourite, setIsFavourite] = useState(false);

    const [showReserveForm, setShowReserveForm] = useState(false); // Novo stanje za prikazivanje forme za rezervaciju
    const [reservationData, setReservationData] = useState({
        departureDate: '',
        arrivalDate: '',
        numberOfPeople: 1,
        note: '' // Polje za napomenu
    });

    const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch destination data
                const destResponse = await axios.get(`http://elmicaanovouser-001-site1.etempurl.com/api/Destinacija/${id}`);
                setDestination(destResponse.data);
                
                // Fetch comments data
                const commentsResponse = await axios.get(`http://elmicaanovouser-001-site1.etempurl.com/api/Komentar/comments/${id}`);
                setComment(commentsResponse.data);
                
                // Fetch favorites
                await fetchFavouritesCar();
            } catch (e) {
                console.error("Error fetching data:", e);
            }
        };

        fetchData();
    }, [id]);

    const fetchFavouritesCar = async () => {
        try {
            const res = await axios.get('http://elmicaanovouser-001-site1.etempurl.com/KorisnikDestinacija');
            setFavorites(res.data);
            const adIndex = res.data.find(x => x.destinacijaId == id && x.korisnikId == userFromLocalStorage.user.id);
            if (adIndex) {
                setIsFavourite(true);
                setFavsAd(true);
            } else {
                setIsFavourite(false);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const toggleFavourite = async () => {
        if (isFavourite) {
            await removeAdFromFavourites();
        } else {
            await addAdToFavourites();
        }
        setIsFavourite(!isFavourite);
    };

    const removeAdFromFavourites = async () => {
        try {
            await axios.delete(`http://elmicaanovouser-001-site1.etempurl.com/KorisnikDestinacija/api/${id}`);
            setFavsAd(false);
            await fetchFavouritesCar();
        } catch (e) {
            console.log("Error removing from favorites:", e);
        }
    };

    const addAdToFavourites = async () => {
        try {
            await axios.post('http://elmicaanovouser-001-site1.etempurl.com/KorisnikDestinacija/api', {
                korisnikId: user.user.id,
                destinacijaId: id
            });
            setFavsAd(true);
        } catch (e) {
            console.log("Error adding to favorites:", e);
        }
    };

    const getComments = async () => {
        try {
            const response = await axios.get(`http://elmicaanovouser-001-site1.etempurl.com/api/Komentar/comments/${id}`);
            setComment(response.data);
        } catch (e) {
            console.log(e);
        }
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://elmicaanovouser-001-site1.etempurl.com/api/Komentar", {
                DestinacijaId: id,
                KorisnikId: user.user.id,
                Tekst: text,
                Datum: new Date().toLocaleDateString()
            });
            setText('');
            getComments();
        } catch (e) {
            console.log(e);
        }
    };

    const handleReserve = () => {
        setShowReserveForm(!showReserveForm); // Toggle forme za rezervaciju
    };

    const handleReservationSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://elmicaanovouser-001-site1.etempurl.com/api/RezervacijaDestinacije', {
                DatumPolaska: reservationData.departureDate,
                DatumDolaska: reservationData.arrivalDate,
                BrojOsoba: reservationData.numberOfPeople,
                Napomena: reservationData.note, // Uključivanje polja napomene u zahtev

                KorisnikId: user.user.id,
                DestinacijaId: id
            });
            alert("Rezervacija je uspešno obavljena");
            setShowReserveForm(false); // Sakrij formu nakon uspešne rezervacije
        } catch (e) {
            console.log(e);
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        confirmAlert({
            title: 'Obriši destinaciju',
            message: 'Da li ste sigurni da želite ovo?',
            buttons: [
                {
                    label: 'Da',
                    onClick: async () => {
                        await axios.delete(`http://elmicaanovouser-001-site1.etempurl.com/api/Destinacija/${id}`);
                        navigate('/');
                    }
                },
                {
                    label: 'Ne',
                    onClick: () => console.log("Otkazano")
                }
            ]
        });
    };

    const handleDepartureDateChange = (e) => {
        const newDepartureDate = e.target.value;
        setReservationData({
            ...reservationData,
            departureDate: newDepartureDate,
            arrivalDate: newDepartureDate < reservationData.arrivalDate ? reservationData.departureDate : reservationData.arrivalDate
        });
    };

    const handleArrivalDateChange = (e) => {
        const newArrivalDate = e.target.value;
        if (newArrivalDate < reservationData.departureDate) {
            alert("Datum dolaska ne može biti pre datuma polaska.");
        } else {
            setReservationData({ ...reservationData, arrivalDate: newArrivalDate });
        }
    };

    return (
        <div className="details-page">
            {destination && (
                <div>
                    <div className="nameCar"><p>{destination.naziv}</p></div>
                    <div className="prikazi">
                        {destination.imagePath && <img src={`http://elmicaanovouser-001-site1.etempurl.com/images/${destination.imagePath}`} style={{ marginLeft: "5rem" }} alt=""  className="slika"/>}
                        </div>


                        {/* <div className="car-details"> */}
                            <div className="form-reserve">
                                {user && (
                                    <div className="reserve-section">
                                        <button className="dugme66" onClick={handleReserve}>Rezerviši</button>
                                        {showReserveForm && (
                                            <div className="reserve-form-custom">
                                                <h2>Rezervišite Vaš Boravak</h2>
                                                <form onSubmit={handleReservationSubmit}>
                                                    <label  className="inputi" >
                                                        Datum Polaska:
                                                        <input  
                                                            type="date" 
                                                            value={reservationData.departureDate} 
                                                            onChange={handleDepartureDateChange} 
                                                            required 
                                                        />
                                                    </label>
                                                    <br />
                                                    <label className="inputi" >
                                                        Datum Dolaska:
                                                        <input  
                                                            type="date" 
                                                            value={reservationData.arrivalDate} 
                                                            onChange={handleArrivalDateChange} 
                                                            min={reservationData.departureDate} // Minimalni datum je datum polaska
                                                            required 
                                                        />
                                                    </label>
                                                    <br />
                                                    <label>
                                                        Broj Osoba:
                                                        <input  className="inputi"
                                                            type="number" 
                                                            value={reservationData.numberOfPeople} 
                                                            onChange={(e) => setReservationData({ ...reservationData, numberOfPeople: e.target.value })} 
                                                            min="1" 
                                                            required 
                                                        />
                                                    </label>
                                                    <br />
                                                    <label>
                                                        Napomena:
                                                        <textarea 
                                                            value={reservationData.note} 
                                                            onChange={(e) => setReservationData({ ...reservationData, note: e.target.value })} 
                                                        />
                                                    </label>
                                                    <br />
                                                    <button type="submit" className="reserve-submit">Potvrdi rezervaciju</button>
                                                    <button type="button" className="reserve-cancel" onClick={() => setShowReserveForm(false)}>Otkaži</button>
                                                </form>
                                            </div>
                                        )}
                                    </div>
                                )}
                                {user && user.role === 'Admin' && (
                                    <>
                                        <button className="car-details btn" onClick={() => navigate(`/update-car/${id}`)}>Edit</button>
                                        <button className="car-details btn" onClick={handleDelete}>Delete</button>
                                    </>
                                )}
                            
                        {/* </div> */}
                    </div>
                    <div style={{ width: "80%", height: "2px", margin: "auto", backgroundColor: "rgb(199, 209, 245)" }}></div>
                    <div className="feature">
                        <div style={{ display: "flex", marginLeft: "13rem" }} className="hearts">
                            <h2 style={{ marginBottom: "2rem" }}>Dodaj u omiljeno</h2>
                            {!favAd && <button onClick={addAdToFavourites}><AiOutlineHeart style={{ color: "black", fontSize: "24px" }} /></button>}
                            {favAd && <button onClick={removeAdFromFavourites}><AiFillHeart style={{ color: "red", fontSize: "24px" }} /></button>}
                        </div>
                        <div className="add-comment">
                            <h2>Komentari</h2> <br />
                            <div className="add-comment com">
                                {Array.isArray(comment) ? (
                                    comment.map((com, index) => (
                                        <div className="add-comment del" key={index}>
                                            <CommentCard time={com.datum} name={com.korisnikIme} surname={com.koristnikPrezime} text={com.tekst} key={com.id} />
                                        </div>
                                    ))
                                ) : (
                                    <p>Nema komentara!</p>
                                )}
                            </div>
                            <h2>Dodaj komentar</h2>
                            <textarea 
                                className="comment" 
                                cols="40" 
                                rows="5" 
                                onChange={(e) => setText(e.target.value)} 
                                value={text}
                                placeholder="Unesite vaš komentar ovde..."
                            ></textarea><br />
                            <button className="add-comm" onClick={handleSubmitComment}>Submit</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CarDetails;
