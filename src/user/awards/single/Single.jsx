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
  const [award,setAward]=useState([]);
    const [search,setSearch]=useState('');
    
    const handleView = (id) => {
      const queryParams = new URLSearchParams(window.location.pathname);
      const params = window.location.pathname.split("/");
       id = params[params.length - 1];
      axios.get(`http://localhost:4500/api/award/getOne?id=${id}`)
      .then(res=>{
          
        setAward(res.data.award); 
          console.log("test",res.data.award);
          
      })

      .catch(err=>{
          console.log(err);
      })
  };
  useEffect(()=>{
    handleView()
}
,[])
const rowData=award
console.log("testing name", rowData)
console.log("user",award);
  return (
    <div className="single">
      {/* <Sidebar /> */}
      <div className="singleContainer">
        {/* <Navbar /> */}
        <div className="top">
          <div className="left">
          <Link to="/user/award/list">
            <div className="editButton" >Back</div>
            </Link>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={rowData.images}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="title">Award Details</h1>
                <div className="detailItem">
                  <span className="itemKey">Award Type:</span>
                  <span className="itemValue">{rowData.award_type}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Owner Name:</span>
                  <span className="itemValue">{rowData.display_name}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Year:</span>
                  <span className="itemValue">{rowData.year}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Business Id:</span>
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
        <h1 className="title">List of all awards</h1>
          <List/>
        </div>
      </div>
    </div>
  );
};

export default Single;
