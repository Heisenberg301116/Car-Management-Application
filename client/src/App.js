import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DataProvider from './context/DataProvider'
import Header from './components/Header';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import CarList from './pages/CarList';
import CarDetails from './pages/CarDetails';
import AddEditCar from './pages/AddEditCar';
import Home from './pages/Home';

const App = () => (
  <DataProvider>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cars" element={<CarList />} />
        <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/add-car" element={<AddEditCar />} />
        <Route path="/edit-car/:id" element={<AddEditCar />} />
      </Routes>
    </Router>
  </DataProvider>
);

export default App;