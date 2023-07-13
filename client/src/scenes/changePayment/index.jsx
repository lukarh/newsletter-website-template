import { useState } from "react";

import axios from "axios";

import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';

import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const ChangePayment = () => {
    const [isProcessing, setIsProcessing] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    // use 2 hooks available in Stripe.JS so that we can interact with CardElement and get reference to details inside
    const stripe = useStripe() // hook that gives us access to a resolved stripe object, which we passed through using the stripePromise and the Elements provider
    const elements = useElements() // hook that locates and access mounted stripe elements on the page

    const changePaymentMethod = async (e) => {
        setIsProcessing(true)
        setErrorMessage('')

        e.preventDefault() // prevent the default behavior to refresh or redirect page during form submission

        // stripe & element need to be defined before processing payment
        if (!stripe || !elements) {
            return
        }

        // get card info and create payment method for subscription
        const cardElement = elements.getElement(CardElement)
        
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        })

        if (error) {
            setErrorMessage(error)
            setIsProcessing(false)
        }

        if (!paymentMethod) {
            setErrorMessage('Please make sure to enter your payment credentials.')
            setIsProcessing(false)
        }

        try {
            const requestData = {
                paymentMethod: paymentMethod,
            }

            const response = await axios.put("http://localhost:4000/api/stripe/change-payment-method", requestData, { withCredentials: true })

            if (response.status === 200) {
                setErrorMessage('changed payment method')
                setIsProcessing(false)
            }

        } catch (error) {
            setErrorMessage(error.message)
            setIsProcessing(false)
        }
    }

    return (
        <div className="container">

            <div className="main-content-alt" style={{ height: "75vh" }}>

                <div>
                    <h1 className="auth-header">
                        Change your payment method.
                    </h1>
                </div>

                <div>
                    <p className="auth-description">
                        Fill in your card credentials below and press submit to change your current payment method.
                    </p>
                </div>

                <div className="card-element-container">
                    <CardElement style={{ border: "3px solid black" }} />
                </div>

                <Button className="subscribe-btn" label="Submit" onClick={changePaymentMethod} disabled={isProcessing} style={{ marginTop: "25px" }} />

                {
                    (errorMessage !== '') ? 
                    <small className="p-error" style={{ display: "block" }} >{errorMessage}</small> 
                    : <></>
                }
                
                {
                    isProcessing ?
                    <ProgressSpinner />
                    :
                    <></>
                }

            </div>
        
        </div>
    )
}

export default ChangePayment;