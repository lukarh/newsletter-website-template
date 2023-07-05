import React, { useContext } from 'react';
import { Badge } from 'primereact/badge';
import { CartContext } from '../contexts/CartContext';

const CartBadge = () => {
    const cart = useContext(CartContext);
    // unique array function to get the number of items in the cart
    const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);

    return (
        <i className="pi pi-shopping-cart" style={{ fontSize: '1.5rem' }}>
            <Badge value={productsCount} severity="info"></Badge>
        </i>
    );
};

export default CartBadge;