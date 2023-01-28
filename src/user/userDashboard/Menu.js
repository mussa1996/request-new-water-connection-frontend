import React, { Component } from 'react'
import {Nav,Navbar,NavDropdown,Form,FormControl} from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import jwt_decode from "jwt-decode";
const Menu =()=> {

  const history = useHistory();

  const handleLogout = () => {
    // remove user's authentication information from the application's state
    localStorage.removeItem('token');
    // redirect the user to the login page
    history.push('/login');
  };

    
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
        
          <a href="/user-dashboard" className="active">
          <i className="nav-icon fas fa-duotone fa- fa-house" />
            <span className="links_name">Main Page</span>
          </a>
        </li>
        <li>
          <a href="/user-dashboard">
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
        <button onClick={handleLogout}>
        <li className="log_out">
          <i className="nav-icon fas fa-solid fa-right-from-bracket" />
            <span className="links_name" style={{color:'white'}}>Log out</span>
        </li>
        </button>
       
      </ul>
  </div>
    </div>
    {/* /.sidebar */}
  </aside>
</div>



        )
    
    
}

export default Menu;