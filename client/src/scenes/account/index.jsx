import { useEffect, useState } from "react";

import axios from "axios";

import { Divider } from "primereact/divider";

import Support from "../accountSections/support"
import Overview from "../accountSections/overview";
import ChangeEmail from "../accountSections/changeEmail";
import Notifications from "../accountSections/notifications";
import ChangePassword from "../accountSections/changePassword";
import ChangeSubscription from "../accountSections/changeSubscription";

const Account = () => {
    const [userData, setUserData] = useState(undefined)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/users/profile", { withCredentials: true })
                setUserData(response.data.user)

                console.log("The account response", response.data.user)
            } catch (error) {

            }
        }

        fetchUserData()

    }, [])

    return (
        <div className="container">

            <div className="main-content-alt">

                {
                    (userData)
                    ?
                    <>
                        {/* ACCOUNT OVERVIEW SECTION */}
                        <Overview name={userData.first_name + " " + userData.last_name} email={userData.email} phone={userData.phone}/>

                        {/* SUBSCRIPTION SECTION */}
                        <Divider />
                        <ChangeSubscription />

                        {/* NOTIFICATION SETTINGS */}
                        <Divider />
                        <Notifications />

                        {/* CHANGE EMAIL */}
                        <Divider />
                        <ChangeEmail />

                        {/* CHANGE PASSWORD */}
                        <Divider />
                        <ChangePassword />

                        {/* SUPPORT SETTINGS */}
                        <Divider />
                        <Support />
                    </>
                    :
                    <>
                    </>
                }

            </div> 

        </div>
    )
}

export default Account;