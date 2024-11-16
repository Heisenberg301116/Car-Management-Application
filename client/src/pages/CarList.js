import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './CarList.css'; // Import the CSS file

const CarList = () => {
    const [cars, setCars] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCars = async () => {
            const response = await api.getCars();
            setCars(response.data);
        };
        fetchCars();
    }, []);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const filteredCars = cars.filter((car) =>
        car.title.toLowerCase().includes(search.toLowerCase()) ||
        car.description.toLowerCase().includes(search.toLowerCase()) ||
        car.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="carlist-container">
            <h2 className="main-title">Your Cars</h2>
            <input
                className="carlist-search"
                placeholder="Search cars..."
                value={search}
                onChange={handleSearch}
            />

            <ul className="carlist-items">
                {filteredCars.map((car) => (
                    <li key={car._id} className="carlist-item" onClick={() => navigate(`/cars/${car._id}`)}>
                        <div className="carlist-item-content">
                            <p className="carlist-title"><strong>Title:</strong> {car.title}</p>

                            <p className="carlist-description"><strong>Description:</strong> {car.description}</p>

                            <div className="carlist-tags">
                                <strong>Tags:</strong>
                                {car.tags.map((tag, index) => (
                                    <span key={index} className="carlist-tag">{tag}</span>
                                ))}
                            </div>
                            <div className="carlist-images">
                                {car.images.slice(0, 2).map((image, index) => (
                                    <img key={index} className="carlist-image" src={image} alt={`Car ${car.title}`} />
                                ))}
                                {car.images.length > 2 && (
                                    <div className="carlist-more-images">
                                        <span>+{car.images.length - 2} more</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CarList;
