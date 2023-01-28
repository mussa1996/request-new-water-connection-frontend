import React, { useState, useEffect } from "react";
import "./view-request-details.css";
import axios from "axios";
import {Link } from 'react-router-dom';
import cogoToast from 'cogo-toast';
import {useHistory} from 'react-router-dom'
import JsFileDownloader from 'js-file-downloader';
import { useLocation } from 'react-router-dom';
import FileDownloader from 'js-file-downloader';
function UserForm() {

  const styleInside={
    body:{
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "hwb(204 35% 3%)",
}
    
  }
 
    const history = useHistory();
  const [value, setValue] = useState([]);
  const [request,setRequest]=useState([]);
  const token = localStorage.getItem('userToken');
  
    //retrieve branch data
    const [options, setOptions] = useState([]);
   
    //   const queryParams = new URLSearchParams(window.location);
    //  console.log("testing query",queryParams)
    //  const params = window.location.pathname.split("?");
    //  console.log("testing params",params)
    // const id = params[params.length-1];
    // console.log("testing id",id)
    let location = useLocation();
let searchParams = new URLSearchParams(location.search);
let id = searchParams.get('id');
    useEffect(() => {
      async function fetchData() {
        const response = await fetch('http://localhost:4500/api/admin/getAll/branch');
        const data = await response.json();
        setOptions(data.pro);
      }
      fetchData();
    }, []);
  const download=async(url)=>{
      
    url.preventDefault();
    axios.get(`http://localhost:4500/api/client_form/getOne?id=${id}`,{ headers: {"Authorization" : `Bearer ${token}`} })
    .then(res=>{
      const fileUrl = res.data.cust.id_image;
      console.log("request data image",res.data.cust.id_image);
      url=res.data.cust.id_image
      // JsFileDownloader(res.data.cust.id_image,'application/pdf','identification.pdf')
      // const fileDownloader = new FileDownloader();
      // fileDownloader.download(url, 'document.pdf');

      new JsFileDownloader({ 
        url: fileUrl
      })


        cogoToast.success('Downloaded Successfully',{position:'top-center'});
        history.push('/view-request-details');
    }
    )
      .catch(err=>{
        cogoToast.error('Failed to downloading file, try again',{position:'top-center'});
        history.push('/view-request-details');
        console.log(err.response.data);
    }
    )
   
    
}

const handleView = () => {
 
  axios.get(`http://localhost:4500/api/client_form/getOne?id=${id}`,{ headers: {"Authorization" : `Bearer ${token}`} })
  .then(res=>{
      
    setRequest(res.data.cust);  
      
  })

  .catch(err=>{
      console.log(err);
  })
};
useEffect(()=>{
handleView()
}
,[])

  let data = value;
  return (
    <div style={styleInside.body}>
    <div className="user-containers" >
      <header>Request Details</header>

      <form>
        <div className="forms second">
          <div className="details personal">
            <span className="title">Personal Details</span>

            <div className="field-view">
              <div className="input-view">
                <label className="label-font">First Name</label>
                <label className="label-data" >{request.first_name}</label>
              </div>
              <div className="input-view">
                <label className="label-font">Last Name</label>
                <label className="label-data" >{request.last_name}</label>
              </div>

              <div className="input-view">
                <label className="label-font">Date of Birth</label>
                <label className="label-data" >{request.dob}</label>
              </div>

              <div className="input-view">
                <label className="label-font">Email</label>
                <label className="label-data"  >{request.email}</label>
              </div>

              <div className="input-view">
                <label  className="label-font">Mobile Number</label>
                <label className="label-data"  >{request.phone}</label>
              </div>

              <div className="input-view">
                <label className="label-font">Gender</label>
                <label className="label-data"  >{request.gender}</label>
              </div>


              <div className="input-view">
                <label className="label-font">Occupation</label>
                <label className="label-data" >{request.occupation}</label>
              </div>
              <div className="input-view">
                <label></label>
                <label ></label>
              </div>
            </div>
          </div>
          

          <div className="details address">
            <span className="title" >Address Details</span>

            <div className="field-view">
              <div className="input-view">
                <label className="label-font">Country</label>
                <label className="label-data" >{request.country}</label>
              </div>
              <div
                className="input-view"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <label className="label-font">Province</label>
                <label className="label-data" >{request.province}</label>
              </div>
              <div className="input-view">
                <label className="label-font">District</label>
                <label className="label-data" >{request.district}</label>
              </div>

              <div className="input-view">
                <label className="label-font">Sector</label>
                <label className="label-data"  >{request.sector}</label>
              </div>

              <div className="input-view">
                <label className="label-font">Cell</label>
                <label className="label-data"  >{request.cell}</label>
              </div>
            </div>
          </div>

          <div className="details Services">
            <span className="title">Services Details</span>

            <div className="field-view">
              <div className="input-view">
                <label  className="label-font">Branch Name</label>
                <label className="label-data"  >{request.branch_name}</label>
              </div>

              <div className="input-view">
                <label className="label-font">Water Usage</label>
                <label className="label-data"  >{request.water_usage}</label>
              </div>

              <div className="input-view">
                <label className="label-font">Plot Number</label>
                <label className="label-data"  >{request.plot_number}</label>
              </div>

              <div className="input-view">
                <label className="label-font">Creation Date</label>
                <label className="label-data" >{request.creation_date}</label>
              </div>
            </div>
          </div>

          <div className="details ID">
            <span className="title">Identity Details</span>

            <div className="field-view">
              <div className="input-view">
                
                  <label className="label-font">
                    ID Number:  </label>
                    <label className="label-data"  >{request.id_number}</label>
               
                  <label className="label-font">
                    Passport Number:
                    
                  </label>
                  <label className="label-data" >{request.passport}</label>
                
              </div>

              <div className="input-view">
               
                  <label className="label-font">
                    Attach Copy of Id:
                    
                  </label>
                  <button   className="download" onClick={(e)=>download(e)} >Download</button>
               
              </div>

              <div className="input-view">
                
                  <label className="label-font">
                    Issued Date:
                    
                  </label>
                  <label className="label-data" >{request.issued_date}</label>
                
              </div>

              <div className="input-view">
                
                  <label  className="label-font"> Expiry Date: </label>
                  <label className="label-data" >{request.expiry_date}</label>
               
              </div>
              <div className="input-view">
                
                  <label className="label-font">
                    Attach Copy of Passport:
                    
                  </label>
                 <button className="download" onClick={(e)=>download(e)}>Download</button>
               
              </div>
              <div className="input-view">
                
                  <label>
                    
                  </label>
                  <label></label>
               
              </div>
            </div>

            <div className="buttons">
              <Link to={`/return-application`}>
              <div className="backBtn">
                <i className="uil uil-navigator"></i>
                
                <span className="btnText">Back</span>
              </div>
              </Link>
             
            </div>
          </div>
        </div>
      </form>
    </div>
    </div>
  );
}
export default UserForm;
