import { useEffect, useState } from "react";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { Divider } from "primereact/divider";

import CheckoutForm from "./CheckoutForm";

function Payment(props) {
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        fetch("http://localhost:4000/config").then(async (r) => {
            const { publishableKey } = await r.json()
            setStripePromise(loadStripe(publishableKey))

            console.log(publishableKey, 'the publishable key')
    })}, []);

    useEffect(() => {
    fetch("http://localhost:4000/create-payment-intent", {
        method: "POST",
        body: JSON.stringify({}),
    }).then(async (result) => {
        console.log('the result', result)
        var { clientSecret } = await result.json()
        console.log(clientSecret, 'the secret')
        setClientSecret(clientSecret)
    })}, []);

  return (
    <>
      <h1>Checkout</h1>
      <Divider />
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;