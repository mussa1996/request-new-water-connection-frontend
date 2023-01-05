import './new.css'
import {useState,useEffect} from 'react';
import cogoToast from 'cogo-toast';
import { useHistory,Link } from 'react-router-dom';
import axios from 'axios';

function AddProduct(){
    
    const history = useHistory();
    const [product,setProduct]=useState('')
    const [name,setName]=useState('');
    const [description,setDescription]=useState('');
    const [price,setPrice]=useState('');
    const [photo,setPhoto]=useState('');
const handleSubmit=async(e,values, props)=>{
    const token = localStorage.getItem('userToken')
    console.log(token);
    e.preventDefault();
    console.log("testing value",values);
    console.log("testing props",props);
    const formData=new FormData();
    formData.append('name',name);
    formData.append('description',description);
    formData.append('price',price);
    formData.append('photo',photo);
   axios.post('http://localhost:4500/api/product/create',formData,{ headers: {"Authorization" : `Bearer ${token}`} })
    .then(res=>{
        cogoToast.success('Product Added Successfully',{position:'top-center'});
        history.push('/user/product/list');
    })
    .catch(err=>{
        cogoToast.error('To add product failed, try again',{position:'top-center'});
        history.push('/product/new');
        console.log(err.message);
    })
}
    
   

    return (
        <div className="container">
            {/* {(props)=>( */}
            <form>
           
  <input type="text" placeholder="Product Name" onChange={(e)=>setName(e.target.value)} className="form-control" required /><br/>
  <input type="text" placeholder="Price"  onChange={(e)=>setPrice(e.target.value)} className="form-control" required/><br/>
  <input type="text" placeholder="Description"  onChange={(e)=>setDescription(e.target.value)} className="form-control" required/><br/>
  <input type="file" placeholder="image" onChange={(e)=>setPhoto(e.target.files[0])} className="form-control" required />
  <button  onClick={handleSubmit} className="btnb">Add Product</button>
  <Link to="/user/product/list">
  <button  className="btnbb">Back</button>
            </Link>

               
               </form>
            {/* )} */}
        </div>
    )
}
export default AddProduct;