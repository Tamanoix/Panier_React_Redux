import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';


const Navbar = () => {
    return (
        <nav className="nav-top">
            <Link to="/">Accueil</Link>
            <Link to="/produits">Produits</Link>
            <Link to="/contact">Contact</Link>
        </nav>
    );
};

export default Navbar;