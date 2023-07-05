import React, { useContext, useState } from 'react';
import { getProductData } from '../../data/shoppingProducts';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Divider } from 'primereact/divider';
import { Checkbox } from 'primereact/checkbox';
import { Tooltip } from 'primereact/tooltip';
import { Badge } from 'primereact/badge';

import CartBadge from '../../components/CartBadge';
import { CartContext } from '../../contexts/CartContext';

import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

// import Payment from './Payment'

const Checkout = ({ formik, isFormFieldValid }) => {
    const cart = useContext(CartContext);
    const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0)
    const [isProcessing, setIsProcessing] = useState(false)

    const stripe = useStripe() // hook that gives us access to a resolved stripe object, which we passed through using the stripePromise and the Elements provider
    const elements = useElements() // hook that locates and access mounted stripe elements on the page

    // const subscribe = async (event) => {
    //     event.preventDefault()

    //     // check if stripe and elements have been loaded
    //     if (!stripe || !elements) {
    //         return
    //     }

    //     // check if user has selected a subscription plan

    //     const subscriptionPlanIDs = ["price_1NFkBvE90bFljz7QS7Ejo4SM", "price_1NFkCAE90bFljz7QHVC7RfUS"]

    //     const cartHasSubscriptionPlan = subscriptionPlanIDs.some((planID) => cart.items.some((item) => item.id === planID))

    //     if (!cartHasSubscriptionPlan) {
    //         return
    //     }
        
    //     setIsProcessing(true)

    //     // create new customer to stripe dashboard


    //     const { error: customerBackEndError, customerId } = await fetch("http://localhost:4000/create-stripe-customer", {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             email: formik.values.email, 
    //             name: formik.values.firstName + " " + formik.values.lastName,
    //             description: 'New Subscription User',
    //         })
    //     }).then(r => r.json())

    //     if (customerBackEndError) {
    //         setIsProcessing(false)
    //         return
    //     }

    //     console.log('the customerID', customerId)

    //     // create a new stripe subscription with the new customer


    //     const { error: backendError, subscriptionId, clientSecret } = await fetch("http://localhost:4000/create-subscription", {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             priceId: cart.items[0].id,
    //             customerId: customerId
    //         })
    //     }).then(r => r.json())

    //     if (backendError) {
    //         setIsProcessing(false)
    //         return
    //     }


    //     // confirm subscription payment with card info 


    //     const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
    //         clientSecret, {
    //             payment_method: {
    //                 card: elements.getElement(CardElement)
    //             }
    //         }
    //     )

    //     if (stripeError) {
    //         setIsProcessing(false)
    //         return
    //     }


    //     setIsProcessing(false)
    // }

    return (
        <div className="container">

            {/* LEFT HAND SIDE OF CHECKOUT SCREEN */}
            <div className="col-content" style={{ width: "50%", padding: "2rem" }}>

                <div className="col-content" style={{ padding: "3rem" }}>

                    <h2>Checkout</h2>

                    <Divider />

                    <div>
                        {/* <Payment style={{ width: "100%" }}/> */}
                        {/* <CardElement style={{ width: "1000px" }}/> */}
                        <Button label='Checkout' // onClick={subscribe} 
                        style={{ backgroundColor: "#8F00FF" }} disabled={ isProcessing || !stripe || !elements || (cart.items.length === 0) }/>
                    </div>

                    <Divider />

                    <a href='/shop' style={{ fontWeight: "bold", color: "#E0E0E0", fontSize: "24px" }}>{"< Back to Shopping"}</a>

                </div>

            </div>

            {/* RIGHT HAND SIDE OF CHECKOUT SCREEN */}
            <div className="col-content" style={{ width: "50%", padding: "2rem", backgroundColor: "#FAFAFA", borderLeft: "1px solid #E1E1E1" }}>

                <div style={{ padding: "3rem" }}>

                    <div style={{ 'display': 'flex', 'justifyContent': 'space-between' }}>
                        <h2>Shopping Cart</h2>
                        <CartBadge style={{ marginBottom: "10px" }}/>
                    </div>

                    <Divider style={{ marginTop: "20px" }} />
                    
                    <div style={{ marginBottom: "8px" }}>
                        <table className='calc-line-table' style={{ width: "100%" }}>
                            <thead>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ textAlign: "left", fontSize: "16px", fontWeight: "bold", fontSize: "20px", marginBottom: "15px" }}>
                                        Product
                                    </td>
                                    <td style={{ textAlign: "right", fontSize: "16px", fontSize: "20px", fontWeight: "bold" }}>
                                        Price
                                    </td>
                                </tr>
                            </tbody>
                        </table>   
                    </div> 

                    {productsCount === 0 ?
                        <div style={{ height: "40vh" }}>
                            <table className='calc-line-table' style={{ width: "100%" }}>
                                <thead>
                                </thead>
                                <tbody>
                                    <tr>
                                        {/* LIST OF CUSTOMER CART ITEMS */}
                                        <td style={{ textAlign: "left", fontSize: "16px", color: "grey" }}>
                                            There are no items currently in your cart!
                                        </td>
                                        <td style={{ textAlign: "right", fontSize: "16px", fontWeight: "bold" }}>
                                            $0.00
                                        </td>
                                    </tr>
                                </tbody>
                            </table>   
                        </div>
                    :
                        <div style={{ height: "40vh" }}>
                            <table className='calc-line-table' style={{ width: "100%" }}>
                                <thead>
                                </thead>
                                    {/* LIST OF CUSTOMER CART ITEMS */}
                                    {cart.items.map((currentProduct, idx) => (
                                        <tbody>
                                            <tr>
                                                <td style={{ textAlign: "left", fontSize: "16px", color: "grey" }}>
                                                    {getProductData(currentProduct.id).title} x{currentProduct.quantity}
                                                    <Tooltip target=".remove-button" content="Remove Item?" />
                                                    <Button icon='pi pi-times' rounded text severity="danger" aira-label="Cancel" size="small" className="remove-button"
                                                    onClick={() => cart.deleteFromCart(currentProduct.id)}
                                                    style={{ width: "1px", height: "1px", marginLeft: "5px" }}
                                                    />
                                                </td>
                                                <td style={{ textAlign: "right", fontSize: "16px", fontWeight: "bold" }}>
                                                    ${getProductData(currentProduct.id).price}
                                                </td>
                                            </tr>
                                        </tbody>
                                    ))}
                            </table>   
                        </div>
                    } 

                    <Divider />
                    <div className='promo-wrapper' style={{ display: "flex" }}>
                        <InputText className='promo-input' placeholder="Discount Code" style={{ width: "80%", marginRight: "10px" }} />
                        <Button label='Apply' rounded severity="info" style={{ width: "17.5%" }} />
                    </div>
                    <Divider />
                    <table className='calc-line-table' style={{ width: "100%" }}>
                        <thead>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ textAlign: "left", fontSize: "14px", color: "grey" }}>
                                    Subtotal
                                </td>
                                <td style={{ textAlign: "right", fontSize: "14px", fontWeight: "bold" }}>
                                    ${cart.getTotalCost().toFixed(2)}
                                </td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: "left", fontSize: "14px", color: "grey" }}>
                                    Discount
                                </td>
                                <td style={{ textAlign: "right", fontSize: "14px", fontWeight: "bold" }}>
                                    -$0.00
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <Divider />
                    <table className='reccur-line-table' style={{ width: "100%" }}>
                        <thead>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ textAlign: "left", fontSize: "14px", color: "grey" }}>
                                    <span>
                                        Recurring Totals 
                                    </span>
                                    <Tooltip target='.explanation-badge' position='right' >
                                        The amount that you will be charged every payment cycle (yearly or monthly).
                                    </Tooltip>
                                    <Badge value="?" className="explanation-badge" style={{ marginLeft: "7.5px" }} />
                                </td>
                                <td style={{ textAlign: "right", fontSize: "14px", fontWeight: "bold", display: "flex", flexDirection: "column" }}>
                                    <span>
                                        {cart.items.map((currentProduct, idx) => (
                                            <>
                                            {((currentProduct.id === "price_1NFkBvE90bFljz7QS7Ejo4SM") || (currentProduct.id === "price_1NFkCAE90bFljz7QHVC7RfUS")) ?
                                                `$${getProductData(currentProduct.id).price} /`
                                            :
                                                '--'
                                            }
                                            </>
                                        ))}
                                    </span>
                                    <span>
                                        {cart.items.map((currentProduct, idx) => (
                                            <>
                                            {((currentProduct.id === "price_1NFkBvE90bFljz7QS7Ejo4SM") || (currentProduct.id === "price_1NFkCAE90bFljz7QHVC7RfUS")) ?
                                                getProductData(currentProduct.id).subscriptionType
                                            :
                                                '--'
                                            }
                                            </>
                                        ))}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <Divider />
                    <table className='total-line-table' style={{ width: "100%" }}>
                        <thead>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ textAlign: "left", fontSize: "18px", color: "grey" }}>
                                    Total
                                </td>
                                <td style={{ textAlign: "right" }}>
                                    <span style={{ fontSize: "14px", marginRight: "5px", color: "grey" }}>
                                        USD 
                                    </span>
                                    <span style={{ fontSize: "24px", fontWeight: "bold" }}>
                                        ${cart.getTotalCost().toFixed(2)}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>

            </div>


        </div>

    )
}

export default Checkout;