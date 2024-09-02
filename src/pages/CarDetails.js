import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useMainContext } from "../context/main-context";
import CommentCard from "../components/UI/CommentCard";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import '../components/UI/DestinationDetails.css'

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

    const [showReserveForm, setShowReserveForm] = useState(false); // New state for showing the reserve form
    const [reservationData, setReservationData] = useState({
        departureDate: '',
        arrivalDate: '',
        numberOfPeople: 1,
        note: '' // Add note field

    });

    const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch destination data
                const destResponse = await axios.get(`https://localhost:7016/api/Destinacija/${id}`);
                setDestination(destResponse.data);
                
                // Fetch comments data
                const commentsResponse = await axios.get(`https://localhost:7016/api/Komentar/comments/${id}`);
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
            const res = await axios.get('https://localhost:7016/KorisnikDestinacija');
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
            await axios.delete(`https://localhost:7016/KorisnikDestinacija/api/${id}`);
            setFavsAd(false);
            await fetchFavouritesCar();
        } catch (e) {
            console.log("Error removing from favorites:", e);
        }
    };

    const addAdToFavourites = async () => {
        try {
            await axios.post('https://localhost:7016/KorisnikDestinacija/api', {
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
            const response = await axios.get(`https://localhost:7016/api/Komentar/comments/${id}`);
            setComment(response.data);
        } catch (e) {
            console.log(e);
        }
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://localhost:7016/api/Komentar", {
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
        setShowReserveForm(true); // Show the reserve form when clicked
    };

    const handleReservationSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://localhost:7016/api/RezervacijaDestinacije', {
                DatumPolaska: reservationData.departureDate,
                DatumDolaska: reservationData.arrivalDate,
                BrojOsoba: reservationData.numberOfPeople,
                Napomena: reservationData.note, // Include note field in request

                KorisnikId: user.user.id,
                DestinacijaId: id
            });
            alert(" Rezervacija je uspešno obavljena");
            setShowReserveForm(false); // Hide the form after successful reservation
        } catch (e) {
            console.log(e);
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        confirmAlert({
            title: 'Delete destination',
            message: 'Are you sure to do this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        await axios.delete(`https://localhost:7016/api/Destinacija/${id}`);
                        navigate('/');
                    }
                },
                {
                    label: 'No',
                    onClick: () => console.log("Canceled")
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
                    <div className="prikaz">
                        {destination.imagePath && <img src={`https://localhost:7016/images/${destination.imagePath}`} style={{ marginLeft: "5rem" }} alt="" />}
                        <div className="car-details">
                            <div className="form-reserve">
                                <h1>Destination Features</h1>
                                {user && <button className="car-details btn" onClick={handleReserve}>Reserve</button>}
                                {user && user.role === 'Admin' && <button className="car-details btn" onClick={() => navigate(`/update-car/${id}`)}>Edit</button>}
                                {user && user.role === 'Admin' && <button className="car-details btn" onClick={handleDelete}>Delete</button>}
                            </div>
                        </div>
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
                                    comment.map((com, id) => (
                                        <div className="add-comment del" key={id}>
                                            <CommentCard time={com.datum} name={com.korisnikIme} surname={com.koristnikPrezime} text={com.tekst} key={com.id} />
                                        </div>
                                    ))
                                ) : (
                                    <p>No comments to display.</p>
                                )}
                            </div>
                            <h2>Dodaj komentar</h2>
                            <textarea className="comment" cols="40" rows="5" onChange={(e) => setText(e.target.value)} value={text}></textarea><br />
                            <button className="add-comm" onClick={handleSubmitComment}>Submit</button>
                        </div>
                    </div>
                    {showReserveForm && (
                <div className="reserve-form">
                    <h2>Rezervišite Vaš Boravak</h2>
                    <form onSubmit={handleReservationSubmit}>
                        <label>
                            Datum Polaska:
                            <input 
                                type="date" 
                                value={reservationData.departureDate} 
                                onChange={handleDepartureDateChange} 
                                required 
                            />
                        </label>
                        <br />
                        <label>
                            Datum Dolaska:
                            <input 
                                type="date" 
                                value={reservationData.arrivalDate} 
                                onChange={handleArrivalDateChange} 
                                min={reservationData.departureDate} // Minimum date is departure date
                                required 
                            />
                        </label>
                        <br />
                        <label>
                            Broj Osoba:
                            <input 
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
                        <button type="submit">Potvrdi Rezervaciju</button>
                        <button type="button" onClick={() => setShowReserveForm(false)}>Otkaži</button>
                    </form>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CarDetails;
