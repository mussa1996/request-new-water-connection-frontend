import './update.css'
import {useState,useEffect} from 'react';
import cogoToast from 'cogo-toast';
import { useHistory ,Link} from 'react-router-dom';
import axios from 'axios';

function UpdateBranch(){

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
        <div  style={styleInside.body}>
            <div className="container-branch" >
            {/* {(props)=>( */}
            <form>
                <label className="laber-input">Branch Code:</label>
                <input type="text" placeholder="Branch Code" value={branchCode} onChange={(e) => setBranchCode(e.target.value)} className="form-control" required="Branch code is required" /><br />
                <label className="laber-input">Branch Name:</label>
                <input type="text" placeholder="Branch Name"  value={branchName} onChange={(e) => setBranchName(e.target.value)} className="form-control" required="Branch name is required" /><br />
                {/* <button  onClick={handleSubmit} className="btnb">Add</button> */}
                {/* <Link to="/admin/branch/list">
  <button  className="btnbb">Back</button>
            </Link> */}


                <div className="buttonses">
                    <Link to="/admin/branch/list">
                        <div className="backBtnes">
                            <i className="uil uil-navigator"></i>

                            <span className="btnTextes">Back</span>
                        </div>
                    </Link>
                    <div>
                        <button onClick={handleSubmit} type="submit" className="add-btn">
                            <span className="btnTextes">Update Branch</span>
                        </button>

                    </div>
                </div>

            </form>
            {/* )} */}
            </div>
        </div>
    )

}
export default UpdateBranch;