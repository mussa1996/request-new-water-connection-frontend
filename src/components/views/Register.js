
import React, { useState ,useEffect,state} from 'react';
import { Link} from "react-router-dom";
import { connect } from 'react-redux';
import signupAction from '../../actions/Signup.action';
import cogoToast from 'cogo-toast';
import {useHistory} from 'react-router-dom'
import * as Yup from 'yup';
import axios from 'axios';
import PhoneInput from 'react-phone-number-input'
import PlacesAutocomplete from 'react-places-autocomplete';
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';
import validation from '../../helper/validation';
import {useFormik,Field} from 'formik';
function Signup (props){
  const formik=useFormik({

    initialValues:{

      name:'',
      email:'',
      phone:'',
      password:'',
      owner_name:'',
      address:'',
      website:'',
      category:'',
      role:'',

    },
     
    validationSchema:Yup.object({
    name: Yup.string().max(50, 'Business name is too long').required('Business name is required'),
    owner_name: Yup.string().max(50, 'Owner name is too long').required('Owner name is required'),
    category: Yup.string().required('Category is required'),
    role: Yup.string().required('Role is required'),
    address: Yup.string().max(50, 'Address is too long').required('Address is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    website: Yup.string().max(1000, 'Website is too long').required('Website is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    phone: Yup.number().min(10, 'Phone number is too short').max(15, 'Phone number is too long').required('Phone number is required'),    
  }),
  onSubmit:values=>{
// dispatch(addPost(values))
    alert("testing data",JSON.stringify(values));

  }

});

  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [owner_name, setOwnerName] = useState('');
  const [category, setCategory] = useState('');
  const [role, setRole] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState('');
  const[locatio,setLocation]=useState({
    loaded:false,
    coordinates:{lat:"",lng:""}
});

    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({
      name:'',
      email:'',
      phone:'',
      password:'',
      owner_name:'',
      address:'',
      photo:'',
      website:'',
      category:'',
      role:'',
    })
   
const handleSubmit=async(e)=>{
    e.preventDefault();
  
    const formData=new FormData();
    formData.append('name',name);
    formData.append('owner_name',owner_name);
    formData.append('category',category);
    formData.append('role',role);
    formData.append('address',address);
    formData.append('email',email);
    formData.append('website',website);
    formData.append('password',password);
    formData.append('phone',phone);
    formData.append('photo',photo);
    formData.append('latitude',locatio.coordinates.lat);
    formData.append('longitude',locatio.coordinates.lng);
    console.warn("business data",name,owner_name,category,role,address,email,website,password,phone,photo,locatio.coordinates.lat,locatio.coordinates.lng);
    axios.post('http://localhost:4500/api/business/signup',formData)
    .then(res=>{
        cogoToast.success('Business Created Successfully',{position:'top-center'});
        history.push('/login');
    }
    )
    .catch(err=>{
        cogoToast.error('To create business failed, try again',{position:'top-center'});
        history.push('/register');
        console.log(err.message);
    }
    )
}
 

  const onSubmit = (values) => {
    const user ={
      ...values,
      address
    }
   console.log("value",values)
   console.log("props",props)
  }
  const handleChange=(e)=>{
    props.onBlur(props.name,e.target.value)
  }
  const handleSelect = address => {
    geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(latLng => console.log('Success', latLng))
        .catch(error => console.error('Error', error));
};
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
                    id='name'
                    name="name"
                    placeholder="Business Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    // {...formik.getFieldProps("name")}
                   
                  ></input>
                   {formik.touched.name && formik.errors.name ? <span style={{color:'red'}}>{formik.errors.name}</span> : null}
                  </div>
                <div className="name mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="owner_name"

                    name="owner_name"
                    // value={values.owner_name}
                    // onChange={handleChange}
                    placeholder="Owner Name"
                    onChange={(e) => setOwnerName(e.target.value)}
                    // {...formik.getFieldProps("owner_name")}
                  />
                  {formik.touched.owner_name && formik.errors.owner_name ? <span style={{color:'red'}}>{formik.errors.owner_name}</span> : null}
                </div>
                

                {/* <div className="name mb-3">
                  <Address onChange={(e) => setAddress(e.target.value)} />
                  
                 
                </div> */}
                 <PlacesAutocomplete
                 style={{width:'100%'}}
                    value={address}
                    onChange={setAddress}
                    onSelect={setAddress}
                > 
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                            <input
                                {...getInputProps({
                                    placeholder: 'Search address ...',
                                    className: 'location-search-input',
                                })} style={{ width: '100%', padding: '4px' , border: '1px solid #ccc', borderRadius: '4px', marginBottom: '10px'}}
                            />
                            <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map(suggestion => {
                                    const className = suggestion.active
                                        ? 'suggestion-item--active'
                                        : 'suggestion-item';
                                    // inline style for demonstration purpose
                                    const style = suggestion.active
                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                    return (
                                        <div
                                            {...getSuggestionItemProps(suggestion, {
                                                className,
                                                style,
                                            })}
                                        >
                                            <span>{suggestion.description}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </PlacesAutocomplete>
                 
                <div className="name mb-3">
                 
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                    // value={values.phone}
                    // onChange={handleChange}
                    placeholder="Phone"
                    onChange={(e) => setPhone(e.target.value)}
                    // {...formik.getFieldProps("phone")}
                    
                     
                  />
                   {formik.touched.phone && formik.errors.phone ? <span style={{color:'red'}}>{formik.errors.phone}</span> : null}
                </div>

                <div className="name mb-3">
                  <select name="classSelect" onChange={(e) => setCategory(e.target.value)}  >
                  <option value="">Please choose category</option>
                    <option value="restaurants">Restaurant</option>
                    <option value="hotels">Hotel</option>
                    <option value="attractions">Attraction</option>
                    <option value="others">Other</option>
                    
                  </select>
                  {formik.touched.category && formik.errors.category ? <span style={{color:'red'}}>{formik.errors.category}</span> : null}
                </div>
                <div className="name mb-3">
                  <select name="classSelect" onChange={(e) => setRole(e.target.value)}  >
                  <option value="">Please choose role</option>
                    <option value="business">Business</option>
                    <option value="user">User</option>
                    <option value="others">Other</option>
                    
                  </select>
                  {formik.touched.role && formik.errors.role ? <span style={{color:'red'}}>{formik.errors.role}</span> : null}
                </div>

                <div className="email mb-3">
                  <input
                    type="email"
                    className="form-control" 
                    id="email"
                    name="email"
                    // value={values.email}
                    // onChange={handleChange}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    // {...formik.getFieldProps("email")}
                  />
                   {formik.touched.email && formik.errors.email ? <span style={{color:'red'}}>{formik.errors.email}</span> : null}
                </div>
                <div className="website mb-3">
                  <input
                    type="website"
                    className="form-control" 
                    id="website"
                    name="website"
                    // value={values.email}
                    // onChange={handleChange}
                    placeholder="website"
                    onChange={(e) => setWebsite(e.target.value)}
                    // {...formik.getFieldProps("website")}
                  />
                   {formik.touched.website && formik.errors.website ? <span style={{color:'red'}}>{formik.errors.website}</span> : null}
                </div>
                
               
              <div className="name mb-3">
                
                <input type="file" onChange={(e)=>setPhoto(e.target.files[0])}  name="photo" id='photo' ></input> 
                {errors.photo && <p className="error">{errors.photo}</p>}

                </div>
                <div className="password mb-3">
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control "
                      name="password"
                      id="password"
                      // value={values.password}
                      // onChange={handleChange}
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      // {...formik.getFieldProps("password")}
                    />

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
                  {formik.touched.password && formik.errors.password ? <span style={{color:'red'}}>{formik.errors.password}</span> : null}
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