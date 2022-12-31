
import React, { useState} from 'react';
import { connect } from 'react-redux';
import signupAction from '../../actions/Signup.action';
import {useHistory} from 'react-router-dom';
function Signup (props){

  const history = useHistory();
  const [role, setRole] = useState('');
    
const handleSubmit=async(e)=>{
    e.preventDefault();
if(role==='business'){
    history.push('/register');
}
else if(role==='user'){
    history.push('/register/user');
}
else{
    history.push('/register');
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
            <h1 style={{fontSize:'20px',textAlign:'center', lineHeight:'1.5em', paddingBottom:'20px', fontFamily:"Playfair Display", textTransform:'uppercase',letterSpacing: '2px', color:'#111',marginTop:'10px'}}>choose your role</h1>
            <div className="auth-form-container text-start">
              <form
                className="auth-form"
                method="POST"
                onSubmit={handleSubmit}
                autoComplete={"off"}
              >
                
                <div className="name mb-3">
                  <select name="classSelect" onChange={(e) => setRole(e.target.value)}  >
                  <option value="">Please choose role</option>
                    <option value="business">Business</option>
                    <option value="user">Customer</option>
                    <option value="others">Other</option>
                  </select>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary w-100 theme-btn mx-auto"
                  >
                    Continue
                  </button>
                </div>
              </form>
              
            </div>
          </div>
        </div>
      </div>
    </div>
        )}
    
  
const mapDispatchToProps = (dispatch) => {
  return {
      signup: (credentials) => dispatch(signupAction(credentials))
  }
}
const mapStateToProps = (state) => {
  return {
      signupState:state.signup
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Signup);