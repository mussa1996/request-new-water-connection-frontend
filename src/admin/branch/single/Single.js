import "./single.scss";
import List from "../list/list";
import React, {useEffect,useState} from 'react';
import {Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from "react-router-dom";
const Single = () => {
  const queryParams = new URLSearchParams(window.location.pathname);
  const params = window.location.pathname.split("/");
  const id = params[params.length - 1];
  const [branch,setBranch]=useState([]);
    const [search,setSearch]=useState('');
    
    const handleView = (id) => {
      const queryParams = new URLSearchParams(window.location.pathname);
      const params = window.location.pathname.split("/");
      console.log("testing params",params)
       id = params[params.length - 1];
       console.log("testing id",id)
       axios.get(`http://localhost:4500/api/admin/getOne/branch?id=${id}`)
      .then(res=>{
          
          setBranch(res.data.cust); 
          console.log("testing branch single",res.data.cust)
          
      })

      .catch(err=>{
          console.log(err);
      })
  };
  useEffect(()=>{
    handleView()
}
,[])
const rowData=branch
console.log("testing rowdata",rowData)
  return (
    <div className="single">
      {/* <Sidebar /> */}
      <div className="singleContainer">
        {/* <Navbar /> */}
        <div className="top">
          <div className="left">
          <Link to="/admin/branch/list">
            <div className="editButton" >Back</div>
            </Link>
            <h1 className="title">Information</h1>
            <div className="item">
              <div className="details">
                <h1 className="title">Branch Details</h1>
                <div className="detailItem">
                  <span className="itemKey">Branch Code:</span>
                  <span className="itemValue">{rowData.branch_code}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Branch Name:</span>
                  <span className="itemValue">{rowData.branch_name}</span>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div> */}
        </div>
        <div className="bottom">
        <h1 className="title">List of all branch</h1>
          <List/>
        </div>
      </div>
    </div>
  );
};

export default Single;
