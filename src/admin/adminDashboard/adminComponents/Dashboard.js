import React, { Component } from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link } from 'react-router-dom';
import "../../style.css"
import { Replay5Sharp } from '@material-ui/icons';
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
  message3: '',
  message4:''
  };
  }
  

 
  async componentDidMount() {
    try {
      user = localStorage.getItem('userToken');
    decoded = jwt_decode(user);
    console.log(decoded._id);
      Promise.all([
        fetch(`http://localhost:4500/api/client_form/countAll`),
        fetch(`http://localhost:4500/api/client_form/CountClientByStatusR`),
        fetch(`http://localhost:4500/api/client_form/CountClientByStatusA`),
        fetch(`http://localhost:4500/api/client_form/CountClientByStatusC`),
        fetch(`http://localhost:4500/api/client_form/CountClientByStatusP`),
      ]).then(async ([res1, res2, res3, res4,res5]) => {
        const data1 = await res1.json();
        const data2 = await res2.json();
        const data3 = await res3.json();
        const data4 = await res4.json();
        const data5 = await res5.json();
        console.log("request number",data1);
        console.log("request document returned",data2.data);
        console.log("request document propesed to approve",data3.data);
        console.log("request document returned",data4.data);
        console.log("request document returned",data5.data);
        this.setState({
          message: data1.data,
          message1: data2.data,
          message2: data3.data,
          message3: data4.data,
          message4: data5.data
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
                    <Link to={"/all-application"}>
                    <div className="small-box all-appli ">
                      <div className="inner">
                      <h3 className='app-name'>{this.state.message} All Application</h3>
                        <p >Application</p>
                      </div>
                    </div>
                    </Link>
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
                    <Link to={`/newapply`}>
                    <div className="small-box new-appli ">
                     
                      <div className="inner">
                      <h3 className='new-name'>{this.state.message4} New Application</h3>
                        <p >New Application</p>
                      </div>
                    </div>
                    </Link>
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
                    <Link to={"/"}>
                    <div className="small-box general"> 
                    <div className="icon">
                <i className="ion ion-person-add gperson" />
              </div>
                      <div className="inner">
                      <h3>{this.state.message2}<sup style={{fontSize: 20}}></sup></h3>
                        <p>to General Manager </p>
                      </div>
                    </div>
                    </Link>
                  </div>
                  {/* ./col */}
                  <div className="col-lg-3 col-6">
                    {/* small box */}
                    <Link to={"/complete-application"}>
                    <div className="small-box complete ">
                    <div className="icon">
                <i className="" />
              </div>
                      <div className="inner">
                      <h3>{this.state.message3} </h3>
                        <p>Completed</p>
                      </div>
                    </div>
                    </Link>
                  </div>
                  <div className="col-lg-3 col-6">
                    {/* small box */}
                    <Link to={"/return-application"}>
                    <div className="small-box return ">
                    <div className="icon">
                <i className="" />
              </div>
                      <div className="inner">
                      <h3>{this.state.message1} </h3>
                        <p>Return to Client</p>
                      </div>
                    </div>
                    </Link>
                  </div>
                   </div>
              </div>
            </section>
          </div>
          
        </div>

        )
    }
}