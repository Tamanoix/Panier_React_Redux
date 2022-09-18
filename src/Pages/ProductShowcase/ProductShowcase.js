import React, { useState , useEffect , useRef } from 'react';
import { useParams } from 'react-router-dom';
import './ProductShowcase.css';
import inventory from '../../data/inventory';
import { useDispatch } from 'react-redux';


const ProductShowcase = () => {

    const [nbMugs, setNbMugs] = useState(1);

    const {id} = useParams();

    const productClicked = inventory.findIndex(obj => obj.title.replace(/\s+/g, "").trim() === id);

    const updateMugs = e => {
        setNbMugs(Number(e.target.value));
    };

    // On fait le lien avec le <span> pour afficher le message 'ajouté au panier'
    const addingInfo = useRef();
    let timerInfo;
    let display = true;

    const dispatch = useDispatch();

    // Fonction d'ajout au panier
    const addToCart = e => {
        e.preventDefault();

        // On récupère l'item choisi et sa quantité
        const itemAdded = {
            ...inventory[productClicked],
            quantity: nbMugs
        }

        // On dispatch le nouveau statut dans le store
        dispatch({
            type: "ADDITEM",
            payload: itemAdded
        })

        // Et on gère le petit message "ajouté au panier"
        addingInfo.current.innerText = "Ajouté au panier";

        if (display) {
            display = false;
            timerInfo = setTimeout(() => {
                addingInfo.current.innerText = "";
                display = true;
            }, 500);
        }
    }

    // On clear le Timeout du "Ajouté au panier" si jamais on quitte le composant trop vite avant qu'il ne puisse s'afficher et disparaître
    useEffect(() => {
      return () => {
        clearTimeout(timerInfo);
      }
    }, [])


    return (
        <div className='showcase'>
            <div className="container-img-showcase">
                <img 
                className='img-showcase'
                src={process.env.PUBLIC_URL + `/images/${inventory[productClicked].img}.png`}
                alt="" />
            </div>
            <div className="product-infos">
                <h2>{inventory[productClicked].title}</h2>
                <p>Prix : {inventory[productClicked].price}€</p>
                <form onSubmit={addToCart}>
                    <label htmlFor="quantity">Quantité</label>
                    <input 
                        type="number"
                        min="1" 
                        id='quantity'
                        value={nbMugs}
                        onChange={updateMugs}
                    />
                    <button>Ajouter au panier</button>
                    <span 
                        ref={addingInfo}
                        className="adding-info">
                    </span>
                </form>
            </div>
        </div>
    );
};

export default ProductShowcase;