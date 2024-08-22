import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from '../components/UI/Card';
import '../components/UI/Fleet.css';
import { useMainContext } from '../context/main-context'; // Adjust path as needed


const Fleet = () => {
    const [cars, setCars] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [searchDestination, setSearchDestinations] = useState('');
    const [searchCar, setSearchCars] = useState('');
    const [filter, setFilter] = useState([]);
    const [f, setF] = useState(0);
    const [price, setPrice] = useState(50);
    const { user } = useMainContext(); // Preuzmi korisnički kontekst

    const handleInput = (e) => {
        setPrice(e.target.value);
    };

    const FilterByName = (name) => {
        axios.get(`https://localhost:7016/api/Car/filtered?name=${name}`)
            .then(res => setFilter(res.data));
        setF(1);
    };

    const FilterByType = (type) => {
        axios.get(`https://localhost:7016/api/Car/filteredbytype?type=${type}`)
            .then(res => setFilter(res.data));
        setF(1);
    };

    const FilterByPrice = (price) => {
        axios.get(`https://localhost:7016/api/Car/filteredbyprice?price=${price}`)
            .then(res => setFilter(res.data));
        setF(1);
    };

    const ReturnAll = () => {
        setF(0);
    };

    const deleteDestination = (id) => {
        axios.delete(`https://localhost:7016/api/Destinacija/${id}`)
            .then(() => {
                setDestinations(destinations.filter(destination => destination.id !== id));
            })
            .catch(error => console.error('Error deleting destination:', error));
    };

    useEffect(() => {
        axios.get('https://localhost:7016/api/Destinacija')
            .then(res => setDestinations(res.data))
            .catch(error => console.error('Error fetching destinations:', error));
    }, []);

    return (
        <div className="fleet-page-container">
            <h1 className="fleet-page-title">Sve moguće destinacije</h1>
            <div className="fleet-page-divider"></div>
            <p className="fleet-page-subtitle">Izaberite bilo koji od naših istaknutih destinacija</p>
            <div className="fleet-page-controls">
                <div className="fleet-page-dropdown">
                    {/* <button className="fleet-page-dropbtn">Filteri</button> */}
                    <div className="fleet-page-dropdown-content">
                        <div className="fleet-page-row">
                            <div className="fleet-page-column">
                                <h3>Price</h3>
                                <input
                                    type="range"
                                    onInput={handleInput}
                                    min="50"
                                    max="100"
                                    className="fleet-page-range"
                                />
                                <h4 className="fleet-page-price">Price: {price}</h4>
                                <button className="fleet-page-btnApply" onClick={() => FilterByPrice(price)}>Apply</button>
                            </div>
                        </div>
                    </div>
                </div>
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={e => setSearchDestinations(e.target.value)}
                    className="fleet-page-search"
                />
            </div>

            <div className="fleet-page-cards-container">
                {destinations.filter(destination => {
                    if (searchDestination === "") {
                        return destination;
                    } else if (destination.naziv.toLowerCase().includes(searchDestination.toLowerCase())) {
                        return destination;
                    } else return null;
                }).map(destination => (
                    <div key={destination.id} className="fleet-page-card-container">
                        <Link to={`/car-details/${destination.id}`} className="fleet-page-card-link">
                            {f === 0 ? (
                                <Card
                                    name={destination.naziv}
                                    price={destination.cena}
                                    image={destination.imagePath}
                                    description={destination.opis}
                                />
                            ) : ""}
                        </Link>
                        <div className="fleet-page-actions">
                            {user && user.role === 'Moderator' && (
                                <>
                                    <button onClick={() => deleteDestination(destination.id)} className="fleet-page-btnDelete">Obriši</button>
                                    <Link to={`/edit-destination/${destination.id}`} className="fleet-page-btnEdit">Uredi</Link>
                                </>
                            )}
                        </div>
                    </div>
                ))}
                {f === 1 && filter.map(car => (
                    <Link to={`/car-details/${car.id}`} key={car.id} className="fleet-page-card-link">
                        <Card
                            name={car.name}
                            price={car.price}
                            image={car.path}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Fleet;
