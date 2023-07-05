import axios from "axios";

import { createContext, useState, useEffect } from "react";

import Topbar from "../scenes/global/Topbar";

export const AuthContext = createContext({
    isLoggedIn: false,
    handleLogin: () => {}, // we don't define a function within the context, we just declare functions to exist here
    handleLogout: () => {},
    checkIsAuthenticated: () => {},
})

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const getLoginStatus = async () => {

            try {
                const response = await axios.get(`http://localhost:4000/api/auth/login-status`, { withCredentials: true })

                console.log('The Login Status Response:', response)
                setIsLoggedIn(response.data.isLoggedIn)
            } catch (error) {
                console.log(error)
            }
        };
      
        getLoginStatus();
    }, []);

    async function handleLogin (email, password) {
        try {

            const requestData = { email: email, password: password }
            const response = await axios.post(`http://localhost:4000/api/auth/login`, requestData, { withCredentials: true })
            setIsLoggedIn(true)
            return response

        } catch (error) {
            setIsLoggedIn(false)
            return error.response
        }
    }

    async function handleLogout () {
        try {
            const response = await axios.get(`http://localhost:4000/api/auth/logout`, { withCredentials: true })
            const { redirect } = response.data

            if (response.status === 200) {
                setIsLoggedIn(false)
                window.location.href = redirect
            }

        } catch (error) {
            return error.response
        }
    
    }

    function checkIsAuthenticated() {

    }

    const contextValue = {
        isLoggedIn: isLoggedIn,
        handleLogin, 
        handleLogout,
        checkIsAuthenticated,
    }

    return (
        <AuthContext.Provider value={contextValue}>
            <Topbar/>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;