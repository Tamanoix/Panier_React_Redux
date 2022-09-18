import React from 'react';
import './Home.css';
import imgHomeShop from './shopimg.jpg';


const Home = () => {
    return (
        <div className='global-container'>
            <h1 className="home-title">Bienvenue au <span>Shop</span></h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat eos blanditiis facilis veritatis, voluptatibus consequuntur accusantium perspiciatis at odit cupiditate voluptates distinctio rem, ducimus soluta totam error incidunt. Quibusdam, totam.</p>
            <img src={imgHomeShop} alt="accueil shop" />
        </div>
    );
};

export default Home;