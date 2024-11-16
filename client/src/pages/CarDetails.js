import React, { useEffect, useState, useContext } from 'react';
import { DataContext } from '../context/DataProvider';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import './CarDetails.css';  // Importing the CSS file

const CarDetails = () => {
    const { loggedin } = useContext(DataContext);
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to login if not logged in
        if (!loggedin) {
            // console.log("================> reresehed !!!")
            navigate('/login');
        }
    }, [loggedin, navigate]);

    useEffect(() => {
        const fetchCar = async () => {
            const response = await api.getCar(id);
            setCar(response.data);
        };
        fetchCar();
    }, [id]);

    const handleDelete = async () => {
        await api.deleteCar(id);
        navigate('/cars');
    };

    return car ? (
        <div className="car-details-container">
            {/* Car Title */}
            <h2 className="car-details-title">{car.title}</h2>

            {/* Title Section */}
            <div className="car-details-section">
                <h3 className="car-details-section-title">Title:</h3>
                <p>{car.title}</p>
            </div>

            {/* Description Section */}
            <div className="car-details-section">
                <h3 className="car-details-section-title">Description:</h3>
                <p>{car.description}</p>
            </div>

            {/* Tags Section */}
            <div className="car-details-section">
                <h3 className="car-details-section-title">Tags:</h3>
                <div className="car-details-tags">
                    {car.tags && car.tags.map((tag, index) => (
                        <span key={index} className="car-details-tag">{tag}</span>
                    ))}
                </div>
            </div>

            {/* Images Section */}
            <div className="car-details-section">
                <h3 className="car-details-section-title">Images:</h3>
                <div className="car-details-images">
                    {car.images && car.images.length > 0 ? (
                        car.images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Car Image ${index + 1}`}
                                className="car-details-image"
                            />
                        ))
                    ) : (
                        <p className="car-details-no-images">No images available for this car.</p>
                    )}
                </div>
            </div>

            {/* Buttons Section */}
            <div className="car-details-buttons">
                <button
                    className="car-details-button car-details-edit-button"
                    onClick={() => navigate(`/edit-car/${id}`)}>
                    Edit
                </button>
                <button
                    className="car-details-button car-details-delete-button"
                    onClick={handleDelete}>
                    Delete
                </button>
            </div>
        </div>
    ) : (
        <p className="car-details-loading">Loading...</p>
    );
};

export default CarDetails;
