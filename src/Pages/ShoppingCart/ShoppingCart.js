import React, {useState, useEffect} from 'react';
import './ShoppingCart.css';
import { useSelector, useDispatch } from 'react-redux';
import Bin from './bin.png';


const ShoppingCart = () => {

    const storeState = useSelector(state => state);

    const dispatch = useDispatch();

    // Au changement dans le panier
    const handleChange = (event, id) => {

        // On récupère l'item choisi
        const indexItem = storeState.cart.findIndex(obj => obj.id === id);

        // On met à jour l'item avec la valeur de l'input
        const objUpdate = {
            ...storeState.cart[indexItem],
            quantity: Number(event.target.value)
        }

        // Et on dispatch la mise à jour dans le store
        dispatch({
            type: "UPDATEITEM",
            payload: objUpdate
        })

    }

    // Au click sur le bouton Remove
    const handleRemove = (id) => {

        const indexItem = storeState.cart.findIndex(obj => obj.id === id);

        const objDeleted = {
            ...storeState.cart[indexItem],
        }

        dispatch({
            type: "DELETEITEM",
            payload: objDeleted
        })

    };

    let totalPrice = 0;
    // S'il y a bien des éléments dans le panier
    if (storeState.cart.length !== 0) {
        for (const item of storeState.cart) {
            const itemPrice = item.price * item.quantity;
            totalPrice += itemPrice;
        }
    }


    return (
        <div className='global-container'>
            <p className="heading-cart">Votre panier :</p>
            <ul className="cart-list">
                {storeState.cart.map((item) => (
                    <li key={item.id}>
                        <img
                        src={process.env.PUBLIC_URL + `/images/${item.img}.png`}
                        alt=""
                        />
                        <div className="bloc-cart-infos">
                            <h4>{item.title}</h4>
                            <p>Price : {item.price}€</p>
                        </div>
                        <div className="bloc-input">
                            <label htmlFor="quantityInput">Quantité</label>
                            <input 
                            id="quantityInput"
                            type="number"
                            min="1" 
                            value={item.quantity}
                            onChange={e => handleChange(e, item.id)}
                            />
                        </div>
                        <div className="bloc-cart-remove">
                            <img 
                            src={Bin}
                            alt="supprimer du panier"
                            className="cart-remove"
                            onClick={() => handleRemove(item.id)}
                            />
                        </div>
                    </li>
                ))}
            </ul>
            <p className="total-price">Total : {totalPrice.toFixed(2)}€</p>
            <button className="btn-cart">Procéder au paiement</button>
        </div>
    );
};

export default ShoppingCart;