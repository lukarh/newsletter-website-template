import { useState, useEffect, useRef } from "react";

import axios from "axios";

import { useFormik } from 'formik';

import { Button } from "primereact/button";
import { Messages } from 'primereact/messages';
import { InputSwitch } from "primereact/inputswitch";

const Notifications = () => {
    const [isProcessing, setIsProcessing] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const [notificationData, setNotificationData] = useState(undefined)
    const [dailyNotification, setDailyNotification] = useState(false)
    const [weeklyNotification, setWeeklyNotification] = useState(false)
    const [feedbackNotification, setFeedbackNotification] = useState(false)
    const [offersNotification, setOffersNotification] = useState(false)
    const [subsNotification, setSubsNotification] = useState(false)
    const [phoneNotification, setPhoneNotification] = useState(false)

    const notificationHooks = [
        [dailyNotification, setDailyNotification],
        [weeklyNotification, setWeeklyNotification],
        [feedbackNotification, setFeedbackNotification],
        [offersNotification, setOffersNotification],
        [subsNotification, setSubsNotification],
        [phoneNotification, setPhoneNotification]
    ]

    const successMessage = useRef(null)

    const addMessages = () => {
        successMessage.current.show([
            { severity: "success", detail: "Your notification preferences have been saved.", sticky: true, closable: false }
        ])
    }

    const clearMessages = () => {
        successMessage.current.clear()
    }

    useEffect(() => {
        const fetchNotificationData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/users/notifications", { withCredentials: true })

                setDailyNotification(response.data.userNotificationPrefs.daily_notifications)
                setWeeklyNotification(response.data.userNotificationPrefs.weekly_notifications)
                setFeedbackNotification(response.data.userNotificationPrefs.feedbacks_surveys)
                setOffersNotification(response.data.userNotificationPrefs.offers_promotions)
                setSubsNotification(response.data.userNotificationPrefs.account_subscriptions)
                setPhoneNotification(response.data.userNotificationPrefs.phone_notifications)

                setNotificationData(response.data.userNotificationPrefs)

            } catch (error) {
                console.log(error)
            }
        }

        fetchNotificationData()

    }, [])

    const notificationOptions = [
        {
            id: "daily_notifications",
            name: "Daily Newsletter Notifications",
            description: "Receive updates and news about our newsletters daily via email.",
        },
        {
            id: "weekly_notifications",
            name: "Weekly Newsletter Notifications",
            description: "Receive update and summaries about our newsletters weekly via email.",
        },
        {
            id: "feedbacks_surveys",
            name: "Feedback and Surveys",
            description: "Provide feedback and participate in surveys to help us improve.",
        },
        {
            id: "offers_promotions",
            name: "Offers & Promotions",
            description: "Get notified about special offers and promotions.",
        },
        {
            id: "account_subscriptions",
            name: "Account & Subscription Updates",
            description: "Get notified about updates to your account information and subscription status."
        },
        {
            id: "phone_notifications",
            name: "Phone Notifications",
            description: "Receive newsletter updates and account changes directly to your phone."
        }
    ]

    const savePreferences = async () => {
        setIsProcessing(true)
        setErrorMessage('')
        clearMessages()

        const userNotificationPrefs = {
            daily_notifications: dailyNotification,
            weekly_notifications: weeklyNotification,
            feedbacks_surveys: feedbackNotification,
            offers_promotions: offersNotification,
            account_subscriptions: subsNotification,
            phone_notifications: phoneNotification,
        }


        try {
            const response = await axios.put(`http://localhost:4000/api/users/change-notifications`, userNotificationPrefs, { withCredentials: true })

            if (response.status === 200) {
                setIsProcessing(false)
                addMessages()
                return
            } 

        } catch (error) {
            setErrorMessage(error.response.data.error)
            setIsProcessing(false)
            return
        }
    };


    return (     
        <>     
        {
            (notificationData) 
            ?
            <div className="content">

                <div>
                    <h1 className='title'>
                        Notifications
                        <i className="pi pi-bell" style={{ fontSize: "1.25rem", paddingLeft: ".75rem" }}></i>
                    </h1>
                </div>

                <div>
                    <p className='subtitle'>
                        Select the kinds of notifications you get about your activities and recommendations.
                    </p>
                </div>

                <div className="settings-content">
                    {
                        notificationOptions.map((item, index) => (
                            <div className="option-container" key={`notification-${index}`}>
                                <div className="switch-container">
                                    <InputSwitch name={item.id} id={item.id}
                                     checked={notificationHooks[index][0]}
                                     onChange={(e) => notificationHooks[index][1](e.value)}
                                     style={{ marginBottom: "10px" }} />
                                </div>
                                <div className="mini-desc-container">
                                    <h4>{item.name}</h4>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <Button label="Save Preferences" className='auth-button' onClick={savePreferences} disabled={isProcessing} />
                {
                    (errorMessage !== '') ? 
                    <small className="p-error" style={{ display: "block" }} >{errorMessage}</small> 
                    : <></>
                }
                <Messages ref={successMessage} />

            </div>
            :
            <>
            </>
        }
        </>  
    )
}

export default Notifications;