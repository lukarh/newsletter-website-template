import './App.css';
import './styles/News.css';
import './styles/Shop.css';
import './styles/Subscribe.css';

import Topbar from "./scenes/global/Topbar";

import Home from "./scenes/home";
import Shop from "./scenes/shop";
import Login from "./scenes/login";
import About from "./scenes/about";
import Verify from "./scenes/verify";
import Success from "./scenes/success"
import Register from "./scenes/register";
import NotFound from "./scenes/notFound";
import Checkout from "./scenes/checkout";
import Subscribe from "./scenes/subscribe";
import VerifyEmail from "./scenes/verifyEmail";
import ForgotPassword from "./scenes/forgotPassword";

import Account from "./scenes/account";

import Footer from "./components/Footer";

import AuthProvider from "./contexts/AuthContext";
import CartProvider from "./contexts/CartContext";

import axios from "axios";

import { Routes, Route } from "react-router-dom"; // BrowserRouter, Link

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import React, { useState, useEffect } from 'react';

import "primereact/resources/themes/mdc-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function App() {

  const [stripePromise, setStripePromise] = useState(null)
  
  useEffect(() => {
    const fetchStripePromise = async () => {
      const response = await axios.get("http://localhost:4000/api/stripe/config", { withCredentials: true })
      const { publishableKey } = response.data
      console.log("The Publishable Stripe Key:", publishableKey)
      setStripePromise(loadStripe(publishableKey))
    }

    fetchStripePromise()

  }, []);

  return (
    <div className="app">
      <main className="content">
        <AuthProvider>
        <CartProvider>
        {/* <Topbar /> */}
        <Elements stripe={stripePromise} >
        <div className='page-content'> 
          <Routes>
            <Route exact path='/home' element={<Home />}></Route>
            <Route exact path='/about' element={<About />}></Route>
            <Route exact path='/shop' element={<Shop />}></Route>
            <Route exact path='/Success' element={<Success />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path="/forgot-password" element={<ForgotPassword />} />
            <Route exact path="/verify" element={<Verify />} />
            <Route exact path="/verify-email" element={<VerifyEmail />} />
            <Route exact path="/account" element={<Account />} />
            <Route exact path="/checkout" element={<Checkout />} />
            <Route exact path='/choose-subscription' element={<Subscribe />} />
            <Route exact path="*" element={<NotFound />} />
          </Routes>
          <Footer/>
        </div>
        </Elements>
        </CartProvider>
        </AuthProvider>
      </main>
    </div>
  )
}

export default App;

// const [clientSecret, setClientSecret] = useState("")

  // useEffect(() => {
  //   fetch("http://localhost:4000/create-payment-intent", {
  //     method: "POST",
  //     body: JSON.stringify({}),
  //   }).then(async (result) => {
  //     console.log('the result', result)
  //     var { clientSecret } = await result.json()
  //     console.log(clientSecret, 'the secret')
  //     setClientSecret(clientSecret)
  //   });
  // }, []);