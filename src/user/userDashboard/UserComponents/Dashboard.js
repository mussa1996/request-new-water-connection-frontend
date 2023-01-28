import React, { Component,useState,useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../../../dashboard/style.css"
import {Link } from 'react-router-dom';

function Dashboard (props){
  const [requestData,setRequestData]=useState([])
  const[countRequest,setCountRequest]=useState([])
  const [showSubmit, setShowSubmit] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [request,setRequest]=useState([])
  const token = localStorage.getItem('userToken')
  const handleShowEdit = () => {
    setShowEdit(true);
    setShowSubmit(false);
  }

  const handleHideEdit = () => {
    setShowEdit(false);
    setShowSubmit(true);
  }
  
  const getRequestData=()=>{
    const user= localStorage.getItem('userToken');
     const decoded = jwt_decode(user);
     console.log("decoded is:",decoded._id);
     const userId=decoded._id;
     
       axios.get(`http://localhost:4500/api/client_form/getClientById?user_id=${userId}`)
       .then(res=>{
        setRequestData(res.data.form);
          console.log("request data  is:",res.data.form);
       })
       .catch(err=>{
           console.log(err);
       })
   }
   const countrequest=()=>{
    const user= localStorage.getItem('userToken');
     const decoded = jwt_decode(user);
     console.log("decoded is:",decoded._id);
     const userId=decoded._id;
     
       axios.get(`http://localhost:4500/api/client_form/CountClientByUserId?user_id=${userId}`)
       .then(res=>{
        setCountRequest(res.data.data);
          console.log("request data  is:",res.data.data);
       })
       .catch(err=>{
           console.log(err);
       })
   }
  useEffect(()=>{
    getRequestData();
    countrequest();
  },[])
  // console.log("request data first name is:",requestData.first_name);
  console.log("request data is:",requestData)

  requestData.map((data,index)=>{
   
    console.log("request data is loop:",data.first_name)
  })

  let responseSent = false;
  const handleView = (id) => {
    axios.get(`http://localhost:4500/api/client_form/getOne?id=${id}`,{ headers: {"Authorization" : `Bearer ${token}`} })
    .then(res=>{
        console.log("request data  is:",res.data.cust);
        if(!responseSent){
            setRequest(res.data.cust);
            responseSent = true;
        } 
    })
    .catch(err=>{
        console.log(err);
    })
  };
  useEffect(()=>{
  handleView()
  }
  ,[])

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
        <span className="admin_name">Mussa Niyo</span>zz
        <i className='bx bx-chevron-down' ></i>
      </div>
          </div>
          </nav>
        </div>
      </div>
    </div> */}
  
{/* my applicatio section  */}
<section className='card-containers'>
  {/* my application and button for apply */}
  <div  className='button-for-apply'>
    <div>
      <p>My applications <span className='NApplication'>Total: {countRequest}</span></p>
    </div>
    <div>
    <Link to={`/user/user-form`}>
    <button className='apply'>
        APPLY NOW 
      </button>
    </Link>
     
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
{

  requestData.map((data,index)=>{
    let date = new Date(data.creation_date);
    let formattedDate =date.toLocaleDateString();
    return <div key={index}>


    <div className='list-all-doc'>
 
  <div>
    <p className='doc-title'>Request New Water Connection<span>-</span> <span className='doc-number'>Document Number:{data.id}</span></p>
    </div>
    
        <div className='client-info'>
        <p className='client-name'>Client Name: <span>{data.first_name} </span> {data.last_name} <span></span> 
         <span className='date-creation'> Date creation:{formattedDate} </span>  
         <span className='phone'> Phone:{data.phone} </span>
        </p>
        </div>
        <div className="buttons-both">
              <div className="details-btn">
                <i className="uil uil-navigator"></i>

                <Link to={`/view-request-details?id=${data.id}`} style={{ textDecoration: "none" }}>
                      <div className="viewButton" onClick={() => handleView(data.id)} >
                        <span className="btnText">Details</span></div>
                
                    </Link>
                
              </div>
             {
                data.status==='Returned' ? ( 
                <Link to={`/user/update-form?id=${data.id}`} style={{ textDecoration: "none" }}>
                <button className="edit" onClick={()=>handleView(data.id)}>
                <span className="btnText">Edit Application</span> 
                <i className="uil uil-navigator"></i>
              </button>
               </Link>
                ):null
  }
              {
                data.status==='Pending'?
                (
               <button className="submit" onClick={handleHideEdit}>
                <span className="btnText">Submitted</span>
                <i className="uil uil-navigator"></i>
              </button>
                ):null
              }
            </div>
</div>
</div>
  })
}
</section>
    </div>
</div> 

        )
    
}
export default Dashboard;