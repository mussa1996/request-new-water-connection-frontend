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
  const [product,setProduct]=useState([]);
    const [search,setSearch]=useState('');
    
    const handleView = (id) => {
      const queryParams = new URLSearchParams(window.location.pathname);
      const params = window.location.pathname.split("/");
       id = params[params.length - 1];
      axios.get(`http://localhost:4500/api/product/getOne?id=${id}`)
      .then(res=>{
          
        setProduct(res.data.product); 
          console.log("test",res.data.product);
          
      })

      .catch(err=>{
          console.log(err);
      })
  };
  useEffect(()=>{
    handleView()
}
,[])
const rowData=product
console.log("testing name",rowData);
  return (
    <div className="single">
      {/* <Sidebar /> */}
      <div className="singleContainer">
        {/* <Navbar /> */}
        <div className="top">
          <div className="left">
          <Link to="/user/product/list">
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
                <h1 className="title">Product Details</h1>
                <div className="detailItem">
                  <span className="itemKey">Product Name:</span>
                  <span className="itemValue">{rowData.name}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Price:</span>
                  <span className="itemValue">{rowData.price}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Description:</span>
                  <span className="itemValue">{rowData.description}</span>
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
        <h1 className="title">List of all products</h1>
          <List/>
        </div>
      </div>
    </div>
  );
};

export default Single;
