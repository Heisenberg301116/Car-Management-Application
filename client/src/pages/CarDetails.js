import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

const CarDetails = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCar = async () => {
            const response = await api.getCar(id);
            setCar(response.data);
            // console.log("================> response = ", response)
        };
        fetchCar();
    }, [id]);

    const handleDelete = async () => {
        await api.deleteCar(id);
        navigate('/cars');
    };

    return car ? (
        <div>
            <h2>{car.title}</h2>
            <p>{car.description}</p>
            <div>
                {car.images && car.images.length > 0 ? (
                    car.images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Car Image ${index + 1}`}
                            style={{ width: '300px', height: 'auto', margin: '10px' }}
                        />
                    ))
                ) : (
                    <p>No images available for this car.</p>
                )}
            </div>


            <button onClick={() => navigate(`/edit-car/${id}`)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    ) : (
        <p>Loading...</p>
    );
};

export default CarDetails;
