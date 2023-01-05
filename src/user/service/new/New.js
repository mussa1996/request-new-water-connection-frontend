import './new.css'
import {useState,useEffect} from 'react';
import cogoToast from 'cogo-toast';
import { useHistory ,Link} from 'react-router-dom';
import axios from 'axios';

function AddService(){
    const history = useHistory();
    const [name,setName]=useState('');
const handleSubmit=async(e)=>{
    const token = localStorage.getItem('userToken')
    console.log("service",token)
    e.preventDefault();
    const formData=new FormData();
    formData.append('name',name);
   axios.post('http://localhost:4500/api/service/create',formData,{ headers: {"Authorization" : `Bearer ${token}`} })
    .then(res=>{
        cogoToast.success('Service Added Successfully',{position:'top-center'});
        history.push('/user/service/list');
    })
    .catch(err=>{
        cogoToast.error('To add award failed, try again',{position:'top-center'});
        history.push('/service/new');
        console.log(err.message);
    })
}
    
   

    return (
        <div className="container">
            <form>
           
  <input type="text" placeholder="Name" onChange={(e)=>setName(e.target.value)} className="form-control" required /><br/>
  <button  onClick={handleSubmit} className="btnb">Add Service</button>
  <Link to="/user/service/list">
  <button  className="btnbb">Back</button>
            </Link>

               
               </form>
        </div>
    )
}
export default AddService;