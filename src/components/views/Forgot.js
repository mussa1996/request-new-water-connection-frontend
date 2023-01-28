import { useState } from "react";
import { Link } from "react-router-dom";
import Form from '../../utilities/Forms'
import {forget} from '../../actions/ForgetPassAction'
import { connect } from 'react-redux'
import cogoToast from 'cogo-toast';
const Forgot = (props) => {
    let [state, setState] = useState({})
    const [email, setEmail] = useState('');
    const [validate, setValidate] = useState({});
    const token  =localStorage.getItem('resetToken')
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.id]:e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        validateforgotPassword()
        props.forGet(state)
        alert('Reset password link is sent to '+state.email);
        props.history.push('/login')


        
    }
// const Forgot = () => {



    const validateforgotPassword = () => {
        let isValid = true;

        let validator = Form.validator({
            email: {
                value: email,
                isRequired: true,
                isEmail: true
            }
        });

        if (validator !== null) {
            setValidate({
                validate: validator.errors
            })

            isValid = false
        }
        return isValid;
    }

  

    return (
        <div className="row g-0 auth-wrapper">
            <div className="col-12 col-md-5 col-lg-6 h-100 auth-background-col">
                <div className="auth-background-holder"></div>
                <div className="auth-background-mask"></div>
            </div>

            <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center">
                <div className="d-flex flex-column align-content-end">
                    <div className="auth-body mx-auto">
                        <p>Forgot Password</p>
                        <div className="auth-form-container text-start">
                            <form className="auth-form" method="POST" onSubmit={handleSubmit} autoComplete={'off'}>
                                <div className="email mb-3">
                                    <input type="email"
                                        className={`form-control ${validate.validate && validate.validate.email ? 'is-invalid ' : ''}`}
                                        id="email"
                                        name="email"
                                        // value={email}
                                        placeholder="Email"
                                        onChange={handleChange}
                                        // onChange={(e) => setEmail(e.target.value)}
                                    />

                                    <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.email) ? 'd-block' : 'd-none'}`} >
                                        {(validate.validate && validate.validate.email) ? validate.validate.email[0] : ''}
                                    </div>
                                </div>
                                
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary w-100 theme-btn mx-auto">Forgot Password</button>
                                </div>
                            </form>

                            <hr />
                            <div className="auth-option text-center pt-2"><Link className="text-link" to="/login" >Back to Login</Link></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

// export default Forgot;
const mapDispatchToProps = (dispatch) => {
    return {
        forGet: (Credential)=>dispatch(forget(Credential))
    }
}
const mapStateToProps = (state) => {
    return {
        login:state.login
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (Forgot);