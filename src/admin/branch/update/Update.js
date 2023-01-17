import './update.css'
import {useState,useEffect} from 'react';
import cogoToast from 'cogo-toast';
import { useHistory ,Link} from 'react-router-dom';
import axios from 'axios';

function UpdateBranch(){
    const history = useHistory();
    const [branchCode,setBranchCode]=useState('');
    const [branchName,setBranchName]=useState('');
    const queryParams = new URLSearchParams(window.location.pathname);
    const params = window.location.pathname.split("/");
    const id = params[params.length - 1];
    const [branch,setBranch]=useState([]);
      
      const handleUpdate = (id) => {
        const queryParams = new URLSearchParams(window.location.pathname);
        const params = window.location.pathname.split("/");
         id = params[params.length - 1];
        axios.get(`http://localhost:4500/api/admin/getOne/branch?id=${id}`)
        .then(res=>{
            
          setBranch(res.data.cust); 
          setBranchCode(res.data.cust.branch_code);
            setBranchName(res.data.cust.branch_name);
            console.log("test update",res.data.cust);

            
        })
  
        .catch(err=>{
            console.log(err);
        })
    };
    useEffect(()=>{
       handleUpdate()
  }
  ,[])
  const rowData=branch

const handleSubmit=async(e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.append('branch_code',branchCode);
    formData.append('branch_name',branchName);
    console.log("formData",formData);
    console.warn("data for update",{branchCode,branchName});
   axios.post(`http://localhost:4500/api/admin/update/branch?id=${id}`,formData)
    .then(res=>{
        cogoToast.success('Branch Updated Successfully',{position:'top-center'});
        history.push('/admin/branch/list');
    })
    .catch(err=>{
        cogoToast.error('To update branch failed, try again',{position:'top-center'});
        history.push(`/admin/branch/update/${id}`);
        console.log(err.message);
    })
}
    
   

    return (
        <div className="container">
            <form>
            <input type="text" placeholder="Branch Code" value={branchCode} onChange={(e)=>setBranchCode(e.target.value)} className="form-control"/><br/>
            <input type="text" placeholder="Branch Name" value={branchName} onChange={(e)=>setBranchName(e.target.value)} className="form-control"/><br/>
  
  <button  onClick={handleSubmit} className="btnb">Update</button>
  <Link to="/admin/branch/list">
  <button  className="btnbb">Back</button>
            </Link>
               
               </form>
        </div>
    )
}
export default UpdateBranch;