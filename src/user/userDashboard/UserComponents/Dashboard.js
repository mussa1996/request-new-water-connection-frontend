import React, { Component } from 'react'
// import Counts from '../../../helper/userCount/business'
import {useState,useEffect} from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../../../dashboard/style.css"
let counts;
let product;
let award;
let service;
let user;
let decoded;
export default class Dashboard extends Component {
  
  constructor(props) {
    super(props);
    this.state = {message: '',
  message1: '',
  message2: '',
  message3: ''
  };
  }
  

 
  async componentDidMount() {
    try {
      user = localStorage.getItem('userToken');
    decoded = jwt_decode(user);
    console.log(decoded._id);
      Promise.all([
        fetch(`http://localhost:4500/api/business/countById?id=${decoded._id}`),
        fetch(`http://localhost:4500/api/product/countById?business_id=${decoded._id}`),
        fetch(`http://localhost:4500/api/award/countById?business_id=${decoded._id}`),
        fetch(`http://localhost:4500/api/service/countById?business_id=${decoded._id}`)
      ]).then(async ([res1, res2, res3, res4]) => {
        const data1 = await res1.json();
        const data2 = await res2.json();
        const data3 = await res3.json();
        const data4 = await res4.json();
        console.log(data1.data);
        console.log(data2.data);
        console.log(data3.data);
        console.log(data4.data);
        this.setState({
          message: data1.data,
          message1: data2.data,
          message2: data3.data,
          message3: data4.data
        });
      }
      );
    } catch (err) {
      console.log(err);
    }
  }
           
 
    render() {
     

        return (
            <div>
  <div className="content-wrapper">
{/* <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2 home">
          <nav>
          <div className="col-sm-6"> 
          <div className="sidebar-button">
        <i className="far fa-gride-2 nav-icon" />
        <span className="dashboard">Dashboard</span>
      </div>
      <div className="search-box">
        <input type="text" placeholder="Search..."/>
        <i className='bx bx-search' >
        <i className="nav-icon fas fa-light fa-magnifying-glass" />
        </i>
      </div>
      <div className="profile-details">
        <i className="nav-icon fas fa-solid fa-user" />
        <span className="admin_name">Mussa Niyo</span>
        <i className='bx bx-chevron-down' ></i>
      </div>
          </div>
          </nav>
        </div>
      </div>
    </div> */}
  
{/* my applicatio section  */}
<section className='card-container'>
  {/* my application and button for apply */}
  <div  className='button-for-apply'>
    <div>
      <p>My applications <span>Total:0</span></p>
    </div>
    <div>
    
      <button className='apply'>
        APPLY NOW 
      </button>
    </div>
  </div>
  {/* search button for document */}
  <div className='search-button'>
  <div className="search-box">
        <input type="text" placeholder="Search..." className='input-text'/>
        <button className='button-search'>  <i className='bx bx-search' ></i> Search</button>
       
      </div>
  </div>
  {/* list of all document  */}
<div className='list-all-doc'>
  
</div>
</section>
    </div>
</div>

        )
    }
}