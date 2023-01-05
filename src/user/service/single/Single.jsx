import "./single.scss";
import List from "../list/List";
import React, {useEffect,useState} from 'react';
import {Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from "react-router-dom";
const Single = () => {
  const queryParams = new URLSearchParams(window.location.pathname);
  const params = window.location.pathname.split("/");
  const id = params[params.length - 1];
  const [service,setService]=useState([]);
    const [search,setSearch]=useState('');
    
    const handleView = (id) => {
      const queryParams = new URLSearchParams(window.location.pathname);
      const params = window.location.pathname.split("/");
       id = params[params.length - 1];
      axios.get(`http://localhost:4500/api/service/getOne?id=${id}`)
      .then(res=>{
          
        setService(res.data.service); 
          console.log("test",res.data.service);
          
      })

      .catch(err=>{
          console.log(err);
      })
  };
  useEffect(()=>{
    handleView()
}
,[])
const rowData=service
console.log("user",service);
  return (
    <div className="single">
      {/* <Sidebar /> */}
      <div className="singleContainer">
        {/* <Navbar /> */}
        <div className="top">
          <div className="left">
          <Link to="/user/service/list">
            <div className="editButton" >Back</div>
            </Link>
            <h1 className="title">Information</h1>
            <div className="item">
             
              <div className="details">
                <h1 className="title">Service Details</h1>
                <div className="detailItem">
                  <span className="itemKey">Service Name:</span>
                  <span className="itemValue">{rowData.name}</span>
                </div>
               
                <div className="detailItem">
                  <span className="itemKey">Business:</span>
                  <span className="itemValue">{rowData.business_id}</span>
                </div>
                
              </div>
            </div>
          </div>
          {/* <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div> */}
        </div>
        <div className="bottom">
        <h1 className="title">List of all Services</h1>
          <List/>
        </div>
      </div>
    </div>
  );
};

export default Single;
