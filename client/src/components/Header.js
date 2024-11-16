import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import { DataContext } from '../context/DataProvider';

const Header = () => {
    const { loggedin } = useContext(DataContext);
    const [menuOpen, setMenuOpen] = useState(false); // State for menu toggle

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev); // Toggle the menu state
    };

    return (
        <header className="header-container">
            <nav className="navbar">
                {/* Logo or Title */}
                <div className="navbar-logo">CarApp</div>

                {/* Hamburger Menu Icon */}
                <div
                    className={`navbar-hamburger ${menuOpen ? 'open' : ''}`}
                    onClick={toggleMenu}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                {/* Navigation Links */}
                <ul className={`navbar-links ${menuOpen ? 'navbar-links-open' : ''}`}>
                    <li className="navbar-item">
                        <NavLink
                            to="/login"
                            className={({ isActive }) => (isActive ? 'navbar-link active-link' : 'navbar-link')}
                            onClick={() => setMenuOpen(false)} // Close menu when link is clicked
                        >
                            Login
                        </NavLink>
                    </li>

                    <li className="navbar-item">
                        <NavLink
                            to="/signup"
                            className={({ isActive }) => (isActive ? 'navbar-link active-link' : 'navbar-link')}
                            onClick={() => setMenuOpen(false)} // Close menu when link is clicked
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
                                    onClick={() => setMenuOpen(false)} // Close menu when link is clicked
                                >
                                    My Cars
                                </NavLink>
                            </li>
                            <li className="navbar-item">
                                <NavLink
                                    to="/add-car"
                                    className={({ isActive }) => (isActive ? 'navbar-link active-link' : 'navbar-link')}
                                    onClick={() => setMenuOpen(false)} // Close menu when link is clicked
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
