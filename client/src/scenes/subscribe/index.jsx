import { Card } from 'primereact/card';
import { useState } from "react"; 

import { Button } from 'primereact/button';

import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const Subscribe = () => {
    const [loading, setLoading] = useState(false)
    const [isMonthlySelected, setIsMonthlySelected] = useState(false)
    const [isAnnuallySelected, setIsAnnuallySelected] = useState(false)
    const [isBianuallySelected, setIsBianuallySelected] = useState(false)

    const stripe = useStripe() // hook that gives us access to a resolved stripe object, which we passed through using the stripePromise and the Elements provider
    const elements = useElements() // hook that locates and access mounted stripe elements on the page

    // Monthly 
    const chooseMonthlyPlan = () => {
        setLoading(true)
        setIsMonthlySelected(!isMonthlySelected)
        setIsAnnuallySelected(false)
        setIsBianuallySelected(false)
        setLoading(false)
    }

    const monthlyHeader = (
        <img alt="Card" src="https://i.imgur.com/mBSHlYk.png"
         style={{ borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }}
        />
    )

    const monthlyFooter = () => (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Button className="select-plan-btn" label="Choose Plan" icon="pi pi-check" rounded
             loading={loading} onClick={chooseMonthlyPlan}/>
        </div>
    )
    
    // Annually
    const chooseAnnualPlan = () => {
        console.log("monthly plan state:", isMonthlySelected)
        setIsMonthlySelected(false)
        setIsAnnuallySelected(!isAnnuallySelected)
        setIsBianuallySelected(false)
    }

    const annuallyHeader = (
        <img alt="Card" src="https://i.imgur.com/p17D7ca.png"
         style={{ borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }}
        />
    )

    const annuallyFooter = () => (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Button className="select-plan-btn" label="Choose Plan" icon="pi pi-check" rounded
             loading={loading} onClick={chooseAnnualPlan} />
        </div>
    )

    // Bi-annually
    const chooseBiannualPlan = () => {
        console.log("monthly plan state:", isMonthlySelected)
        setIsMonthlySelected(false)
        setIsAnnuallySelected(false)
        setIsBianuallySelected(!isBianuallySelected)
    }

    const biannuallyHeader = (
        <img alt="Card" src="https://i.imgur.com/tlZiCfS.png"
         style={{ borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }}
        />
    )

    const biannuallyFooter = () => (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Button className="select-plan-btn" label="Choose Plan" icon="pi pi-check" rounded
             loading={loading} onClick={chooseBiannualPlan} />
        </div>
    )

    return (
        <div className="container">
            <div className="main-content-alt"> 
                <h1 className="title">Choose your Subscription Plan.</h1>
                <p className="subtitle" style={{ fontSize: "20px" }}>Feel free to cancel anytime.</p>
                <div className="cards-container" style={{ display: "flex", flexDirection: "row", justifyContent: "center", padding: "1rem", paddingBottom: "3rem", width: "70%" }}>

                        <div>
                            <Card title="Basic / Monthly" subTitle="$4.99 / month" header={monthlyHeader} // footer={monthlyFooter}
                            className={isMonthlySelected ? 'card-selected' : ''} onClick={chooseMonthlyPlan} 
                            style={{ width: "325px", marginTop: "4rem", borderRadius: "15px" }}
                            >
                                <p className="m-0">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae 
                                    numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
                                </p>
                            </Card>
                        </div>
                    
                        <div>
                            <Card title="Premium / Annually" subTitle="$49.99 / year" header={annuallyHeader} // footer={annuallyFooter}
                            className={isAnnuallySelected ? 'card-selected' : ''} onClick={chooseAnnualPlan} 
                            style={{ width: "325px",marginLeft: "3rem", marginRight: "3rem", marginBottom: "4rem", borderRadius: "15px" }}
                            >
                                <p className="m-0">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae 
                                    numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
                                </p>
                            </Card>
                        </div>

                        <div>
                            <Card title="Pro / Bi-Annually" subTitle="$26.99 / 6 months" header={biannuallyHeader} // footer={biannuallyFooter}
                            className={isBianuallySelected ? 'card-selected' : ''} onClick={chooseBiannualPlan} 
                            style={{ width: "325px", marginTop: "4rem", borderRadius: "15px" }} 
                            >
                                <p className="m-0">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae 
                                    numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
                                </p>
                            </Card>
                        </div>

                </div>

                <div style={{ width: "500px", padding: "1rem" }}>
                    <CardElement style={{ border: "3px solid black" }} />
                </div>

                <div style={{ padding: "0.5rem" }}>
                    <Button className="sub-btn" label="Subscribe"/>
                    
                </div>
                <p>By subscribing, you consent to our <a href='/home'>Terms of Service</a> and <a href='/home'>Privacy Policy</a>.</p>
                <p>We use your email to provide you with news, updates, and promotions. You can opt out anytime.</p>
                <p style={{ fontWeight: "bold" }}>Secure Payment by <a href="https://stripe.com/" >Stripe</a></p>
            </div>

        </div>
    )
}

export default Subscribe;