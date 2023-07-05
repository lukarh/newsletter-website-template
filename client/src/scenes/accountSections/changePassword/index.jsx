import axios from 'axios';

import { useState, useRef } from 'react';

import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import { classNames } from 'primereact/utils';
import { Password } from 'primereact/password';

const ChangePassword = () => {
    const [isProcessing, setIsProcessing] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const successMessage = useRef(null)

    const addMessages = () => {
        successMessage.current.show([
            { severity: "success", detail: "You have successfully changed your password!", sticky: true, closable: false }
        ])
    }

    const clearMessages = () => {
        successMessage.current.clear()
    }

    const formik = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        },
        validate: async (data) => {
            let errors = {};

            if (!data.oldPassword) {
                errors.oldPassword = 'Please type in your previous password.'
            }

            if (!data.newPassword) {
                errors.newPassword = 'Please type in a new password.'
            } 

            else if (data.oldPassword === data.newPassword) {
                errors.newPassword = 'Please type in a password that is not the same as your old password.'
            } 


            if (!data.confirmNewPassword) {
                errors.confirmNewPassword = 'Please retype your new password.'
            } 
            
            else if (data.newPassword !== data.confirmNewPassword) {
                errors.confirmNewPassword = 'Your passwords must match.'
            }

            return errors;
        },

        onSubmit: async (data) => {
            setIsProcessing(true)
            setErrorMessage('')
            clearMessages()

            const requestData = {
                oldPassword: data.oldPassword,
                newPassword: data.newPassword
            }

            if ((Object.keys(formik.errors).length > 0) || (Object.values(formik.values)).includes("") || (data.newPassword !== data.confirmNewPassword)) {
                setErrorMessage('Invalid Inputs. Please make sure you correctly typed your old and new password.')
                setIsProcessing(false)
                return
            }

            try {
                const response = await axios.put(`http://localhost:4000/api/users/change-password`, requestData, { withCredentials: true })

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
                    Change Password
                    <i className="pi pi-key" style={{ fontSize: "1.25rem", paddingLeft: ".75rem" }}></i>
                </h1>
            </div>

            <div>
                <p className='subtitle'>
                    Enter your new password and previous password below.
                </p>
            </div>

            <div className="forgot-password-container">

                <div className="old-password-input">
                    <div className="field">
                        <span className="p-float-label">
                            <Password id="oldPassword" name="oldPassword" value={formik.values.oldPassword} toggleMask onChange={formik.handleChange} onBlur={formik.handleBlur} 
                                className={classNames({ 'p-invalid': isFormFieldValid('oldPassword'), 'p-valid': !isFormFieldValid('oldPassword') })} 
                                style={{ '--p-password-panel-padding': '0', width: "100%" }} inputStyle={{ width: "100%" }} feedback={false} />
                            <label htmlFor="oldPassword">Old Password</label>
                        </span>
                        {getFormErrorMessage('oldPassword')}
                    </div>
                </div>


                <div className="new-password-input">
                    <div className="field">
                        <span className="p-float-label">
                            <Password id="newPassword" name="newPassword" value={formik.values.newPassword} toggleMask onChange={formik.handleChange} onBlur={formik.handleBlur} 
                                className={classNames({ 'p-invalid': isFormFieldValid('newPassword'), 'p-valid': !isFormFieldValid('newPassword') })} 
                                style={{ '--p-password-panel-padding': '0', width: "100%" }} inputStyle={{ width: "100%" }} feedback={false} />
                            <label htmlFor="newPassword">New Password</label>
                        </span>
                        {getFormErrorMessage('newPassword')}
                    </div>
                </div>

                <div className="confirm-new-password-input">
                    <div className="field">
                        <span className="p-float-label">
                            <Password id="confirmNewPassword" name="confirmNewPassword" value={formik.values.confirmNewPassword} toggleMask onChange={formik.handleChange} onBlur={formik.handleBlur}
                                className={classNames({ 'p-invalid': isFormFieldValid('confirmNewPassword'), 'p-valid': !isFormFieldValid('confirmNewPassword') })} 
                                style={{ '--p-password-panel-padding': '0', width: "100%" }} inputStyle={{ width: "100%" }} feedback={false} />
                            <label htmlFor="confirmNewPassword">Confirm New Password</label>
                        </span>
                        {getFormErrorMessage('confirmNewPassword')}
                    </div>
                </div>

                <Button className="auth-button" label="Change Password" onClick={formik.handleSubmit} disabled={isProcessing} />
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

export default ChangePassword;