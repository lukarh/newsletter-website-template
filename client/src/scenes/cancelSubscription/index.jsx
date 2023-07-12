import { useState, useEffect } from "react";

import axios from "axios";

import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';

import AnnualCard from "../../components/subscriptionCards/annualCard";
import MonthlyCard from "../../components/subscriptionCards/monthlyCard";
import BiannualCard from "../../components/subscriptionCards/biannualCard";

const CancelSubscription = () => {
    const [isProcessing, setIsProcessing] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const [isMonthlySelected, setIsMonthlySelected] = useState(false)
    const [isAnnuallySelected, setIsAnnuallySelected] = useState(false)
    const [isBiannuallySelected, setisBiannuallySelected] = useState(false)

    const [hasMonthlyPlan, setHasMonthlyPlan] = useState(false)
    const [hasAnnualPlan, setHasAnnualPlan] = useState(false)
    const [hasBiannualPlan, setHasBiannualPlan] = useState(false)

    const [userSubscriptionData, setUserSubscriptionData] = useState(false)

    useEffect(() => {
        const fetchUserSubscriptionData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/stripe/subscription-status", { withCredentials: true })

                setUserSubscriptionData(response.data.subscription)

                const currentPlan = response.data.subscription.currentPlan
                const subscriptionStatus = response.data.subscription.active
                const isExpiring = response.data.subscription.isExpiring
                const upcomingSubscription = response.data.subscription.upcomingSubscription

                console.log(subscriptionStatus, isExpiring, 'the statuses', currentPlan)
                console.log(!subscriptionStatus)

                if (!subscriptionStatus || (isExpiring && !upcomingSubscription)) {
                    window.location.href = '/home'
                } else if (currentPlan === '6-month plan') {
                    console.log('i got 6months')
                    setHasBiannualPlan(true)
                } else if (currentPlan === '1-month plan') {
                    setHasMonthlyPlan(true)
                } else if (currentPlan === '1-year plan') {
                    setHasAnnualPlan(true)
                }
                console.log(hasMonthlyPlan, hasAnnualPlan, hasBiannualPlan)

            } catch (error) {

            }
        }
        fetchUserSubscriptionData()
    }, [])

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

    const changeSubscription = async () => {
        setIsProcessing(true)

        setIsProcessing(false)
    }

    const cancelSubscription = async () => {
        setIsProcessing(true)

        try {
            const response = await axios.delete("http://localhost:4000/api/stripe/cancel-subscription", { withCredentials: true })
            if (response.status === 200) {
                window.location.href = '/account'
                setIsProcessing(false)
            } else {
                setErrorMessage(response.data.message)
                setIsProcessing(false)
            }
        } catch (error) {
            setErrorMessage(error.response.data.message)
            setIsProcessing(false)
        }
    }

    return (
        <div className="container">

            <div className="main-content-alt">

                <div>
                    <h1 className="auth-header">
                        Cancel your subsciption.
                    </h1>
                </div>

                <div>
                    <p className="auth-description">
                        Before you go, reconsider other subscription plans or let us know why you're unsubscribing if you want to cancel.
                    </p>
                </div>

                <div className="cards-container" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "1rem", paddingBottom: "3rem", width: "100%", height: "50vh" }}>

                    {
                        userSubscriptionData ?
                        <>
                            {!hasMonthlyPlan ? <MonthlyCard isMonthlySelected={isMonthlySelected} chooseMonthlyPlan={chooseMonthlyPlan} /> : <></>}
                            {!hasAnnualPlan ? <AnnualCard isAnnuallySelected={isAnnuallySelected} chooseAnnualPlan={chooseAnnualPlan} /> : <></>}
                            {!hasBiannualPlan ? <BiannualCard isBiannuallySelected={isBiannuallySelected} chooseBiannualPlan={chooseBiannualPlan} /> : <></>}
                        </>
                        :
                        <div style={{ height: "50vh" }}></div>
                    }

                </div>

                <Button className="subscribe-btn" label="Change Subscription Plan" onClick={changeSubscription} disabled={isProcessing} />
                <Button className="cancel-btn" label="Cancel Subscription" outlined onClick={cancelSubscription} disabled={isProcessing}
                 style={{ marginTop: "10px" }} />

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

export default CancelSubscription