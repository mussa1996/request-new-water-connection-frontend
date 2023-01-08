import React, { useState, useEffect } from "react";
import "./style.css";
import { Provinces, Districts, Sectors, Cells, Villages } from "rwanda";
import { Kigali, East, North, South, West } from "rwanda/data/provinces";
import axios from "axios";
import validator from "validator";
import { Form, Button } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { useFormik } from "formik";
import { basicSchema } from "./schemas";
import {format} from 'date-fns'
function UserForm() {

  const styleInside={
    body:{
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "hwb(204 35% 3%)",
}
    
  }
  const onSubmit = async (values,actions) => {
    await new Promise((resolve)=>setTimeout(resolve,1000));
    actions.resetFom()
    console.log("submitted");
  };
  const { values, handleBlur, handleChange, handleSubmit, errors, touched,isSubmitting } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        province: "",
        district: "",
        sector: "",
        cell: "",
        village: "",
        country: "",
        dob: "",
        occupation: "",
        gender: "",
        identification: "",
        passportNumber: "",
        idNumber: "",
        plotNumber: "",
        creationDate: "",
        branchName: "",
        waterUsage: "",
        idType: "",
        idIssueDate: "",
        idExpiryDate: "",
        idIssueAuthority: "",
        idNumber: "",
        passportNumber: "",
        copyPassport:"",
        copyId:"",
      },
      validationSchema: basicSchema,
      onSubmit,
    });
  console.log(errors);
  const [value, setValue] = useState([]);
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
  const [copyPassport,setCopyPassport]=useState("");
  const[copyId,setCopyId]=useState("");
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

    // validation parts only for form
    const validate = (textInput) => {
      if (validator.isPassportNumber(textInput, "IN")) {
        setValidate(textInput.target.value);
        setErrorMessage("Is Valid Passport Number");
      } else {
        setErrorMessage("Is Invalid Passport Number");
      }
    };

    //validation for form

    // Fetch list of provinces and districts from the server

    fetchProvinces().then((provinces) => setProvinces(provinces));
    fetchDistricts().then((districts) => setDistricts(districts));
    fetchSectors().then((sectors) => setSectors(sectors));
    fetchCell().then((cells) => setCells(cells));
  }, []); // empty dependency array means this effect only runs on mount

  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
  };
  const handleSectorChange = (event) => {
    setSelectedSector(event.target.value);
  };
  const handleCellChange = (event) => {
    setSelectedCell(event.target.value);
  };

  const handleIdentificationChange = (event) => {
    setValue(event.target.value);
  };
  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
     object.target.value = object.target.value.slice(0, object.target.maxLength)
      }
    }
  console.log("testing value", value);
  let data = value;
  console.log("testing data", data);
  console.log("selected district and province and cell",'"'+selectedProvince+'"','"'+selectedDistrict+'"','"'+selectedSector+'"')
  console.log("sectors test number ",Cells(''+selectedProvince+'',''+selectedDistrict+'',''+selectedSector+''))
  return (
    <div style={styleInside.body}>
    <div className="user-container" >
      <header>Client information request form</header>

      <form onSubmit={handleSubmit}>
        <div className="form first">
          <div className="details personal">
            <span className="title">Personal Details</span>

            <div className="fields">
              <div className="input-field">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  placeholder="Enter your  first name"
                  required
                  id="firstName"
                  name="firstName"
                  onChange={handleChange}
                  value={values.firstName}
                  onBlur={handleBlur}
                  className={errors.firstName ? "input-error" : ""}
                />
                {errors.firstName && touched.firstName && (
                  <p className="error">{errors.firstName}</p>
                )}
              </div>
              <div className="input-field">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  required
                  id="lastName"
                  name="lastName"
                  onChange={handleChange}
                  value={values.lastName}
                  onBlur={handleBlur}
                  className={errors.lastName ? "input-error" : ""}
                />
                {errors.lastName && touched.lastName && (
                  <p className="error">{errors.lastName}</p>
                )}
              </div>

              <div className="input-field">
                <label htmlFor="dob">Date of Birth</label>
                <input
                  type="date"
                  placeholder="Enter birth date"
                  required
                  id="dob"
                  name="dob"
                  onChange={handleChange}
                  value={values.dob}
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
                  type="email"
                  placeholder="Enter your email"
                  required
                  id="email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
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
                  type="number"
                  placeholder="Enter mobile number"
                  required
                  id="phone"
                  name="phone"
                  onChange={handleChange}
                  value={values.phone}
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
                  required
                  id="gender"
                  name="gender"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.gender ? "input-error" : ""}
                >
                  {errors.gender && touched.gender && (
                    <p className="error">{errors.gender}</p>
                  )}
                  <option disabled selected>
                    Select gender
                  </option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Others</option>
                </select>
              </div>

              <div className="input-field">
                <label htmlFor="occupation">Occupation</label>
                <input
                  type="text"
                  placeholder="Enter your ccupation"
                  required
                  id="occupation"
                  name="occupation"
                  onChange={handleChange}
                  value={values.occupation}
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
                <label>Country</label>
                <input type="text" disabled placeholder="Rwanda" required />
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
                  name="province"
                  onBlur={handleBlur}
                  className={errors.province ? "input-error" : ""}
                >
                  {errors.province && touched.province && (
                    <p className="error">{errors.province}</p>
                  )}
                  <option disabled selected>
                    --Choose--
                  </option>
                  {provinces.map((province) => (
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
                  name="district"
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
                    return <option key={index}>{district}</option>;
                  })}
                </select>
              </div>

              <div className="input-field">
                <label>Sector</label>
                <select
                  required
                  onChange={handleSectorChange}
                  id="sector"
                  name="sector"
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
                    return <option key={index}>{sector}</option>;
                  })
                    ):null


                  }
                </select>
              </div>

              <div className="input-field">
                <label htmlFor="cell">Cell</label>
                <select
                  required
                  onChange={handleCellChange}
                  id="cell"
                  name="cell"
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
                        return <option key={index}>{cell}</option>;
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
                <label htmlFor="branchName">Branch Name</label>
                <select
                  required
                  id="branchName"
                  name="branchName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.branchName ? "input-error" : ""}
                >
                  {errors.branchName && touched.branchName && (
                    <p className="error">{errors.branchName}</p>
                  )}
                  <option disabled selected>
                    Select Branch
                  </option>
                  <option>Muhanga</option>
                  <option>Kacyiru</option>
                </select>
              </div>

              <div className="input-field">
                <label htmlFor="waterUsage">Water Usage</label>
                <select
                  required
                  id="waterUsage"
                  name="waterUsage"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.waterUsage ? "input-error" : ""}
                >
                  {errors.waterUsage && touched.waterUsage && (
                    <p className="error">{errors.waterUsage}</p>
                  )}
                  <option disabled selected>
                    Select Water Usage
                  </option>
                  <option>Residential</option>
                  <option>Commercial</option>
                </select>
              </div>

              <div className="input-field">
                <label htmlFor="plotNumber">Plot Number</label>
                <input
                  type="text"
                  placeholder="Enter your plot number"
                  required
                  id="plotNumber"
                  name="plotNumber"
                  onChange={handleChange}
                  value={values.plotNumber}
                  onBlur={handleBlur}
                  className={errors.plotNumber ? "input-error" : ""}
                />
                {errors.plotNumber && touched.plotNumber && (
                  <p className="error">{errors.plotNumber}</p>
                )}
              </div>

              <div className="input-field">
                <label htmlFor="creationDate">Creation Date</label>
                <input
                  type="date"
                  placeholder="Enter creation date"
                  required
                  id="creationDate"
                  name="creationDate"
                  onChange={handleChange}
                  value={values.creationDate}
                  onBlur={handleBlur}
                  className={errors.creationDate ? "input-error" : ""}
                />
                {errors.creationDate && touched.creationDate && (
                  <p className="error">{errors.creationDate}</p>
                )}
              </div>
            </div>
          </div>

          <div className="details ID">
            <span className="title">Identity Details</span>

            <div className="fields">
              <div className="input-field">
                <label>ID Type</label>
                <select required onChange={(e) => setValue(e.target.value)}>
                  <option disabled selected>
                    Select identification
                  </option>
                  <option id="identity">Id</option>
                  <option id="passport">Passport</option>
                </select>
              </div>
              <div className="input-field">
                {data === "Id" ? (
                  <label htmlFor="idNumber">
                    ID Number:
                    <input
                      type="number"
                      maxLength="16"
                      onInput={maxLengthCheck}
                       min={16}
                      placeholder="Enter your id number"
                      required
                      id="idNumber"
                      name="idNumber"
                      onChange={handleChange}
                      value={values.idNumber}
                      onBlur={handleBlur}
                      className={errors.idNumber ? "input-error" : ""}
                     
                    />
                    {errors.idNumber && touched.idNumber && (
                      <p className="error">{errors.idNumber}</p>
                    )}
                  </label>
                ) : data === "Passport" ? (
                  <label htmlFor="passportNumber">
                    Passport Number:
                    <input
                    maxLength={8}
                      type="text"
                      placeholder="Enter your passport number"
                      required
                      id="passportNumber"
                      name="passportNumber"
                      onChange={handleChange}
                      value={values.passportNumber}
                      onBlur={handleBlur}
                      className={errors.passportNumber ? "input-error" : ""}
                    />
                    {errors.passportNumber && touched.passportNumber && (
                      <p className="error">{errors.passportNumber}</p>
                    )}
                  </label>
                ) : null}
              </div>

              <div className="input-field">
                <label htmlFor="idIssueAuthority">Issued Authority</label>
                <input
                  type="text"
                  placeholder="Enter issued authority"
                  required
                  id="idIssueAuthority"
                  name="idIssueAuthority"
                  onChange={handleChange}
                  value={values.idIssueAuthority}
                  onBlur={handleBlur}
                  className={errors.idIssueAuthority ? "input-error" : ""}
                />
                {errors.idIssueAuthority && touched.idIssueAuthority && (
                  <p className="error">{errors.idIssueAuthority}</p>
                )}
              </div>

              <div className="input-field">
                {data === "Id" ? (
                  <label htmlFor="copyId">
                    Attach Copy of Id:
                    <input
                      type="file"
                      required
                      id="copyId"
                      name="copyId"
                      onChange={(e)=>setCopyId(e.target.files[0])}
                      value={values.copyId}
                      onBlur={handleBlur}
                      className={errors.copyId ? "input-error" : ""}
                    />
                    {errors.copyPassport && touched.copyId && (
                      <p className="error">{errors.copyId}</p>
                    )}
                  </label>
                ) : null}
              </div>

              <div className="input-field">
                {data === "Passport" ? (
                  <label htmlFor="idIssueDate">
                    Issued Date:
                    <input
                      type="date"
                      placeholder="Enter issued date"
                      required
                      id="idIssueDate"
                      name="idIssueDate"
                      onChange={handleChange}
                      value={values.idIssueDate}
                      onBlur={handleBlur}
                      className={errors.idIssueDate ? "input-error" : ""}
                    />
                    {errors.idIssueDate && touched.idIssueDate && (
                      <p className="error">{errors.idIssueDate}</p>
                    )}
                  </label>
                ) : null}
              </div>

              <div className="input-field">
                {data === "Passport" ? (
                  <label htmlFor="idExpiryDate">
                    Expiry Date:
                    <input
                      type="date"
                      placeholder="Enter expiry date"
                      required
                      id="idExpiryDate"
                      name="idExpiryDate"
                      onChange={handleChange}
                      value={values.idExpiryDate}
                      onBlur={handleBlur}
                      className={errors.idExpiryDate ? "input-error" : ""}
                    />
                    {errors.idExpiryDate && touched.idExpiryDate && (
                      <p className="error">{errors.idExpiryDate}</p>
                    )}
                  </label>
                ) : null}
              </div>
              <div className="input-field">
                {data === "Passport" ? (
                  <label htmlFor="copyPassport">
                    Attach Copy of Passport:
                    <input
                      type="file"
                      required
                      id="copyPassport"
                      name="copyPassport"
                      onChange={(e)=>setCopyPassport(e.target.files[0])}
                      value={values.copyPassport}
                      onBlur={handleBlur}
                      className={errors.copyPassport ? "input-error" : ""}
                    />
                    {errors.copyPassport && touched.copyPassport && (
                      <p className="error">{errors.copyPassport}</p>
                    )}
                  </label>
                ) : null}
              </div>
            </div>

            <div className="buttons">
              <div className="backBtn">
                <i className="uil uil-navigator"></i>
                <span className="btnText">Back</span>
              </div>
              <button className="sumbit" disabled={isSubmitting}>
                <span className="btnText">Submit</span>
                <i className="uil uil-navigator"></i>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
    </div>
  );
}
export default UserForm;
