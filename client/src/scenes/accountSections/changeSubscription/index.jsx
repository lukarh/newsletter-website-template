const ChangeSubscription = () => {
    return (
        <div className="main-content-section">
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
                        <p className="sub-body-info">Your current subscription plan.</p>
                        <a href='/home' className="sub-hyperlink">Cancel Subscription</a>
                    </div>
                </div>

                {/* NEXT PAYMENT INFORMATION */}
                <div className="sub-body-container">
                    <h3 className="sub-body-header">
                        Next Payment
                    </h3>
                    <div className="sub-body-container-desc"> 
                        <p className="sub-body-info">On December 31st, 1969 you will be charged $20.00 for 1 month of Premium Plan.</p>
                        <a href='/home' className="sub-hyperlink">Update Subscription Plan</a>
                    </div>
                </div>

                {/* PAYMENT METHOD INFORMATION */}
                <div className="sub-body-container">
                    <h3 className="sub-body-header">
                        Payment Method
                    </h3>
                    <div className="sub-body-container-desc"> 
                        <p className="sub-body-info">Current payment method...</p>
                        <a href='/home' className="sub-hyperlink">Change Payment Method</a>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default ChangeSubscription;