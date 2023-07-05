import { useState } from "react";
import { Button } from "primereact/button";

const Success = () => {
    const [isProcessing, setIsProcessing] = useState(false)

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

    return (
        <div className="container-alt">
            
            <div className="main-content-alt">
                
                <div>
                    <h1 className="auth-header">
                        Thank you for creating an account with us! 🎉
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

            </div>

        </div>
    )
  }
    
  export default Success;