import React,{useState,useEffect} from 'react';
import '../../assets/scss/App.scss';
import {Link} from 'react-router-dom'
import {verify} from '../../actions/VerifyAction'
import { connect } from 'react-redux'
import cogoToast from 'cogo-toast';

import axios from 'axios';

const Verify = (props) => {
    let [state, setState] = useState('')
    const [isVerified, setIsVerified] = useState(false);
    const currentUrl = window.location.href;
console.log("url from window",currentUrl);
    // const queryParams = new URLSearchParams(window.location.pathname);
    // console.log("testing query",queryParams)
    // const params = window.location.pathname.split("/");
    // token = params[params.token];
    const params = new URLSearchParams(new URL(currentUrl).search);
const token = params.get('token');
    console.log("testing token from email",token)

    const [searchParams, setSearchParams] = useState({});

  useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    setSearchParams(Object.fromEntries(params));
    console.log("testing",searchParams)
  }, []);
    //  token = params[params.length - 1];
    const tokens  =localStorage.getItem('userTokenSign')
    console.log("token stora",tokens)
    const handleChange = (e) => {
        setState({
           tokens
        })
    }
    // const handleSubmit = (e) => { 
    //     e.preventDefault();
    //     props.resetp(state)
    //     alert('Verify your email was success your can login now ');
    //     props.history.push('/login')
        
       
    // }
    console.log("token from email",token)
    const handleSubmit = event => {
        event.preventDefault();
        if (tokens === token) {
            axios.put(`http://localhost:4500/api/user/verify?token=${token}`)
            // setIsVerified(true);
            alert('Verify your email was success your can login now ');
        props.history.push('/login')
        } else {
            alert('Invalid token try again')
            console.log("Invalid Token");
        }
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
                {isVerified ? (
                    <p>Click here to verify your email</p>
                    ):(
                    <div className="auth-form-container text-start">
                        <form className="auth-form" method="POST" onSubmit={handleSubmit} autoComplete={'off'}>
                           
                            
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary w-100 theme-btn mx-auto">Verification</button>
                            </div>
                        </form>

                        <hr />
                        <div className="auth-option text-center pt-2"><Link className="text-link" to="/login" >Back to Login</Link></div>
                    </div>
                    )}
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


