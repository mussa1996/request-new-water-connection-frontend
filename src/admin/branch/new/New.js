import './new.css'
import {useState,useEffect} from 'react';
import cogoToast from 'cogo-toast';
import { useHistory,Link } from 'react-router-dom';
import axios from 'axios';

function AddBranch(){
    
    const history = useHistory();
    const [branch,setBranch]=useState('')
    const [branchCode,setBranchCode]=useState('');
    const [branchName,setBRanchName]=useState('');
const handleSubmit=async(e,values, props)=>{
    const token = localStorage.getItem('userToken')
    console.log(token);
    e.preventDefault();
    console.log("testing value",values);
    console.log("testing props",props);
    const formData=new FormData();
    formData.append('branch_code',branchCode);
    formData.append('branch_name',branchName);
   axios.post('http://localhost:4500/api/branch/create',formData,{ headers: {"Authorization" : `Bearer ${token}`} })
    .then(res=>{
        cogoToast.success('Branch Added Successfully',{position:'top-center'});
        history.push('/admin/branch/list');
    })
    .catch(err=>{
        cogoToast.error('To add branch failed, try again',{position:'top-center'});
        history.push('/admin/branch/new');
        console.log(err.message);
    })
}
    
   

    return (
        <div className="container">
            {/* {(props)=>( */}
            <form>
           
  <input type="text" placeholder="Branch Code" onChange={(e)=>setBranchCode(e.target.value)} className="form-control" required /><br/>
  <input type="text" placeholder="Branch Name"  onChange={(e)=>setBRanchName(e.target.value)} className="form-control" required/><br/>
  <button  onClick={handleSubmit} className="btnb">Add</button>
  <Link to="/admin/branch/list">
  <button  className="btnbb">Back</button>
            </Link>

               
               </form>
            {/* )} */}
        </div>
    )
}
export default AddBranch;