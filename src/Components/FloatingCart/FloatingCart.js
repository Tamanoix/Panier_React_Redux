import React from 'react';
import cartIcon from './shopping-cart.svg';
import './FloatingCart.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const FloatingCart = () => {

    const shoppingCart = useSelector(state => state);

    let totalItems = 0;
    // S'il y a des items enregistrés dans le state (store)
    for (const item of shoppingCart.cart) {
        totalItems += item.quantity;
    }

    return (
        <Link to="/shoppingCart">
            <div className='floating-cart'>
                <p>Votre Panier</p>
                <div className="img-notif-container">
                    <img src={cartIcon} alt="icône caddie" />
                    <span className="notif">{totalItems}</span>
                </div>
            </div>
        </Link>
    );
};

export default FloatingCart;