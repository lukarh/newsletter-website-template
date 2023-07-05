import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';

const ForgotPassword = () => {

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validate: async (data) => {
            let errors = {};

            if (!data.email) {
                errors.email = 'Email is required.';
            }

            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
                errors.email = 'Invalid email address. e.g. example@email.com';
            }

            return errors;
        },

        onSubmit: (data) => {
            

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
                            Reset your password.
                        </h1>
                    </div>

                    <div>
                        <p className="auth-description">
                            Enter the email associated with your account for instructions.
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

                        <Button className="auth-button" label="Submit" />
                    </div>

                </div>

                <a className="auth-hyperlink" href='/login' style={{ marginTop: "10px", marginBottom: "15px" }}>Remember your password? Log in.</a>
                <a className="auth-hyperlink" href='/register'>Don't have an account? Sign Up.</a>
                
            </div>
            
        </div>
    )
}

export default ForgotPassword;