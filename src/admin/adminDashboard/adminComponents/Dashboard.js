import React, { Component } from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../../style.css"
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
        fetch(`http://localhost:4500/api/client_form/count`),
        fetch(`http://localhost:4500/api/product/countById?business_id=${decoded._id}`),
        fetch(`http://localhost:4500/api/award/countById?business_id=${decoded._id}`),
        fetch(`http://localhost:4500/api/service/countById?business_id=${decoded._id}`)
      ]).then(async ([res1, res2, res3, res4]) => {
        const data1 = await res1.json();
        const data2 = await res2.json();
        const data3 = await res3.json();
        const data4 = await res4.json();
        console.log("request number",data1);
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
            {/* Main content */}
            <section className="content">
              <div className="container-fluid">
                {/* Small boxes (Stat box) */}
                <div className="row">
                  <div className="col-lg-3 col-6">
                    {/* small box */}
                    <div className="small-box all-appli ">
                      <div className="inner">
                      <h3 className='app-name'>{this.state.message1} All Application</h3>
                        <p >Application</p>
                      </div>
                    </div>
                  </div>
                  {/* ./col */}
                  <div className="col-lg-3 col-6">
                    {/* small box */}
                    <div className="small-box sent-appli "> 
                      <div className="inner">
                      <h3 className='my-name'>{this.state.message2}<sup style={{fontSize: 20}}></sup> My Task</h3>
                        <p>Application Sent to me </p>
                      </div>
                    </div>
                  </div>
                  {/* ./col */}
                  <div className="col-lg-3 col-6">
                    {/* small box */}
                    <div className="small-box new-appli ">
                      <div className="inner">
                      <h3 className='new-name'>{this.state.message1} New Application</h3>
                        <p>New Application</p>
                      </div>
                    </div>
                  </div>
                   </div>
              </div>
            </section>
            <section className="content">
              <div className="container-fluid">
                {/* Small boxes (Stat box) */}
                <div className="row">
                  <div className="col-lg-3 col-6">
                    {/* small box */}
                    <div className="small-box officer ">
                    <div className="icon">
                <i className="ion ion-person-add operson" />
              </div>
                      <div className="inner">
                      <h3>{this.state.message1}</h3>
                        <p>to officer</p>
                      </div>
                    </div>
                  </div>
                  {/* ./col */}
                  <div className="col-lg-3 col-6">
                    {/* small box */}
                    <div className="small-box general"> 
                    <div className="icon">
                <i className="ion ion-person-add gperson" />
              </div>
                      <div className="inner">
                      <h3>{this.state.message2}<sup style={{fontSize: 20}}></sup></h3>
                        <p>to General Manager </p>
                      </div>
                    </div>
                  </div>
                  {/* ./col */}
                  <div className="col-lg-3 col-6">
                    {/* small box */}
                    
                    <div className="small-box complete ">
                    <div className="icon">
                <i className="" />
              </div>
                      <div className="inner">
                      <h3>{this.state.message1} </h3>
                        <p>Completed</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-6">
                    {/* small box */}
                    
                    <div className="small-box return ">
                    <div className="icon">
                <i className="" />
              </div>
                      <div className="inner">
                      <h3>{this.state.message1} </h3>
                        <p>Return to Client</p>
                      </div>
                    </div>
                  </div>
                   </div>
              </div>
            </section>
          </div>
          
        </div>

        )
    }
}