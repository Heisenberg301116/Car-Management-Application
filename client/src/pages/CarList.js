import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

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
        <div>
            <h2>Your Cars</h2>
            <input
                placeholder="Search cars..."
                value={search}
                onChange={handleSearch}
            />
            <button onClick={() => navigate('/add-car')}>Add Car</button>
            <ul>
                {filteredCars.map((car) => (
                    <li key={car._id} onClick={() => navigate(`/cars/${car._id}`)}>
                        {car.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CarList;
