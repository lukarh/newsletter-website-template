import { useState, useEffect } from "react";

import CartBadge from '../../components/CartBadge';
import { CartContext } from '../../contexts/CartContext';

import { shoppingProducts, getProductData } from '../../data/shoppingProducts';

import ShoppingProduct from '../../components/ShoppingProduct'

function chunkArray (arr, size) {
    const chunkedArray = []
    let index = 0

    while (index < arr.length) {
        chunkedArray.push(arr.slice(index, index+size))
        index += size
    }

    return chunkedArray
}

const Shop = () => {
    const [chunkedProducts, setChunkedProducts] = useState([])

    useEffect(() => {
        const chunkArray = async (arr, size) => {
            const chunkedArray = []
            let index = 0
        
            while (index < arr.length) {
                chunkedArray.push(arr.slice(index, index+size))
                console.log(chunkedArray)
                index += size
            }

            setChunkedProducts(chunkedArray)
        }

        chunkArray(shoppingProducts, 4)
    }, [])


    return (
        <div className="container">
            <div className="main-content" style={{ fontFamily: "Poppins" }}>
                {
                    chunkedProducts.map((rowShoppingProducts, rowIndex) => (
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            {
                                rowShoppingProducts.map((product) => (
                                    <ShoppingProduct product={product} />
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Shop;