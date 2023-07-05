import React, { useContext } from 'react';
import { CartContext } from "../contexts/CartContext"

import { Button } from "primereact/button";

const ShoppingProduct = ({ product }) => {
    const cart = useContext(CartContext)
    const productQuantity = cart.getProductQuantity(product.id)

    return (
        <div className="product-card" style={{ width: "25%", padding: "2rem" }}>
            <img className="product-image" src={product.image} style={{ display: "block", width: "100%", marginBottom: "1rem", borderRadius: "10px" }}/>

            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: "10px" }}>

                <div style={{ width: "50%" }}>
                    <h4>{product.name}</h4>
                </div>

                <div style={{ width: "50%", display: "flex", justifyContent: "flex-end", verticalAlign: "top" }}>
                    <p style={{ fontSize: "12px" }}>$ </p>
                    <p style={{ fontWeight: "bold", fontSize: "16px" }}>{product.price}</p>
                </div>


            </div>

            {
                productQuantity > 0 ?
                <Button className="cart-btn" label="- Remove from Cart" onClick={() => cart.removeOneFromCart(product.id)} />
                :
                <Button className="cart-btn" label="+ Add to Cart" onClick={() => cart.addOneToCart(product.id)} />
            }

            {/* {
                product.sale ?
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <p style={{ marginRight: "5px", fontSize: "17px" }}>$ {product.price}</p>
                    <p style={{ color: 'red', fontWeight: "bold" }}>   SALE!</p>
                </div>
                :
                <p style={{ fontSize: "17px" }}>$ {product.price}</p>
            } */}
        </div>
    )
}

export default ShoppingProduct;