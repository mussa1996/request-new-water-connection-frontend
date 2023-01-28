import React, { useState, useEffect } from "react";
import "./view-user-details.css";
import axios from "axios";
import {Link } from 'react-router-dom';
import {useHistory} from 'react-router-dom'
import { useLocation } from 'react-router-dom';
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
 
  const [value, setValue] = useState([]);
  const [user,setUser]=useState([]);
  const token = localStorage.getItem('userToken');
  
   
    let location = useLocation();
let searchParams = new URLSearchParams(location.search);
let id = searchParams.get('id');

const handleView = () => {
 
  axios.get(`http://localhost:4500/api/user/getOne?id=${id}`,{ headers: {"Authorization" : `Bearer ${token}`} })
  .then(res=>{
    console.log("user data",res.data.user);
    setUser(res.data.user);  
    
      
  })

  .catch(err=>{
      console.log(err);
  })
};
useEffect(()=>{
handleView()
}
,[])

  let data = value;
  return (
    <div style={styleInside.body}>
    <div className="user-containerss" >
      <header>User Details</header>

      <form>
        <div className="forms second">
          <div className="details personal">
            <span className="title">Personal Details</span>

            <div className="field-views">
              <div className="input-views">
                <label className="label-fonts">FullName: </label>
                <label className="label-datas" >{user.fullname}</label>
              </div>
              <div className="input-views">
                <label className="label-fonts">Email: </label>
                <label className="label-datas" >{user.email}</label>
              </div>

              <div className="input-views">
                <label className="label-fonts">Phone: </label>
                <label className="label-datas" >{user.phone}</label>
              </div>
            </div>

            <div className="buttonss">
              <Link to={`/admin/user/list`}>
              <div className="backBtns">
                <i className="uil uil-navigator"></i>
                
                <span className="btnTexts">Back</span>
              </div>
              </Link>
             
            </div>
          </div>
          
        </div>
        
      </form>
    </div>
    </div>
  );
}
export default UserForm;
