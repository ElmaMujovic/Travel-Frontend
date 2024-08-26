import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import React, { useEffect, useState } from "react";
import carimg from './images/carbw.png'
import door from './images/door.jpg'
import fuel from './images/fuel.png'
import gearbox from './images/gearboc.png'
import mileage from './images/mileage.png'
import statistic from './images/statistic.jpg'
import { useMainContext } from "../context/main-context";
import CommentCard from "../components/UI/CommentCard";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
// import { RiHeart3Fill } from 'react-icons/ri';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'


const CarDetails = () => {
    const { id } = useParams();
    const [car, setCar] = useState([]);
    const [destination, setDestination  ] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const { user } = useMainContext();
    const navigate = useNavigate();
    const [text, setText] = useState('');
    const [comment, setComment] = useState([]);
    const [favAd, setFavsAd] = useState(null)
    const date = new Date().toLocaleDateString();
    const [discount, setDiscount] = useState({});
    const [isFavourite, setIsFavourite] = useState(false);

    const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
    const DeleteCar = async (e) => {
        e.preventDefault();
        await axios.delete(`https://localhost:7016/api/Destinacija/${destination.id}`);
        navigate('/');

    }
    const submit = (e) => {
        confirmAlert({
          title: 'Delete a car',
          message: 'Are you sure to do this?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => DeleteCar(e)
            },
            {
              label: 'No',
              onClick: () => console.log("canceled")
            }
          ]
        });
      };
      
    // useEffect(() => {
    //     axios.get(`https://localhost:7093/api/Car/${id}`)
    //         .then(res => setCar(res.data));
    //     try {
    //         axios.get(`https://localhost:7093/api/Comment/comments/${id}`)
    //             .then(res => setComment(res.data));
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }, [])


    const fetchFavouritesCar = async () => {
        try {
            const res = await axios.get('https://localhost:7016/KorisnikDestinacija');
            setFavorites(res.data);
            console.log("pozivvvvv")
            console.log(userFromLocalStorage.user.id)
            const adIndex = res.data.find(x => x.destinacijaId == id && x.korisnikId == userFromLocalStorage.user.id);
            console.log("Addddindex", adIndex)
            if (adIndex) {

                setIsFavourite(true);
                setFavsAd(true)
            } else {
                setIsFavourite(false);
            }
        } catch (e) {
            console.log(e);
        }
    };
    
    const toggleFavourite = async () => {
        if (isFavourite) {
            await removeAdFromFavourite();
        } else {
            await addAdToFavourites();
        }
        setIsFavourite(!isFavourite); // Menjanje stanja omiljenih
    };
   

    // const removeAdFromFavourite = async () => {
    //     await axios.delete(`http://edinak1-001-site1.ftempurl.com/api/User/remove-favorite/${favAd.id}`)
    //         .then(res => console.log("okej"))
    //         await fetchFavouritesCar();
    // }

    const removeAdFromFavourite = async () => {
        try {
            await axios.delete(`https://localhost:7016/KorisnikDestinacija/api/${id}`);

            setFavsAd(false); // Ažuriraj stanje nakon uspešnog uklanjanja
            await fetchFavouritesCar(); // Ponovo učitaj omiljene destinacije
        } catch (e) {
            console.log("Greška prilikom uklanjanja iz omiljenih", e);
        }
    };
      


    const addAdToFavourites = async () => {
        try {
            await axios.post('https://localhost:7016/KorisnikDestinacija/api', {
                korisnikId: user.user.id,
                destinacijaId: id
            });

            setFavsAd(true); // Ažuriraj stanje nakon uspešnog dodavanja
            
        } catch (e) {
            console.log("Greška prilikom dodavanja u omiljene", e);
        }
    };

    const getComments = async () => {
        try {
            const response = await axios.get(`https://localhost:7016/api/Komentar/comments/${id}`)
            
            setComment(response.data)
            console.log(comment)
        } catch (e) {
            console.log(e)
        }
    }


   

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch destination data
                const destResponse = await axios.get(`https://localhost:7016/api/Destinacija/${id}`);
                setDestination(destResponse.data);
                console.log("Destination data:", destResponse.data);
                
                // Fetch comments data
                const commentsResponse = await axios.get(`https://localhost:7016/api/Komentar/comments/${id}`);
                setComment(commentsResponse.data);
                console.log("Comments data:", commentsResponse.data);
                
            } catch (e) {
                console.error("Error fetching data:", e);
            }
    
            // Check favorites
            try {
                await fetchFavouritesCar();
            } catch (e) {
                console.error("Error fetching favorites:", e);
            }
        };
    
        fetchData();
    }, []); // Ostavlja samo 'id' kao zavisnost
    


    //delete
    async function deleteComment(id) {
        await axios.delete(`https://localhost:7016/api/Komentar/delete-comment/${id}`)
            .then(res => console.log("okej"))
    }

    //add a comment
    const handlerSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("https://localhost:7016/api/Komentar",
                {
                    DestinacijaId: id,
                    KorisnikId: user.user.id,
                    Tekst: text,
                    Datum: date
                })
        } catch (e) {
            console.log(e);
        }
        setText('');
        getComments()

    }

    //update car
    const UpdateCar = async (e) => {
        navigate(`/update-car/${id}`);
    }

    const Reserve = async (e) => {

       
      
            try {
                const response = await axios.post('https://localhost:7016/KorisnikDestinacija',
                        {
                            korisnikId: 1,
                            destinacijaId: destination.id
                        })
                    setDiscount(response.data);
                    alert("Uspešno ste rezervisali destinaciju");
            } catch (e) {
                console.log(e);
            }
        
    }

   
    const manageComments = async (id) => {
        await deleteComment(id)
        await getComments()
    }


    return (
        <div className="details-page">

            {car && (
                <div>
                    <div className="nameCar"><p>{destination.naziv}</p></div>
                    <div className="prikaz">
                        {destination.imagePath && <img src={`https://localhost:7016/images/${destination.imagePath}`} style={{ marginLeft: "5rem" }} alt="" />}
                        <div className="car-details">
                            <div className="form-reserve">
                                <h1>Karakteristike destinacije</h1>
                        
                                {user && <button className="car-details btn" onClick={Reserve}>Rezerviši</button>}
                                {user && user.role === 'Admin' ? <button className="car-details btn" onClick={UpdateCar} >Uredi</button> : ''}
                                {user && user.role === 'Admin' ? <button className="car-details btn" onClick={submit} >Obriši</button> : ''}
                            </div>

                        </div>
                    </div>
                    <div style={{ width: "80%", height: "2px", margin: "auto", backgroundColor: "rgb(199, 209, 245)" }}></div>
                    <div className="feature" >
                       
                        <div style={{ display: "flex", marginLeft: "13rem" }} className="hearts">
                            <h2 style={{ marginBottom: "2rem" }}>Dodaj u omiljne</h2>
                            {/* <RiHeart3Fill className="heart" /> */}
                             {!favAd && <button onClick={addAdToFavourites}><AiOutlineHeart  style={{ color: "black", fontSize: "24px" }}  /></button>}
                            {favAd && <button onClick={removeAdFromFavourite}><AiFillHeart style={{ color: "red", fontSize: "24px" }} /></button>} 
                           
                        </div>
                        <div className="add-comment">
                            <h2>Komentari</h2> <br />
                            
                            
                          
                            <div className="add-comment com">
                            {Array.isArray(comment) ? (
                                comment.map((com, id) => {
                                    return (
                                        <div className="add-comment del" key={id}>
                                        <CommentCard time={com.datum} name={com.korisnikIme} surname= {com.koristnikPrezime}text={com.tekst} key={com.id} />
                                        {user && user.role === 'Moderator' ? <button onClick={manageComments.bind(this, com.id)} key={id} >Obrisi</button> : ""}
                                    </div>
                                    );
                                })
                            ) : (
                                <p>Nema komentara za prikazivanje.</p>
                            )}
                        </div>

                            <h2>Dodaj komentar</h2>
                            <textarea className="comment" id="" cols="40" rows="5" onChange={(e) => setText(e.target.value)} value={text}></textarea><br />
                            <button className="add-comm" onClick={handlerSubmit}>Posalji</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );


}

export default CarDetails;