import axios from 'axios';

import { useState, useRef } from 'react';

import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';

const ChangeEmail = () => {
    const [isProcessing, setIsProcessing] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const successMessage = useRef(null)

    const addMessages = () => {
        successMessage.current.show([
            { severity: "success", detail: "Please check your current email to verify this change.", sticky: true, closable: false }
        ])
    }

    const clearMessages = () => {
        successMessage.current.clear()
    }

    const formik = useFormik({
        initialValues: {
            email: '',
        },

        validate: async (data) => {
            let errors = {};

            if (!data.email) {
                errors.email = 'An email is required.'
            }

            return errors;
        },

        onSubmit: async (data) => {
            setIsProcessing(true)
            setErrorMessage('')
            clearMessages()

            const requestData = { email: data.email }
            console.log('the reqdata', requestData)

            try {
                console.log('trying to change email')
                const response = await axios.put(`http://localhost:4000/api/verify/send-email/v2`, requestData, { withCredentials: true })

                if (response.status === 200) {
                    setIsProcessing(false)
                    addMessages()
                    return
                } 
            } catch (error) {
                setErrorMessage(error.response.data.error)
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

        <div className="content">
            {/* SECTION HEADER */}
            <div className='title'>
                <h1>
                    Change Email
                    <i className="pi pi-envelope" style={{ fontSize: "1.25rem", paddingLeft: ".75rem" }}></i>
                </h1>
            </div>

            <div>
                <p className='subtitle'>
                Enter your new email below and we will send a verification email to change it.
                </p>
            </div>

            <div className="email-container">

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

                <Button className="auth-button" label="Change Email" onClick={formik.handleSubmit} disabled={isProcessing} />
                {
                    (errorMessage !== '') ? 
                    <small className="p-error" style={{ display: "block" }} >{errorMessage}</small> 
                    : <></>
                }

            </div>

            <Messages ref={successMessage} />

        </div>
            
    )
}

export default ChangeEmail;