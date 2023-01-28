import './new.css'
import { useState, useEffect } from 'react';
import cogoToast from 'cogo-toast';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';

function AddBranch() {


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
    const [branch, setBranch] = useState('')
    const [branchCode, setBranchCode] = useState('');
    const [branchName, setBranchName] = useState('');
    const handleSubmit = async (e, values, props) => {
        const token = localStorage.getItem('userToken')
        console.log(token);
        e.preventDefault();
        console.log("testing value", values);
        console.log("testing props", props);
        const formData = new FormData();
        formData.append('branch_code', branchCode);
        formData.append('branch_name', branchName);
        axios.post('http://localhost:4500/api/branch/create', formData, { headers: { "Authorization": `Bearer ${token}` } })
            .then(res => {
                cogoToast.success('Branch Added Successfully', { position: 'top-center' });
                history.push('/admin/branch/list');
            })
            .catch(err => {
                cogoToast.error('To add branch failed, try again', { position: 'top-center' });
                history.push('/admin/branch/new');
                console.log(err.message);
            })
    }



    return (
        <div  style={styleInside.body}>
            <div className="container-branch" >
            {/* {(props)=>( */}
            <form>
                <label className="laber-input">Branch Code:</label>
                <input type="text" placeholder="Branch Code" onChange={(e) => setBranchCode(e.target.value)} className="form-control" required="Branch code is required" /><br />
                <label className="laber-input">Branch Name:</label>
                <input type="text" placeholder="Branch Name" onChange={(e) => setBranchName(e.target.value)} className="form-control" required="Branch name is required" /><br />
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
                            <span className="btnTextes">Add Branch</span>
                        </button>

                    </div>
                </div>

            </form>
            {/* )} */}
            </div>
        </div>
    )





}
export default AddBranch;