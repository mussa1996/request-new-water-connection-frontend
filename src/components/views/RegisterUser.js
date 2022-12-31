
import React, { useState} from 'react';
import { Link} from "react-router-dom";
import { connect } from 'react-redux';
import signupAction from '../../actions/Signup.action';
import cogoToast from 'cogo-toast';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PlacesAutocomplete from 'react-places-autocomplete';
import validateName from '../../helpers/validateName';
import validateEmail from '../../helpers/validateEmail';
import validatePassword from '../../helpers/validatePassword';
import validatePhone from '../../helpers/validatePhone';

function Signup (props){

  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [fullname, setFullName] = useState('');
  const [role, setRole] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState('');
  const [phone,setPhone]=useState('');
    const [errors, setErrors] = useState({})
    const [agree, setAgree] = useState(false);
    
    const formik=useFormik({

      initialValues:{
  
        fullname:'',
        email:'',
        phone:'',
        password:'',
      },
       
      validationSchema:Yup.object({
      fullname: Yup.string().max(50, 'name is too long').required(' name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
      phone: Yup.number().min(10, 'Phone number is too short').max(15, 'Phone number is too long').required('Phone number is required'),    
    }),
    onSubmit:values=>{
  // dispatch(addPost(values))
      alert("testing data",JSON.stringify(values));
  
    }
  
  });  
const handleSubmit=async(e)=>{
    e.preventDefault();
   
    const formData=new FormData();
    formData.append('fullname',fullname);
    formData.append('role',role);
    formData.append('address',address);
    formData.append('email',email);
    formData.append('password',password);
    formData.append('photo',photo);
    console.warn("business data",fullname,role,address,email,password,photo);
    axios.post('http://localhost:4500/api/user/signup',formData)
    .then(res=>{
        cogoToast.success('User Created Successfully',{position:'top-center'});
        history.push('/login');
    }
    )
    .catch(err=>{
        cogoToast.error('To create user failed, try again',{position:'top-center'});
        history.push('/register/user');
        console.log(err.message);
    }
    )
}

  const togglePassword = (e) => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };
  return (
    
    
    <div className="row g-0 auth-wrapper">
      <div className="col-12 col-md-5 col-lg-6 h-100 auth-background-col">
        <div className="auth-background-holder"></div>
        <div className="auth-background-mask"></div>
      </div>

      <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center">
        <div className="d-flex flex-column align-content-end">
          <div className="auth-body mx-auto">
            <h1 style={{fontSize:'20px',textAlign:'center', lineHeight:'1.5em', paddingBottom:'20px', fontFamily:"Playfair Display", textTransform:'uppercase',letterSpacing: '2px', color:'#111',marginTop:'10px'}}>Create your Account</h1>
            <div className="auth-form-container text-start">
              <form
                className="auth-form"
                method="POST"
                onSubmit={handleSubmit}
                autoComplete={"off"}
              >
               
               <div className="name mb-3">
                
                  <input
                   
                    type="text"
                    className="form-control" 
                    id='fullname'
                    name="fullname"
                    placeholder="Fullname"
                    value={fullname}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  ></input>
                   {formik.touched.fullname && formik.errors.fullname ? <span style={{color:'red'}}>{formik.errors.fullname}</span> : null}
                   
                  </div>

                <div className="email mb-3">
                  <input
                    type="email"
                    className="form-control" 
                    id="email"
                    name="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                    {formik.touched.email && formik.errors.email ? <span style={{color:'red'}}>{formik.errors.email}</span> : null}
                </div>
                
                <div className="phone mb-3">
                  <input
                    type="phone"
                    className="form-control" 
                    id="phone"
                    name="phone"
                    placeholder="Phone"
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                    {formik.touched.phone && formik.errors.phone ? <span style={{color:'red'}}>{formik.errors.phone}</span> : null}
                </div>
                <div className="password mb-3">
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control "
                      name="password"
                      id="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    /> 
                    {formik.touched.password && formik.errors.password ? <span style={{color:'red'}}>{formik.errors.password}</span> : null}
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      onClick={(e) => togglePassword(e)}
                    >
                      <i
                        className={
                          showPassword ? "far fa-eye" : "far fa-eye-slash"
                        }
                      ></i>{" "}
                    </button>
                  </div>
                </div>
                <div className="formField">
          </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary w-100 theme-btn mx-auto"
                  >
                    Sign Up
                  </button>
                </div>
               
             
              </form>
              

              <hr />
              <div className="auth-option text-center pt-2">
                <br />
                Have an account?{" "}
                <Link className="text-link" to="/login">
                  Sign in
                </Link>
              </div>
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