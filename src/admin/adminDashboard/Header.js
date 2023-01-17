import React, { Component,useEffect,useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from 'react-router-dom';
import jwt_decode from "jwt-decode";
import WasacImage from "../../images/wasac.png"
const Header=() =>{
  const [logout,setLogout]=useState('')
    const token = localStorage.getItem('userToken')
 const   details=jwt_decode(token);
   console.log("user detail",details)
   useEffect(()=>{
    setLogout();
}
,[])
        return (
           <div>
  <Box sx={{ flexGrow: 1 }} className="header-all">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           <Link to="/" className='home-link'>
           Home
            </Link>

          </Typography>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
             <div className="image-logo">
          <img src={WasacImage} alt="User Image" className="img-circle elevation-2" style={{height:"50px",width:'50px'}} />
          <Link to="/" className='home-link-title'>
           Request New Water Connection System
            </Link>
          </div>
           

          </Typography>
          <i class="fa-solid fa-user">
              <Link to="/cart-list" className='home-link'>
          <Button color="inherit">{details.fullname}</Button>
            </Link>
          </i>
           
          <Button variant="contained"  onClick={()=>{
         logout = localStorage.removeItem('userToken');
         setLogout({logout:logout})
           window.location.href = '/login';
            }}>Log Out</Button>
        </Toolbar>
      </AppBar>
    </Box>
    
   
</div>

        )
    
}
export default Header