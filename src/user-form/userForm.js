import React, { useState, useEffect } from "react";
import "./style.css";
import { Provinces, Districts, Sectors, Cells, Villages } from "rwanda";
import { Kigali, East, North, South, West } from "rwanda/data/provinces";
import axios from "axios";
function UserForm() {
  const [value, setValue] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedSector, setSelectedSector] = useState(null);
    const [selectedCell, setSelectedCell] = useState(null);
    const [selectedVillage, setSelectedVillage] = useState(null);
  useEffect(() => {
    const fetchProvinces = async () => {
      const response = await Provinces();
      return await response;
    };

    const fetchDistricts = async () => {
      const response = await Districts();
      console.log("testing response", response);
      return await response;
    };

    // Fetch list of provinces and districts from the server

    fetchProvinces().then((provinces) => setProvinces(provinces));
    fetchDistricts().then((districts) => setDistricts(districts));
  }, []); // empty dependency array means this effect only runs on mount

  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
  };
  // const options = {
  //   method: 'GET',
  //   url: 'https://rwanda.p.rapidapi.com/provinces',
  //   headers: {
  //     'X-RapidAPI-Key': '92a4a641c8mshba56327123ed080p1ef082jsn89abbd1327b9',
  //     'X-RapidAPI-Host': 'rwanda.p.rapidapi.com'
  //   }
  // };

  // axios.request(options).then(function (response) {
  // 	console.log("good data",response.data);
  // }).catch(function (error) {
  // 	console.error(error);
  // });
  

  console.log("string test",selectedProvince)
  return (
    <div className="user-container">
      <header>Client information request form</header>

      <form action="#">
        <div className="form first">
          <div className="details personal">
            <span className="title">Personal Details</span>

            <div className="fields">
              <div className="input-field">
                <label>First Name</label>
                <input
                  type="text"
                  placeholder="Enter your  first name"
                  required
                />
              </div>
              <div className="input-field">
                <label>Last Name</label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  required
                />
              </div>

              <div className="input-field">
                <label>Date of Birth</label>
                <input type="date" placeholder="Enter birth date" required />
              </div>

              <div className="input-field">
                <label>Email</label>
                <input type="text" placeholder="Enter your email" required />
              </div>

              <div className="input-field">
                <label>Mobile Number</label>
                <input
                  type="number"
                  placeholder="Enter mobile number"
                  required
                />
              </div>

              <div className="input-field">
                <label>Gender</label>
                <select required>
                  <option disabled selected>
                    Select gender
                  </option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Others</option>
                </select>
              </div>

              <div className="input-field">
                <label>Occupation</label>
                <input
                  type="text"
                  placeholder="Enter your ccupation"
                  required
                />
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
                <label>Province</label>
                <select required onChange={handleProvinceChange}>
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
                <label>District</label>
                <select required onChange={handleDistrictChange}>
                  <option disabled selected value={null} defaultValue={null}>
                    --Choose--
                  </option>
                  {Districts(selectedProvince).map((district, index) => {
                    return <option key={index}>{district}</option>;
                  })}
                </select>
              </div>

              <div className="input-field">
                <label>Sector</label>
                <select required>
                  <option disabled selected value={null} defaultValue={null}>
                    --Choose--
                  </option>
                  {Sectors().map((sector, index) => {
                    return <option key={index}>{sector}</option>;
                  })}
                </select>
              </div>

              <div className="input-field">
                <label>Cell</label>
                <select required>
                  <option disabled selected value={null} defaultValue={null}>
                    --Choose--
                  </option>
                  {Cells().map((cell, index) => {
                    return <option key={index}>{cell}</option>;
                  })}
                </select>
              </div>
            </div>
          </div>

          <div className="details Services">
            <span className="title">Services Details</span>

            <div className="fields">
              <div className="input-field">
                <label>Branch Name</label>
                <select required>
                  <option disabled selected>
                    Select Branch
                  </option>
                  <option>Muhanga</option>
                  <option>Kacyiru</option>
                </select>
              </div>

              <div className="input-field">
                <label>Water Usage</label>
                <select required>
                  <option disabled selected>
                    Select Water Usage
                  </option>
                  <option>Residential</option>
                  <option>Commercial</option>
                </select>
              </div>

              <div className="input-field">
                <label>Plot Number</label>
                <input
                  type="text"
                  placeholder="Enter your plot number"
                  required
                />
              </div>

              <div className="input-field">
                <label>Creation Date</label>
                <input type="date" placeholder="Enter creation date" required />
              </div>
            </div>
          </div>

          <div className="details ID">
            <span className="title">Identity Details</span>

            <div className="fields">
              <div className="input-field">
                <label>ID Type</label>
                <select required>
                  <option disabled selected>
                    Select identification
                  </option>
                  <option>Id</option>
                  <option>Passport</option>
                </select>
              </div>

              <div className="input-field">
                <label>ID Number</label>
                <input type="number" placeholder="Enter ID number" required />
              </div>

              <div className="input-field">
                <label>Issued Authority</label>
                <input
                  type="text"
                  placeholder="Enter issued authority"
                  required
                />
              </div>

              <div className="input-field">
                <label>Issued Date</label>
                <input
                  type="date"
                  placeholder="Enter your issued date"
                  required
                />
              </div>

              <div className="input-field">
                <label>Expiry Date</label>
                <input type="date" placeholder="Enter expiry date" required />
              </div>
            </div>

            <div className="buttons">
              <div className="backBtn">
                <i className="uil uil-navigator"></i>
                <span className="btnText">Back</span>
              </div>
              <button className="sumbit">
                <span className="btnText">Submit</span>
                <i className="uil uil-navigator"></i>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
export default UserForm;
