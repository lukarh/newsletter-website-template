import { useState, useEffect } from "react";

import axios from "axios";

import { Button } from "primereact/button";

const VerifyEmail = () => {
    const [isProcessing, setIsProcessing] = useState(true)
    const [showVerifiedScreen, setShowVerifiedScreen] = useState(false)

    useEffect(() => {
        const verifyEmail = async () => {
            setIsProcessing(true)

            try {
                const urlSearchParams = new URLSearchParams(window.location.search);
                const token = urlSearchParams.get('token');
                const response = await axios.put(`http://localhost:4000/api/verify/email`, { verifyToken: token }, { withCredentials: true })
                console.log('the response status', response.status)
                if (response.status === 200) {
                    setShowVerifiedScreen(true)
                    setIsProcessing(false)
                } 

            } catch (error) {
                setShowVerifiedScreen(false)
                setIsProcessing(false)
            }
        }

        verifyEmail()
    }, [])

    const gotoHomePage = () => {
        setIsProcessing(false)
        window.location.href = '/home'
        setIsProcessing(true)
        return
    }

    const gotoLoginPage = () => {
        setIsProcessing(false)
        window.location.href = '/login'
        setIsProcessing(true)
        return
    }

    console.log(showVerifiedScreen, 'show verify screen?')

    return (
        <div className="container-alt">
            
            <div className="main-content-alt">

                {
                    isProcessing ?
                    <></>
                    :
                    showVerifiedScreen 
                    ?
                    <>
                        <div>
                            <h1 className="auth-header">
                                Successfully changed email! 🎉
                            </h1>
                        </div>

                        <div>
                            <p className="auth-description">
                                Please find a verification email in your inbox so that we can verify your new account.
                            </p>
                        </div>

                        <div className="col-content" style={{ width: '50%' }}>
                            <Button className='btn' label='Return to the Home Page' onClick={gotoHomePage} disabled={isProcessing} />
                            <Button className='btn' label='Log-in now!' onClick={gotoLoginPage} disabled={isProcessing} />
                        </div>
                    </>
                    :
                    <>
                        <div>
                            <h1 className="auth-header">
                                Unable to verify your email change. ❌
                            </h1>
                        </div>

                        <div>
                            <p className="auth-description">
                                Please find a verification email in your inbox so that we can verify your new account.
                            </p>
                        </div>

                        <div className="col-content" style={{ width: '50%' }}>
                            <Button className='btn' label='Return to the Home Page' onClick={gotoHomePage} disabled={isProcessing} />
                            <Button className='btn' label='Log-in now!' onClick={gotoLoginPage} disabled={isProcessing} />
                        </div>
                    </>
                }

            </div>

        </div>
    )
}

export default VerifyEmail;