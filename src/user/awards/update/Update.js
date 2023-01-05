import './update.css'
import {useState,useEffect} from 'react';
import cogoToast from 'cogo-toast';
import { useHistory ,Link} from 'react-router-dom';
import axios from 'axios';

function AddAward(){
    const history = useHistory();
    const [award_type,setAwardType]=useState('');
    const [display_name,setDisplayName]=useState('');
    const [year,setYear]=useState('');
    const [images,setImages]=useState('');
    const queryParams = new URLSearchParams(window.location.pathname);
    const params = window.location.pathname.split("/");
    const id = params[params.length - 1];
    const [award,setAward]=useState([]);
      
      const handleUpdate = (id) => {
        const queryParams = new URLSearchParams(window.location.pathname);
        const params = window.location.pathname.split("/");
         id = params[params.length - 1];
        axios.get(`http://localhost:4500/api/award/getOne?id=${id}`)
        .then(res=>{
            
          setAward(res.data.award); 
          setAwardType(res.data.award.award_type);
            setDisplayName(res.data.award.display_name);
            setYear(res.data.award.year);
            // setImages(res.data.award.images);
            console.log("test",res.data.award);

            
        })
  
        .catch(err=>{
            console.log(err);
        })
    };
    useEffect(()=>{
       handleUpdate()
  }
  ,[])
  const rowData=award

const handleSubmit=async(e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.append('display_name',display_name);
    formData.append('award_type',award_type);
    formData.append('year',year);
    formData.append('images',images);
    console.log("formData",formData);
    console.warn("data for update",{display_name,award_type,year,images});
   axios.put(`http://localhost:4500/api/award/update?id=${id}`,formData)
    .then(res=>{
        cogoToast.success('Award Updated Successfully',{position:'top-center'});
        history.push('/user/award/list');
    })
    .catch(err=>{
        cogoToast.error('To update award failed, try again',{position:'top-center'});
        history.push(`/user/award/update/${id}`);
        console.log(err.message);
    })
}
    
   

    return (
        <div className="container">
            <form>
           
  <input type="text" placeholder="Award Name" value={display_name} onChange={(e)=>setDisplayName(e.target.value)} className="form-control"/><br/>
  <input type="text" placeholder="Award Type" value={award_type} onChange={(e)=>setAwardType(e.target.value)} className="form-control"/><br/>
  <input type="text" placeholder="Year"  value={year} onChange={(e)=>setYear(e.target.value)} className="form-control"  /><br/>
  <input type="file" placeholder="image"  onChange={(e)=>setImages(e.target.files[0])} className="form-control"/>
  <button  onClick={handleSubmit} className="btnb">Update Award</button>
  <Link to="/user/award/list">
  <button  className="btnbb">Back</button>
            </Link>
               
               </form>
        </div>
    )
}
export default AddAward;