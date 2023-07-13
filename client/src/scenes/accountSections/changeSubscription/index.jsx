import { useState, useEffect } from "react";

import axios from "axios";

import { Skeleton } from "primereact/skeleton";

import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const ChangeSubscription = () => {
    const [isProcessing, setIsProcessing] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [userCardBrand, setUserCardBrand] = useState('')
    const [userSubscriptionData, setUserSubscriptionData] = useState(undefined)

    const cardBrandImage = (userCardBrand === 'mastercard') ?
        "https://www.mastercard.com/content/dam/public/brandcenter/en/logo-black.png"
        : 
        (userCardBrand === 'discover') ?
        "https://i.imgur.com/ewcDB1Y.jpg"
        :
        (userCardBrand === 'visa') ?
        "https://i.imgur.com/jGyySgK.jpg"
        :
        (userCardBrand === 'american express') ?
        "https://i.imgur.com/2bz8kym.png" 
        :
        (userCardBrand === 'jcb') ?
        "https://i.imgur.com/XE5W2GY.png"
        :
        ""

    useEffect(() => {
        const fetchUserSubscriptionData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/stripe/subscription-status", { withCredentials: true })
                setUserSubscriptionData(response.data.subscription)
                setUserCardBrand(response.data.subscription.currentPaymentMethodBrand)

            } catch (error) {
                console.log(error)
            }
        }

        fetchUserSubscriptionData()
    }, [])

    return (
        <>
            <div className="content">
                {/* SECTION HEADER */}
                <div className='title'>
                    <h1>
                        Subscription Status
                        <i className="pi pi-wallet" style={{ fontSize: "1.25rem", paddingLeft: ".75rem" }}></i>
                    </h1>
                </div>

                <div>
                    <p className='subtitle'>
                        Review or change the current subscription status on your account.
                    </p>
                </div>

                <div className='col-content'>

                    {/* CURRENT PLAN INFORMATION */}
                    <div className="sub-body-container">
                        <h3 className="sub-body-header">
                            Current Plan
                        </h3>
                        <div className="sub-body-container-desc"> 
                            {
                                userSubscriptionData ?
                                <p className="sub-body-info">
                                   {userSubscriptionData.currentPlan} until {userSubscriptionData.nextPaymentDate}
                                </p>
                                :
                                <Skeleton width="100%" height="1.85rem" />
                            }
                            {
                                (userSubscriptionData && userSubscriptionData.active && (!userSubscriptionData.isExpiring || userSubscriptionData.upcomingSubscription)) ?
                                <a href='/cancel-subscription' className="sub-hyperlink">Cancel Subscription</a>
                                :
                                <a className="sub-hyperlink-inactive">Cancel Subscription</a>
                            }
                            {/* <a href='/cancel-subscription' className="sub-hyperlink">Cancel Subscription</a> */}
                            
                        </div>
                    </div>

                    {/* NEXT PAYMENT INFORMATION */}
                    <div className="sub-body-container">
                        <h3 className="sub-body-header">
                            Next Payment
                        </h3>
                        <div className="sub-body-container-desc"> 
                            {
                                userSubscriptionData ?
                                <p className="sub-body-info">
                                    {
                                        (userSubscriptionData.isExpiring && !userSubscriptionData.upcomingSubscription)
                                        ?
                                        `Your ${userSubscriptionData.currentPlan} is set to expire on ${userSubscriptionData.nextPaymentDate}.`
                                        :
                                        `On ${userSubscriptionData.nextPaymentDate} you will be charged ${userSubscriptionData.amountDue} for the ${userSubscriptionData.nextPlan}.`
                                    }
                                </p>
                                :
                                <Skeleton width="100%" height="1.85rem" />
                            }
                            {/* <a href='/choose-subscription' className="sub-hyperlink">Update Subscription Plan</a> */}
                        </div>
                    </div>

                    {/* PAYMENT METHOD INFORMATION */}
                    <div className="sub-body-container">
                        <h3 className="sub-body-header">
                            Payment Method
                        </h3>
                        <div className="sub-body-container-desc"> 
                            {
                                (userSubscriptionData) ?
                                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                                    <img src={cardBrandImage} style={{ height: "15px", marginRight: "5px" }}/>
                                    <p style={{ alignItems: "center" }}>
                                          •••• {userSubscriptionData.lastFourDigits}
                                    </p>
                                </div>
                                :
                                <Skeleton width="100%" height="1.85rem" />
                            }
                            <a href='/change-payment' className="sub-hyperlink">Change Payment Method</a>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default ChangeSubscription;