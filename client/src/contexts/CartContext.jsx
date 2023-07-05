import { createContext, useState } from "react";
// import { shoppingProducts as productsArray } from "../data/shoppingProducts";
import { getProductData } from "../data/shoppingProducts";

export const CartContext = createContext({
    items: [],
    getProductQuantity: () => {}, // we don't define a function within the context, we just declare functions to exist here
    addOneToCart: () => {},
    removeOneFromCart: () => {},
    deleteFromCart: () => {},
    getTotalCost: () => {},
})

// Functions are defined here and then get passed to the Provider

export function CartProvider({ children }) {
    const [cartProducts, setCartProducts] = useState([])

    // cartProducts template: [{ id: 1, quantity: 3 }, etc..]

    function getProductQuantity(id) {
        const quantity = cartProducts.find(product => product.id === id)?.quantity // the ? means if the .find finds nothing of that ID, it won't ask for the quantity
        
        if (quantity === undefined) {
            return 0
        }
        
        return quantity
    }


    function addOneToCart(id) {
        const quantity = getProductQuantity(id) 

        if (quantity === 0) { // product is not in cart
            setCartProducts(
                [
                    ...cartProducts, // take all of the objects currently in the cart and put them in the front
                    {
                        id: id,
                        quantity: 1
                    }
                ]
            )
        } else { // product is in cart
            setCartProducts(
                cartProducts.map( //loop through each object in cartProducts
                    product => 
                    product.id === id // if condition {ternary statment}
                    ? { ...product, quantity: product.quantity + 1 } // if true, list out all current properties of product and override quantity 
                    : product // if false
                )
            )
        }
    }

    function deleteFromCart(id) {
        // [] if an object meets a condition, add the object to array - how filter function works
        setCartProducts(
            cartProducts =>
            cartProducts.filter( 
                currentProduct => {
                    return currentProduct.id !== id // returns currentProduct if it doesn't match ID
                }
            ) 
        )
    }

    function removeOneFromCart(id) {
        const quantity = getProductQuantity(id)

        if (quantity === 1) { 
            deleteFromCart(id)
        } else { 
            setCartProducts(
                cartProducts.map( 
                    product => 
                    product.id === id 
                    ? { ...product, quantity: product.quantity - 1 }
                    : product 
                )
            )
        }
    }

    function getTotalCost() {
        let totalCost = 0

        cartProducts.map((cartItem) => {
            const productData = getProductData(cartItem.id)
            totalCost += (productData.price * cartItem.quantity)
        })

        return totalCost
    }

    const contextValue = {
        items: cartProducts, // use cardProducts state to manipulate what our provider is giving to the rest of our application
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost,
    }

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;
