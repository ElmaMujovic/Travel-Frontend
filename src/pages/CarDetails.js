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
              
            await axios.get('https://localhost:7016/KorisnikDestinacija')
            .then(res =>{
                 setFavorites(res.data)
                 const adIndex = res.data.filter(x => x.korisnikId == 1)
                 console.log(res.data[0].korisnikId);
                 if (adIndex !== -1) {
                     setFavsAd(true)
                 } else {
                     setFavsAd(null)
                 }
                })

          


        } catch (e) {
            console.log(e)
        }
       
    }

    const removeAdFromFavourite = async () => {
        await axios.delete(`http://edinak1-001-site1.ftempurl.com/api/User/remove-favorite/${favAd.id}`)
            .then(res => console.log("okej"))
            await fetchFavouritesCar();
    }


    const addAdToFavourites = async () => {
        try {
            await axios.post('http://edinak1-001-site1.ftempurl.com/api/User/favourites', {
                userId: user.user.id,
                carId: id
            })

            await fetchFavouritesCar();
        } catch (e) {
            console.log(e);
        }
    }

    const getComments = async () => {
        try {
            const response = await axios.get(`http://edinak1-001-site1.ftempurl.com/api/Comment/comments/${id}`)
            setComment(response.data)
        } catch (e) {
            console.log(e)
        }
    }


   

    useEffect(() => {
        axios.get(`https://localhost:7016/api/Destinacija/${id}`)
            .then(res => setDestination(res.data));
        try {
            axios.get(`http://edinak1-001-site1.ftempurl.com/api/Comment/comments/${id}`)
                .then(res => setComment(res.data));
        } catch (e) {
            console.log(e);
        }
        const handleCheckFalse = async () => {
            try {
                await fetchFavouritesCar();
            } catch (e) {
                console.log(e)
            }
        }

        if (user) {
           

        }
        handleCheckFalse();

    }, [])


    //delete
    async function deleteComment(id) {
        await axios.delete(`http://edinak1-001-site1.ftempurl.com/api/Comment/delete-comment/${id}`)
            .then(res => console.log("okej"))
    }

    //add a comment
    const handlerSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://edinak1-001-site1.ftempurl.com/api/Comment",
                {
                    carId: id,
                    userId: user.user.id,
                    comment: text,
                    date: date
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
                    alert("You have successfully reserved a destination");
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
                                <h1>Model Features</h1>
                        
                                {user && <button className="car-details btn" onClick={Reserve}>Reserve</button>}
                                {user && user.role === 'Admin' ? <button className="car-details btn" onClick={UpdateCar} >Update</button> : ''}
                                {user && user.role === 'Admin' ? <button className="car-details btn" onClick={submit} >Delete</button> : ''}
                            </div>

                        </div>
                    </div>
                    <div style={{ width: "80%", height: "2px", margin: "auto", backgroundColor: "rgb(199, 209, 245)" }}></div>
                    <div className="feature" >
                        {/* <div className="osobine" style={{ width: "500px" }}>
                            <div className="addinf"><h2>Additional information</h2></div>
                            <table style={{ width: "1000px", marginLeft: "15rem", marginBottom: "5rem" }} className="feature">
                                <tbody>
                                    <tr>
                                        <td><img src={carimg} alt="" /><b>Class:</b> Impact</td>
                                        <td><img src={gearbox} alt="" /><b>Gearbox:</b> {car.gearbox}</td>
                                        <td><img src={fuel} alt="" /><b>Fuel usage:</b> 39-47 MPG</td>
                                    </tr>
                                    <tr>
                                        <td><img src={statistic} alt="" /><b>Engine capacity:</b> {car.engine}</td>
                                        <td><img src={door} alt="" /><b>Doors:</b> {car.doors}</td>
                                        <td><img src={mileage} alt="" /><b>Mileage:</b> Unlimited</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div> */}
                        {/* <div className="include">
                            <h2 className="addinf" >Our prices include</h2><br />
                            <table style={{ width: "1000px", marginLeft: "15rem", marginBottom: "5rem" }} className="feature">
                                <tbody>
                                    <tr>
                                        <td>&#10003;TPI Insurance</td>
                                        <td>&#10003;Unlimited Kilometres</td>
                                        <td>&#10003;Delivery & Pick-up</td>
                                    </tr>
                                    <tr>
                                        <td>&#10003;1st Child seat</td>
                                        <td>&#10003;24/7 roadside assistance</td>
                                        <td>&#10003;Electric Windows</td>
                                    </tr>
                                </tbody>
                            </table>

                        </div> */}
                        <div style={{ display: "flex", marginLeft: "13rem" }} className="hearts">
                            <h2 style={{ marginBottom: "2rem" }}>Add to favorite</h2>
                            {/* <RiHeart3Fill className="heart" /> */}
                            {!favAd && <button onClick={addAdToFavourites}><AiOutlineHeart /></button>}
                            {favAd && <button onClick={removeAdFromFavourite}><AiFillHeart /></button>}

                        </div>
                        <div className="add-comment">
                            <h2>Comments</h2> <br />
                            <div className="add-comment com">
                                {comment.map((com, id) => {
                                    return (
                                        <div className="add-comment del" key={id}>
                                            <CommentCard time={com.date} name={com.user.firstName} surname={com.user.lastName} text={com.comment} key={com.id} />
                                            {user && user.role === 'Moderator' ? <button onClick={manageComments.bind(this, com.id)} key={id} >Delete</button> : ""}
                                        </div>)
                                })
                                }
                            </div>
                            <h2>Add comments</h2>
                            <textarea className="comment" id="" cols="40" rows="5" onChange={(e) => setText(e.target.value)} value={text}></textarea><br />
                            <button className="add-comm" onClick={handlerSubmit}>Send</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );


}

export default CarDetails;