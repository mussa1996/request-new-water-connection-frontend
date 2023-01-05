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
  const [user,setUser]=useState([]);
    const [search,setSearch]=useState('');
    
    const handleView = (id) => {
      const queryParams = new URLSearchParams(window.location.pathname);
      const params = window.location.pathname.split("/");
       id = params[params.length - 1];
      axios.get(`http://localhost:4500/api/admin/getOne?id=${id}`)
      .then(res=>{
          
          setUser(res.data.business); 
          
      })

      .catch(err=>{
          console.log(err);
      })
  };
  useEffect(()=>{
    handleView()
}
,[])
const rowData=user
console.log("user",user);
  return (
    <div className="single">
      {/* <Sidebar /> */}
      <div className="singleContainer">
        {/* <Navbar /> */}
        <div className="top">
          <div className="left">
            <Link to="/user/list">
            <div className="editButton" >Back</div>
            </Link>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={rowData.photo}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="title">Business Details</h1>
                <div className="detailItem">
                  <span className="itemKey">Business Name:</span>
                  <span className="itemValue">{rowData.name}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Owner Name:</span>
                  <span className="itemValue">{rowData.owner_name}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{rowData.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{rowData.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                    {rowData.address}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Website:</span>
                  <span className="itemValue">{rowData.website}</span>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div> */}
        </div>
        <div className="bottom">
        <h1 className="title">List of business</h1>
          <List/>
        </div>
      </div>
    </div>
  );
};

export default Single;
