import './new.css'
import {useState,useEffect} from 'react';
import cogoToast from 'cogo-toast';
import { useHistory,Link } from 'react-router-dom';
import axios from 'axios';

function AddAward(){
    const history = useHistory();
    const [award_type,setAwardType]=useState('');
    const [display_name,setDisplayName]=useState('');
    const [year,setYear]=useState('');
    const [images,setImages]=useState('');
const handleSubmit=async(e)=>{
    const token = localStorage.getItem('userToken')
    console.log("token",token);
    e.preventDefault();
    const formData=new FormData();
    formData.append('display_name',display_name);
    formData.append('award_type',award_type);
    formData.append('year',year);
    formData.append('images',images);
   axios.post('http://localhost:4500/api/award/create',formData,{ headers: {"Authorization" : `Bearer ${token}`} })
    .then(res=>{
        cogoToast.success('Award Added Successfully',{position:'top-center'});
        history.push('/user/award/list');
    })
    .catch(err=>{
        cogoToast.error('To add award failed, try again',{position:'top-center'});
        history.push('/award/new');
        console.log(err.message);
    })
}
    
   

    return (
        <div className="container">
            <form>
           
  <input type="text" placeholder="Award Name" onChange={(e)=>setDisplayName(e.target.value)} className="form-control" required /><br/>
  <input type="text" placeholder="Award Type"  onChange={(e)=>setAwardType(e.target.value)} className="form-control" required/><br/>
  <input type="text" placeholder="Year"  onChange={(e)=>setYear(e.target.value)} className="form-control" required /><br/>
  <input type="file" placeholder="image" onChange={(e)=>setImages(e.target.files[0])} className="form-control" required/>
  <button  onClick={handleSubmit} className="btnb">Add Award</button>
  <Link to="/user/award/list">
  <button  className="btnbb">Back</button>
            </Link>
               
               </form>
        </div>
    )
}
export default AddAward;