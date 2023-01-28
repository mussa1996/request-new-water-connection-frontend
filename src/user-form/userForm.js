import React, { useState, useEffect } from "react";
import "./style.css";
import { Provinces, Districts, Sectors, Cells, Villages } from "rwanda";
import { Kigali, East, North, South, West } from "rwanda/data/provinces";
import axios from "axios";
import validator from "validator";
import {format} from 'date-fns'
import {Link } from 'react-router-dom';
import cogoToast from 'cogo-toast';
import {useHistory} from 'react-router-dom'
import { useFormik,useField } from "formik";
import { basicSchema } from "./schemas";
import jwt_decode from "jwt-decode";
const onSubmit = async (values, actions) => {
  console.log(values);
  console.log(actions);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  actions.resetForm();
};
const BasicForm = () =>{

  const styleInside={
    body:{
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "hwb(204 35% 3%)",
}
    
  }
  
  const { values,errors,touched, isSubmitting, handleBlur,handleChange,} =
    useFormik({
      initialValues: {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        province: "",
        district: "",
        sector: "",
        cell: "",
        country: "",
        dob: "",
        occupation: "",
        gender: "",
        passport_number: "",
        id_number: "",
        plot_number: "",
        creation_date: "",
        branch_name: "",
        water_usage: "",
        issued_date: "",
        expiry_date: "",
        id_image:"",
      },
      validationSchema: basicSchema,
      onSubmit,
    });
    
  console.log(errors);
    const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [value, setValue] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [sector, setSector] = useState("");
  const [cell, setCell] = useState("");
  const [country, setCountry] = useState("");
  const [dob, setDob] = useState("");
  const [occupation, setOccupation] = useState("");
  const [gender,setGender]=useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [copyIdPassportNumber, setCopyIdPassportNumber] = useState("")
  const [idNumber, setIdNumber] = useState("");
  const [plotNumber, setPlotNumber] = useState("");
  const [creationDate, setCreationDate] = useState("");
  const [branchName, setBranchName] = useState("");
  const [waterUsage, setWaterUsage] = useState("");
  const [idIssueDate, setIdIssueDate] = useState("");
  const [idExpiryDate, setIdExpiryDate] = useState("");
  const [districts, setDistricts] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [cells, setCells] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState([]);
  const [selectedSector, setSelectedSector] = useState([]);
  const [selectedCell, setSelectedCell] = useState([]);
  const [selectedVillage, setSelectedVillage] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [validate, setValidate] = useState("");
  const [passportImage,setPassportImage]=useState("");
  const[idImage,setIdImage]=useState("");
  const token = localStorage.getItem('userToken')
  const [showSubmit, setShowSubmit] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const handleShowEdit = () => {
    setShowEdit(true);
    setShowSubmit(false);
  }

  const handleHideEdit = () => {
    setShowEdit(false);
    setShowSubmit(true);
  }
  useEffect(() => {
    const fetchProvinces = async () => {
      const response = await Provinces();
      return await response;
    };

    const fetchDistricts = async () => {
      const response = await Districts();
      return await response;
    };
    const fetchSectors = async () => {
      const response = await Sectors();
      return await response;
    };
    const fetchCell = async () => {
      const response = await Cells();
      return await response;
    };

   
    //validation for form

    // Fetch list of provinces and districts from the server

    fetchProvinces().then((provinces) => setProvinces(provinces));
    fetchDistricts().then((districts) => setDistricts(districts));
    fetchSectors().then((sectors) => setSectors(sectors));
    fetchCell().then((cells) => setCells(cells));
  }, []); // empty dependency array means this effect only runs on mount

  const handleProvinceChange = (event) => {
    {handleChange(event)}
    setSelectedProvince(event.target.value)
   
  };
  // const handleChangePro=event=>{
  //   setSelectedProvince(event.target.value);
  //   handleChange();
  // }
  const handleDistrictChange = (event) => {
    {handleChange(event)}
    setSelectedDistrict(event.target.value);
  };
  const handleSectorChange = (event) => {
    {handleChange(event)}
    setSelectedSector(event.target.value);
  };
  const handleCellChange = (event) => {
    {handleChange(event)}
    setSelectedCell(event.target.value);
  };
const handleIdImageChange = (event) => {

    {handleChange(event)}
    setIdImage(event.target.files[0]);
  };
  const handlePassportImageChange = (event) => {
    {handleChange(event)}
    setPassportImage(event.target.files[0]);
  };
  const handleFistNameChange = (event) => {
    {handleChange(event)}
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    {handleChange(event)}
    setLastName(event.target.value);
  };
  const handleEmailChange = (event) => {
    {handleChange(event)}
    setEmail(event.target.value);
  };
  const handlePhoneChange = (event) => {
    {handleChange(event)}
    setPhone(event.target.value);
  };
  const handleDobChange = (event) => {
    {handleChange(event)}
    setDob(event.target.value);
  };
  const handleOccupationChange = (event) => {
    {handleChange(event)}
    setOccupation(event.target.value);
  };
  const handleGenderChange = (event) => {
    {handleChange(event)}
    setGender(event.target.value);
  };
  const handlePassportNumberChange = (event) => {
    {handleChange(event)}
    setPassportNumber(event.target.value);
    
  };
  const handleIdNumberChange = (event) => {
    {handleChange(event)}
    setIdNumber(event.target.value);
  };
  const handlePlotNumberChange = (event) => {
    {handleChange(event)}
    setPlotNumber(event.target.value);
  };
  const handleCreationDateChange = (event) => {
    {handleChange(event)}
    setCreationDate(event.target.value);
  };
  const handleBranchNameChange = (event) => {
    {handleChange(event)}
    setBranchName(event.target.value);
  };
  const handleWaterUsageChange = (event) => {
    {handleChange(event)}
    setWaterUsage(event.target.value);
  };
  const handleIdIssueDateChange = (event) => {
    {handleChange(event)}
    setIdIssueDate(event.target.value);
  };
  const handleIdExpiryDateChange = (event) => {
    {handleChange(event)}
    setIdExpiryDate(event.target.value);
  };
  const handleCountryChange = (event) => {
    {handleChange(event)}
    setCountry(event.target.value);
  };
  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
     object.target.value = object.target.value.slice(0, object.target.maxLength)
      }
    }
    //retrieve branch data
    const [options, setOptions] = useState([]);

    useEffect(() => {
      async function fetchData() {
        const response = await fetch('http://localhost:4500/api/admin/getAll/branch');
        const data = await response.json();
        setOptions(data.pro);
      }
      fetchData();
    }, []);
    //handle submit for save request data
    const handleSubmit=async(e)=>{
      
      e.preventDefault();

      const formData=new FormData();
      formData.append('first_name',firstName);
      formData.append('last_name',lastName);
      formData.append('email',email);
      formData.append('phone',phone);
      formData.append('province',selectedProvince);
      formData.append('district',selectedDistrict);
      formData.append('sector',selectedSector);
      formData.append('cell',selectedCell);
      formData.append('country',country);
      formData.append('dob',dob);
      formData.append('occupation',occupation);
      formData.append('gender',gender);
      formData.append('passport',passportNumber);
      formData.append('id_number',idNumber);
      formData.append('plot_number',plotNumber);
      formData.append('creation_date',creationDate);
      formData.append('branch_name',branchName);
      formData.append('water_usage',waterUsage);
      formData.append('issued_date',idIssueDate);
      formData.append('expiry_date',idExpiryDate);
      formData.append('id_image',idImage);
      console.warn("Request data",firstName,lastName,email,phone,dob,occupation,gender,passportNumber,idNumber,plotNumber,creationDate,
      branchName,waterUsage,idIssueDate,idExpiryDate,idImage,selectedProvince,selectedDistrict,selectedSector,cell,country);
      console.log("token",token)
      const details=jwt_decode(token);
    console.log("details log in",details)
      axios.post('http://localhost:4500/api/client_form/create',formData,{ headers: {"Authorization" : `Bearer ${token}`} })
      .then(res=>{
          cogoToast.success('Request Created Successfully',{position:'top-center'});
          history.push('/user-dashboard');
      }
      )
      .catch(err=>{
          cogoToast.error('To create request failed, try again',{position:'top-center'});
          history.push('/user/user-form');
          console.log(err.response.data);
      }
      )
  }
  let data=value
  return (
    <>
    <div style={styleInside.body}>
    <div className="user-container" >
      <header>Client information request form</header>

      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="form first">
          <div className="details personal">
            <span className="title">Personal Details</span>

            <div className="fields">
              <div className="input-field">
                <label htmlFor="first_name">First Name</label>
                <input
                value={values.first_name}
                onChange={handleFistNameChange}
                id="first_name"
                name="first_name"
                type="text"
                placeholder="Enter your  first name"
                onBlur={handleBlur}
                  className={errors.first_name ? "input-error" : ""}
                />
                {errors.first_name && touched.first_name && (
                  <p className="error">{errors.first_name}</p>
                )}
              </div>
              <div className="input-field">
                <label htmlFor="last_name">Last Name</label>
                <input
                value={values.last_name}
                onChange={handleLastNameChange}
                id="last_name"
                type="text"
                  placeholder="Enter your last name"
                  
                  onBlur={handleBlur}
                  className={errors.last_name ? "input-error" : ""}
                />
                {errors.last_name && touched.last_name && (
                  <p className="error">{errors.last_name}</p>
                )}
              </div>

              <div className="input-field">
                <label htmlFor="dob">Date of Birth</label>
                <input
                value={values.dob}
                onChange={handleDobChange}
                id="dob"
                type="date"
                  placeholder="Enter birth date"
                  onBlur={handleBlur}
                  className={errors.dob ? "input-error" : ""}
                />
                {errors.dob && touched.dob && (
                  <p className="error">{errors.dob}</p>
                )}
              </div>

              <div className="input-field">
                <label htmlFor="email">Email</label>
                <input
                value={values.email}
                onChange={handleEmailChange}
                id="email"
                type="email"
                  placeholder="Enter your email"
                  onBlur={handleBlur}
                  className={errors.email ? "input-error" : ""}
                />
                {errors.email && touched.email && (
                  <p className="error">{errors.email}</p>
                )}
              </div>

              <div className="input-field">
                <label htmlFor="phone">Mobile Number</label>
                <input
                value={values.phone}
                onChange={handlePhoneChange}
                id="phone"
                type="number"
                placeholder="Enter mobile number"
                  
                  onBlur={handleBlur}
                  className={errors.phone ? "input-error" : ""}
                />
                {errors.phone && touched.phone && (
                  <p className="error">{errors.phone}</p>
                )}
              </div>

              <div className="input-field">
                <label htmlFor="gender">Gender</label>
                <select
                  // value={values.gender}
                  onChange={handleGenderChange}
                  id="gender"
                  type="text"
                  onBlur={handleBlur}
                  className={errors.gender ? "input-error" : ""}
                >
                  {errors.gender && touched.gender && (
                    <p className="error">{errors.gender}</p>
                  )}
                  <option  value="Selected gender" disabled selected>
                    Select gender
                  </option>
                  <option value="Male" defaultValue="">Male</option>
                  <option value="Female" defaultValue="">Female</option>
                  <option value="Others" defaultValue="">Others</option>
                </select>
              </div>

              <div className="input-field">
                <label htmlFor="occupation">Occupation</label>
                <input
                value={values.occupation}
                onChange={handleOccupationChange}
                id="occupation"
                  type="text"
                  placeholder="Enter your ccupation"
                  
                  onBlur={handleBlur}
                  className={errors.occupation ? "input-error" : ""}
                />
                {errors.occupation && touched.occupation && (
                  <p className="error">{errors.occupation}</p>
                )}
              </div>
            </div>
          </div>

          <div className="details address">
            <span className="title">Address Details</span>

            <div className="fields">
              <div className="input-field">
                <label htmlFor="country">Country</label>
                <select
                  required
                  id="country"
                  // name="country"
                  onChange={handleCountryChange}
                  onBlur={handleBlur}
                  className={errors.country ? "input-error" : ""}
                >
                  {errors.country && touched.country && (
                    <p className="error">{errors.country}</p>
                  )}
                  <option disabled selected>
                    Select Country
                  </option>
                  <option value="Rwanda">Rwanda</option>
                </select>
              </div>
              <div
                className="input-field"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <label htmlFor="province">Province</label>
                <select
                  required
                  onChange={handleProvinceChange}
                  id="province"
                  // name="province"
                  onBlur={handleBlur}
                  // value={selectedProvince}
                  className={errors.province ? "input-error" : ""}
                >
                  {errors.province && touched.province && (
                    <p className="error">{errors.province}</p>
                  )}
                  <option disabled selected>
                    --Choose--
                  </option>
                  {
                  provinces.map((province) => (
                    <option key={province} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-field">
                <label htmlFor="district">District</label>
                <select
                  required
                  onChange={handleDistrictChange}
                  id="district"
                  onBlur={handleBlur}
                  className={errors.district ? "input-error" : ""}
                >
                  {errors.district && touched.district && (
                    <p className="error">{errors.district}</p>
                  )}
                  <option disabled selected>
                    --Choose--
                  </option>
                  {Districts(selectedProvince).map((district, index) => {
                    return <option key={index} >{district}</option>;
                  })}
                </select>
              </div>

              <div className="input-field">
                <label>Sector</label>
                <select
                  required
                  onChange={handleSectorChange}
                  id="sector"
                  // name="sector"
                  onBlur={handleBlur}
                  className={errors.sector ? "input-error" : ""}
                >
                  {errors.sector && touched.sector && (
                    <p className="error">{errors.sector}</p>
                  )}
                  <option disabled selected>
                    --Choose--
                  </option>
                  {
                    selectedDistrict!="" ?(
                      Sectors(''+selectedProvince+'',''+selectedDistrict+'').map((sector, index) => {
                        
                    return <option key={index}  >{sector}</option>;
                  })
                    ):null

                  }
                </select>
              </div>

              <div className="input-field">
                <label htmlFor="cell">Cell</label>
                <select
                 id="cell"
                  onChange={handleCellChange}
                  onBlur={handleBlur}
                  className={errors.cell ? "input-error" : ""}
                >
                  {errors.cell && touched.cell && (
                    <p className="error">{errors.cell}</p>
                  )}
                  <option disabled selected>
                    --Choose--
                  </option>

                  {
                    selectedSector!=""?(
                      Cells(''+selectedProvince+'',''+selectedDistrict+'',''+selectedSector+'').map((cell, index) => {
                        
                        return <option key={index} >{cell}</option>;
                      })
                    ):null
                  }
                  
                </select>
              </div>
            </div>
          </div>

          <div className="details Services">
            <span className="title">Services Details</span>

            <div className="fields">
              <div className="input-field">
                <label htmlFor="branch_name">Branch Name</label>
                <select
                  id="branch_name"
                  // name="branch_name"
                  onChange={handleBranchNameChange}
                  onBlur={handleBlur}
                  className={errors.branch_name ? "input-error" : ""}
                >
                  {errors.branch_name && touched.branch_name && (
                    <p className="error">{errors.branch_name}</p>
                  )}
                  <option disabled selected>
                    Select Branch
                  </option>
                  {options.map((option, index) => (
                  <option key={index} value={option.value}>
                   {option.branch_name}
                 </option>
      ))}
                </select>
              </div>

              <div className="input-field">
                <label htmlFor="water_usage">Water Usage</label>
                <select
                onChange={handleWaterUsageChange}
                  id="water_usage"
                  type="text"
                  onBlur={handleBlur}
                  className={errors.water_usage ? "input-error" : ""}
                >
                  {errors.water_usage && touched.water_usage && (
                    <p className="error">{errors.water_usage}</p>
                  )}
                  <option disabled selected>
                    Select Water Usage
                  </option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>

              <div className="input-field">
                <label htmlFor="plot_number">Plot Number</label>
                <input
                 value={values.plot_number}
                 onChange={handlePlotNumberChange}
                 id="plot_number"
                  type="text"
                  placeholder="Enter your plot number"
                 
                  onBlur={handleBlur}
                  className={errors.plot_number ? "input-error" : ""}
                />
                {errors.plot_number && touched.plot_number && (
                  <p className="error">{errors.plot_number}</p>
                )}
              </div>

              <div className="input-field">
                <label htmlFor="creation_date">Creation Date</label>
                <input
                value={values.creation_date}
                onChange={handleCreationDateChange}
                id="creation_date"
                  type="date"
                  placeholder="Enter creation date"
                  onBlur={handleBlur}
                  className={errors.creation_date ? "input-error" : ""}
                />
                {errors.creation_date && touched.creation_date && (
                  <p className="error">{errors.creation_date}</p>
                )}
              </div>
            </div>
          </div>

          <div className="details ID">
            <span className="title">Identity Details</span>

            <div className="fields">
              <div className="input-field">
                <label>ID Type</label>
                <select required 
                onChange={(e) => setValue(e.target.value)}>
                  <option disabled selected>
                    Select identification
                  </option>
                  <option id="identity">Id</option>
                  <option id="passport">Passport</option>
                </select>
              </div>
              <div className="input-field">
                {data === "Id" ? (
                  <label htmlFor="id_number">
                    ID Number:
                    <input
                    value={values.id_number}
                    onChange={handleIdNumberChange}
                    id="id_number"
                      type="number"
                      maxLength="16"
                      onInput={maxLengthCheck}
                       min={16}
                      placeholder="Enter your id number"
                      onBlur={handleBlur}
                      className={errors.id_number ? "input-error" : ""}
                     
                    />
                    {errors.id_number && touched.id_number && (
                      <p className="error">{errors.id_number}</p>
                    )}
                  </label>
                ) :data === "Passport" ? (
                  <label htmlFor="passport_number">
                    Passport Number:
                    <input
                    maxLength={8}
                      type="text"
                      placeholder="Enter your passport number"
                      required
                      id="passport_number"
                      name="passport_number"
                      onChange={handlePassportNumberChange}
                      value={values.passport_number}
                      onBlur={handleBlur}
                      className={errors.passport_number ? "input-error" : ""}
                    />
                    {errors.passport_number && touched.passport_number && (
                      <p className="error">{errors.passport_number}</p>
                    )}
                  </label>
                ) : null}
              </div>

              
              <div className="input-field">
                {data === "Id" ? (
                  <label htmlFor="id_image">
                    Attach Copy of Id:
                    <input
                      type="file"
                      required
                      id="id_image"
                      name="id_image"
                      onChange={handleIdImageChange}
                      onBlur={handleBlur}
                      className={errors.id_image ? "input-error" : ""}
                    />
                    {errors.id_image && touched.id_image && (
                      <p className="error">{errors.id_image}</p>
                    )}
                  </label>
                ) : null}
              </div>

              <div className="input-field">
                {data === "Passport" ? (
                  <label htmlFor="issued_date">
                    Issued Date:
                    <input
                    value={values.issued_date}
                    onChange={handleIdIssueDateChange}
                    id="issued_date"
                      type="date"
                      placeholder="Enter issued date"
                      onBlur={handleBlur}
                      className={errors.issued_date ? "input-error" : ""}
                    />
                    {errors.issued_date && touched.issued_date && (
                      <p className="error">{errors.issued_date}</p>
                    )}
                  </label>
                ) : null}
              </div>

              <div className="input-field">
                {data === "Passport" ? (
                  <label htmlFor="expiry_date">
                    Expiry Date:
                    <input
                    value={values.expiry_date}
                    onChange={handleIdExpiryDateChange}
                    id="expiry_date"
                    type="date"
                    placeholder="Enter expiry date"
                      onBlur={handleBlur}
                      className={errors.expiry_date ? "input-error" : ""}
                    />
                    {errors.expiry_date && touched.expiry_date && (
                      <p className="error">{errors.expiry_date}</p>
                    )}
                  </label>
                ) : null}
              </div>
              <div className="input-field">
                {data === "Passport" ? (
                  <label htmlFor="id_image">
                    Attach Copy of Passport:
                    <input
                      type="file"
                      required
                      id="id_image"
                      name="id_image"
                      onChange={handlePassportImageChange}
                      onBlur={handleBlur}
                      className={errors.id_image ? "input-error" : ""}
                    />
                    {errors.id_image && touched.id_image && (
                      <p className="error">{errors.id_image}</p>
                    )}
                  </label>
                ) : null}
              </div>
            </div>

            <div className="buttons">
              <Link to={`/user-dashboard`}>
              <div className="backBtn">
                <i className="uil uil-navigator"></i>
                
                <span className="btnText">Back</span>
              </div>
              </Link>
              <button  type="submit" className="sumbit" disabled={isSubmitting}>
                <span className="btnText">Submit</span>
              </button>
             
            </div>
          </div>
        </div>
      </form>
    </div>
    </div>
</>  );
}
export default BasicForm;
