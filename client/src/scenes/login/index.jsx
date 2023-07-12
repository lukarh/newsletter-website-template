import { useState, useContext } from 'react'; 

import axios from 'axios';

import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';

import { AuthContext } from '../../contexts/AuthContext';

const Login = () => {
    const userAuth = useContext(AuthContext)

    const [isProcessing, setIsProcessing] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate: async (data) => {
            let errors = {};

            if (!data.email) {
                errors.email = 'Email is required.';
            }

            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
                errors.email = 'Invalid email address. e.g. example@email.com';
            }

            if (!data.password) {
                errors.password = 'Password is required.';
            }

            return errors;
        },

        onSubmit: async (data) => {
            setIsProcessing(true)
            setErrorMessage('')

            // check if the user has not inputted a valid username and password
            if ((Object.keys(formik.errors).length > 0) || (Object.values(formik.values).includes(""))) {
                setErrorMessage('Please make sure to enter both your username and password.')
                setIsProcessing(false)
                return
            }

            const response = await userAuth.handleLogin(formik.values.email, formik.values.password)
            const { message, redirect } = response.data
            const status = response.status

            if (status === 200) {
                setIsProcessing(false)
                window.location.href = redirect
                return
            } else {
                setErrorMessage(response.data.message)
                setIsProcessing(false)
                return
            }
        }
    })
    
    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name])
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error" style={{ display: "block" }} >{formik.errors[name]}</small>;
    }

    return (
        <div className="container-alt">

            <div className="main-content-auth">

                <div>

                    <div>
                        <h1 className="auth-header">
                            Log in to your account.
                        </h1>
                    </div>

                    <div>
                        <p className="auth-description">
                            Enter the login credentials to your account below for access.
                        </p>
                    </div>

                    <div className="col-content content">

                        <div className="email-input">
                            <div className="field">
                                <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                    <InputText id="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                        className={classNames({ 'p-invalid': isFormFieldValid('email'), 'p-valid': !isFormFieldValid('email') })} />
                                    <label htmlFor="email">Email</label>
                                </span>
                                {getFormErrorMessage('email')}
                            </div>
                        </div>

                        <div className="password-input">
                            <div className="field">
                                <span className="p-float-label">
                                    <Password id="password" name="password" value={formik.values.password} toggleMask onChange={formik.handleChange} onBlur={formik.handleBlur} 
                                        className={classNames({ 'p-invalid': isFormFieldValid('password'), 'p-valid': !isFormFieldValid('password') })} 
                                        style={{ '--p-password-panel-padding': '0', width: "100%" }} inputStyle={{ width: "100%" }} feedback={false} />
                                    <label htmlFor="password">Password</label>
                                </span>
                                {getFormErrorMessage('password')}
                            </div>
                        </div>

                        {/* <Button className="auth-button" label="Login" onClick={() => handleSubmit(formik)} disabled={isProcessing} /> */}
                        <Button className="auth-button" label="Login" onClick={formik.handleSubmit} disabled={isProcessing} />
                        {
                            (errorMessage !== '') ? 
                            <small className="p-error" style={{ display: "block" }} >{errorMessage}</small> 
                            : <></>
                        }

                    </div>

                </div>

                <a className="auth-hyperlink" href='/forgot-password' style={{ marginTop: "10px", marginBottom: "15px" }}>Forgot Password?</a>
                <a className="auth-hyperlink" href='/register'>Don't have an account? Sign Up.</a>

            </div>
            
        </div>
    )
}


export default Login;