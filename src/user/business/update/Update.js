import './update.css'
import {useState,useEffect} from 'react';
import cogoToast from 'cogo-toast';
import { useHistory,Link } from 'react-router-dom';
import axios from 'axios';

function UpdateBusiness(){
    const history = useHistory();
    const [name,setName]=useState('');
    const [owner_name,setOwnerName]=useState('');
    const [address,setAddress]=useState('');
    const[phone,setPhone]=useState('');
    const[website,setWebsite]=useState('');
    const [photo,setPhoto]=useState('');
    const queryParams = new URLSearchParams(window.location.pathname);
    const params = window.location.pathname.split("/");
    const id = params[params.length - 1];
    const [business,setBusiness]=useState([]);
      
      const handleUpdate = (id) => {
        const queryParams = new URLSearchParams(window.location.pathname);
        const params = window.location.pathname.split("/");
         id = params[params.length - 1];
        axios.get(`http://localhost:4500/api/admin/getOne?id=${id}`)
        .then(res=>{
            
          setBusiness(res.data.business); 
          setName(res.data.business.name);
            setOwnerName(res.data.business.owner_name);
            setAddress(res.data.business.address);
            setPhone(res.data.business.phone);
            setWebsite(res.data.business.website);
            setPhoto(res.data.business.photo);
            

            
        })
  
        .catch(err=>{
            console.log(err);
        })
    };
    useEffect(()=>{
       handleUpdate()
  }
  ,[])
  const rowData=business;

const handleSubmit=async(e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.append('name',name);
    formData.append('owner_name',owner_name);
    formData.append('address',address);
    
    formData.append('photo',photo);
    formData.append('phone',phone);
    formData.append('website',website);
    console.log("formData",formData);
    console.warn("data for update",{name,owner_name,address,photo,phone,website});
   axios.put(`http://localhost:4500/api/business/update?id=${id}`,formData)
    .then(res=>{
        cogoToast.success('Business Updated Successfully',{position:'top-center'});
        history.push('/user/list');
    })
    .catch(err=>{
        cogoToast.error('To update business failed, try again',{position:'top-center'});
        history.push(`/user/service/update/${id}`);
        console.log(err.message);
    })
}

    return (
        <div className="container">
            <form>

            <input type="text" placeholder="Business Name" value={name} onChange={(e)=>setName(e.target.value)} className="form-control"/><br/>
  <input type="text" placeholder="Owner Name" value={owner_name} onChange={(e)=>setOwnerName(e.target.value)} className="form-control"/><br/>
 
  <input type="text" placeholder="Address"  value={address} onChange={(e)=>setAddress(e.target.value)} className="form-control"  /><br/>
    <input type="text" placeholder="Phone" value={phone} onChange={(e)=>setPhone(e.target.value)} className="form-control"/><br/>
  <input type="file" placeholder="photo"  onChange={(e)=>setPhoto(e.target.files[0])} className="form-control"/><br/>
  <input type="text" placeholder="Website" value={website} onChange={(e)=>setWebsite(e.target.value)} className="form-control"/><br/>
  <button  onClick={handleSubmit} className="btnb">Update Business</button>
  <Link to="/user/list">
  <button  className="btnbb">Back</button>
            </Link>
               
               </form>
        </div>
    )
}
export default UpdateBusiness;