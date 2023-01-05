import './update.css'
import {useState,useEffect} from 'react';
import cogoToast from 'cogo-toast';
import { useHistory ,Link} from 'react-router-dom';
import axios from 'axios';

function UpdateService(){
    const history = useHistory();
    const [name,setName]=useState('');
    const queryParams = new URLSearchParams(window.location.pathname);
    const params = window.location.pathname.split("/");
    const id = params[params.length - 1];
    const [service,setService]=useState([]);
      
      const handleUpdate = (id) => {
        const queryParams = new URLSearchParams(window.location.pathname);
        const params = window.location.pathname.split("/");
         id = params[params.length - 1];
        axios.get(`http://localhost:4500/api/service/getOne?id=${id}`)
        .then(res=>{
            
          setService(res.data.service); 
          setName(res.data.service.name);
            console.log("test",res.data.service);

            
        })
  
        .catch(err=>{
            console.log(err);
        })
    };
    useEffect(()=>{
       handleUpdate()
  }
  ,[])
  const rowData=service

const handleSubmit=async(e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.append('name',name);
    console.log("formData",formData);
    console.warn("data for update",{name});
   axios.put(`http://localhost:4500/api/service/update?id=${id}`,formData)
    .then(res=>{
        cogoToast.success('Service Updated Successfully',{position:'top-center'});
        history.push('/user/service/list');
    })
    .catch(err=>{
        cogoToast.error('To update service failed, try again',{position:'top-center'});
        history.push(`/user/service/update/${id}`);
        console.log(err.message);
    })
}
    
   

    return (
        <div className="container">
            <form>

            <input type="text" placeholder="Service Name" value={name} onChange={(e)=>setName(e.target.value)} className="form-control"/><br/>
 
  <button  onClick={handleSubmit} className="btnb">Update Service</button>

  <Link to="/user/service/list">
  <button  className="btnbb">Back</button>
            </Link>
               </form>
        </div>
    )
}
export default UpdateService;