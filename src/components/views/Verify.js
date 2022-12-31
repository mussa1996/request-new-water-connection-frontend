import React,{useState} from 'react';
import '../../assets/scss/App.scss';
import {Link} from 'react-router-dom'
import {verify} from '../../actions/VerifyAction'
import { connect } from 'react-redux'
import cogoToast from 'cogo-toast';

import axios from 'axios';

const Verify = (props) => {
    let [state, setState] = useState('')
    
    const token  =localStorage.getItem('verifyToken')
    const handleChange = (e) => {
        setState({
           token
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        props.resetp(state)
        alert('Verify your email was success your can login now ');
        props.history.push('/login')
        
       
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
                    <p>Click here to verify your email</p>
                    <div className="auth-form-container text-start">
                        <form className="auth-form" method="POST" onSubmit={handleSubmit} autoComplete={'off'}>
                           
                            
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary w-100 theme-btn mx-auto">Verification</button>
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
};

const mapDispatchToProps = (dispatch) => {
    return {
        resetp: (Credential)=>dispatch(verify(Credential))
    }
}
const mapStateToProps = (state) => {
    return {
        login:state.login
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (Verify);


