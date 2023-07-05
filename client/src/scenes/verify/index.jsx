import { useState, useEffect } from "react";

import axios from "axios";

import { Button } from "primereact/button";

const Verify = () => {
    const [isProcessing, setIsProcessing] = useState(true)
    const [showVerifiedScreen, setShowVerifiedScreen] = useState(false)

    useEffect(() => {
        const verifyAccount = async () => {
            setIsProcessing(true)

            try {
                const urlSearchParams = new URLSearchParams(window.location.search);
                const token = urlSearchParams.get('token');
                console.log("Trying to verify account by calling endpoint")
                const response = await axios.put(`http://localhost:4000/api/verify/account`, { verifyToken: token }, { withCredentials: true })
                console.log("Finished called verify account endpoint")
                if (response.status === 200) {
                    setShowVerifiedScreen(true)
                    setIsProcessing(false)
                } 

            } catch (error) {
                setShowVerifiedScreen(false)
                setIsProcessing(false)
            }
        }

        verifyAccount()
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
                                Verified account! 🎉
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
                                Unable to verify your account. ❌
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

export default Verify;