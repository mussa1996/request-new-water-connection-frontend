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
  
    
    {/* Sidebar */}
    <div className="sidebar">
      {/* Sidebar user panel (optional) */}

      <div className="sidebar">
    <div className="logo-details">
    <i className="nav-icon fas fa-thin fa-water" />
      <span className="logo_name">WASAC</span>
    </div>
      <ul className="nav-links">
        <li className='main-page'>
        
          <a href="#" className="active">
          <i className="nav-icon fas fa-duotone fa- fa-house" />
            <span className="links_name">Main Page</span>
          </a>
        </li>
        <li>
          <a href="#">
          <i className="nav-icon fas fa-regular fa-house-chimney" />
            <span className="links_name">My Application</span>
          </a>
        </li>
       
        
        <li>
          <a href="#">
          <i className="nav-icon fas fa-regular fa-gear" />
            <span className="links_name">Setting</span>
          </a>
        </li>
        <li className="log_out">
          <a href="#">
          <i className="nav-icon fas fa-solid fa-right-from-bracket" />
            <span className="links_name">Log out</span>
          </a>
        </li>
      </ul>
  </div>
    </div>
    {/* /.sidebar */}
  </aside>
</div>



        )
    }
    
}