import React, { Component } from 'react'
import {Nav,Navbar,NavDropdown,Form,FormControl} from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import jwt_decode from "jwt-decode";
let user;
let decoded;
let photo;
let logout;
export default class Menu extends Component {
  
  constructor(props) {
    super(props);
    this.state = {logout: '',
  user: '',
  decoded: '',
  photo: ''};
  
  
  }
  
  async componentDidMount() {
    user = localStorage.getItem('userToken');
    decoded = jwt_decode(user);
    console.log(decoded.name);
    console.log(decoded.photo);
    this.setState({
      user: decoded.name,
      decoded: decoded,
      photo: decoded.photo
    });
    
  }
    render() {
        return (
        
          
<div>
  <aside className="main-sidebar sidebar-dark-primary elevation-4">
    {/* Brand Logo */}
    
      <span className="logo_name">WASAC</span>
    
    {/* Sidebar */}
    <div className="sidebar">
      {/* Sidebar Menu */}
      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          {/* Add icons to the links using the .nav-icon class
           with font-awesome or any other icon font library */}
          <li className="nav-item has-treeview menu-open">
            <a href="/admin-dashboard" className="nav-link active">
              <i className="nav-icon fas fa-tachometer-alt" />
              <p className='dashb'>
                Dashboard
              </p>
            </a>
          </li>
         
          
          <li className="nav-item has-treeview" >
            <a href="#" className="nav-link">
              <i className="nav-icon fas fa-table" />
              <p>
                Applications
                <i className="fas fa-angle-left right " />
              </p>
            </a>
            <ul className="nav nav-treeview">
            <li className="nav-item">
                <a href="/admin/branch/list" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Branch</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/admin/user/list" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>User</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/admin/request/list" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Request</p>
                </a>
              </li>
            </ul>
          </li>
         
        </ul>
       
      </nav>
      {/* /.sidebar-menu */}
    </div>
    {/* /.sidebar */}
  </aside>
</div>

        )
    }
    
}