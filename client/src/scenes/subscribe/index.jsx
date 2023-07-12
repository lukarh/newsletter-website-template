import { useState, useEffect } from "react"; 

import axios from "axios";

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';

import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

import AnnualCard from "../../components/subscriptionCards/annualCard";
import MonthlyCard from "../../components/subscriptionCards/monthlyCard";
import BiannualCard from "../../components/subscriptionCards/biannualCard";

const Subscribe = () => {
    const [isProcessing, setIsProcessing] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [isMonthlySelected, setIsMonthlySelected] = useState(false)
    const [isAnnuallySelected, setIsAnnuallySelected] = useState(false)
    const [isBiannuallySelected, setisBiannuallySelected] = useState(false)

    // use 2 hooks available in Stripe.JS so that we can interact with CardElement and get reference to details inside
    const stripe = useStripe() // hook that gives us access to a resolved stripe object, which we passed through using the stripePromise and the Elements provider
    const elements = useElements() // hook that locates and access mounted stripe elements on the page

    const [userData, setUserData] = useState(undefined)


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/users/profile", { withCredentials: true })
                setUserData(response.data.user)

                console.log("The account response", response.data.user)
            } catch (error) {

            }
        }

        fetchUserData()

    }, [])

    const handleSubmit = async (e) => {
        setIsProcessing(true)
        setErrorMessage('')

        e.preventDefault() // prevent the default behavior to refresh or redirect page during form submission

        // stripe & element need to be defined before processing payment
        if (!stripe || !elements) {
            return
        }

        // get card info and create payment method for subscription
        const cardElement = elements.getElement(CardElement)

        const name = userData.first_name + " " + userData.last_name
        const email = userData.email
        
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: {
                name,
                email,
            }
        })

        if (error) {
            setErrorMessage(error)
            setIsProcessing(false)
        }

        if (!paymentMethod) {
            setErrorMessage('Please make sure to enter all of your payment credentials.')
            setIsProcessing(false)
        }

        const priceId = isMonthlySelected
            ? 'price_1NSVChE90bFljz7QCTqM1uS6'
            : isAnnuallySelected
            ? 'price_1NTAkeE90bFljz7QFb3qByDk'
            : isBiannuallySelected
            ? 'price_1NSVD5E90bFljz7QBSHqBldd'
            : '';

        try {
            const requestData = {
                name: name,
                email: email,
                paymentMethod: paymentMethod,
                priceId: priceId,
            }

            const { data } = await axios.post('http://localhost:4000/api/stripe/subscribe', requestData, { withCredentials: true })

            console.log('Subscription created:', data.subscription)
            setIsProcessing(false)

        } catch (error) {
            setErrorMessage(error.response.data.message)
            setIsProcessing(false)
        }

    }

    const chooseMonthlyPlan = () => {
        setIsMonthlySelected(!isMonthlySelected)
        setIsAnnuallySelected(false)
        setisBiannuallySelected(false)
    }
    
    const chooseAnnualPlan = () => {
        setIsMonthlySelected(false)
        setIsAnnuallySelected(!isAnnuallySelected)
        setisBiannuallySelected(false)
    }

    const chooseBiannualPlan = () => {
        setIsMonthlySelected(false)
        setIsAnnuallySelected(false)
        setisBiannuallySelected(!isBiannuallySelected)
    }

    return (
        <div className="container">
            <div className="main-content-alt"> 
                <h1 className="title">Choose your Subscription Plan.</h1>
                <p className="subtitle" style={{ fontSize: "20px" }}>Feel free to cancel anytime.</p>
                <div className="cards-container" style={{ display: "flex", flexDirection: "row", justifyContent: "center", padding: "1rem", paddingBottom: "2rem", width: "70%" }}>

                        <div>
                            <MonthlyCard isMonthlySelected={isMonthlySelected} chooseMonthlyPlan={chooseMonthlyPlan} />
                        </div>
                        <div style={{ marginLeft: "3rem", marginRight: "3rem" }}>
                            <AnnualCard isAnnuallySelected={isAnnuallySelected} chooseAnnualPlan={chooseAnnualPlan} />
                        </div>
                        <div>
                            <BiannualCard isBiannuallySelected={isBiannuallySelected} chooseBiannualPlan={chooseBiannualPlan} />
                        </div>

                </div>

                <div className="card-element-container">
                    <CardElement style={{ border: "3px solid black" }} />
                </div>

                <div style={{ display: "flex", flexDirection: "column", padding: "0.75rem" }}>
                    <Button className="subscribe-btn" label="Subscribe" onClick={handleSubmit} 
                    disabled={isProcessing || (!isMonthlySelected && !isBiannuallySelected && !isAnnuallySelected)} 
                    />
                </div>

                {
                    isProcessing ?
                    <ProgressSpinner style={{ width: '50px', height: '50px', paddingBottom: "2rem" }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
                    :
                    <></>
                }

                {
                    (errorMessage !== '') ? 
                    <small className="p-error" style={{ display: "block", width: "20%", paddingBottom: "0.25rem" }} >{errorMessage}</small> 
                    : <></>
                }

                <p>By subscribing, you consent to our <a href='/home'>Terms of Service</a> and <a href='/home'>Privacy Policy</a>.</p>
                <p>We use your email to provide you with news, updates, and promotions. You can opt out anytime.</p>
                <p style={{ fontWeight: "bold" }}>Secure Payment by <a href="https://stripe.com/" >Stripe</a></p>
            </div>

        </div>
    )
}

export default Subscribe;