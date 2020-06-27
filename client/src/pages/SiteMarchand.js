import React from 'react'
import Basket from '../components/SiteMarchand/Basket';

// /site-marchand/basket --> formulaire de passage order

// /site-marchand/settings  --> set credentials
// /site-marchand/orders    --> liste des orders
// /site-marchand/orders/:id --> details de l'order, possibilité de faire un refund

// [{ name, desc, price, quantity }] --> format à renvoyer

const SiteMarchand = () => {
    return (
        <div>
            <Basket />
        </div>
    )
}

export default SiteMarchand;
