import { useContext } from "react";
import React from 'react';
import { NavLink } from 'react-router-dom';  // Import NavLink
import './Header.css'; // Optional: Add custom CSS for styling
import { DataContext } from '../context/DataProvider';

const Header = () => {
    const { loggedin } = useContext(DataContext); // Get login state from context

    return (
        <header className="header-container">
            <nav className="navbar">
                <ul className="navbar-links">

                    <li className="navbar-item">
                        <NavLink
                            to="/login"
                            className={({ isActive }) => (isActive ? 'navbar-link active-link' : 'navbar-link')}
                        >
                            Login
                        </NavLink>
                    </li>

                    <li className="navbar-item">
                        <NavLink
                            to="/signup"
                            className={({ isActive }) => (isActive ? 'navbar-link active-link' : 'navbar-link')}
                        >
                            Signup
                        </NavLink>
                    </li>

                    {/* Show 'My Cars' and 'Add Car' if user is logged in */}
                    {loggedin && (
                        <>
                            <li className="navbar-item">
                                <NavLink
                                    to="/cars"
                                    className={({ isActive }) => (isActive ? 'navbar-link active-link' : 'navbar-link')}
                                >
                                    My Cars
                                </NavLink>
                            </li>
                            <li className="navbar-item">
                                <NavLink
                                    to="/add-car"
                                    className={({ isActive }) => (isActive ? 'navbar-link active-link' : 'navbar-link')}
                                >
                                    Add Car
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
