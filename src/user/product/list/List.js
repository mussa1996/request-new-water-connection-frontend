import './list.css'
import React, {useEffect,useState} from 'react';
import {Link } from 'react-router-dom';
import axios from 'axios';
import { DataGrid,GridColDef } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import jwt_decode from "jwt-decode";
const columns= [
    { field: '_id', headerName: 'ID', width: 70, hide: true },
    { field: 'name', headerName: 'Product Name', width: 130 },
    { field: 'price', headerName: 'Product Price', width: 130 },
    { field: 'description', headerName: 'Description', width: 130 },
    { field: 'business_id', headerName: 'Business Name', width: 130,
    renderCell: (params) => {
      return (
        <div>
          {params.row.business_id.name}
        </div>
      );
    }
  
  },
    { field: 'photo', headerName: 'Photo', width: 200 ,
    renderCell: (params) => {
      console.log("parama",params)
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.photo} alt="avatar" />
            {params.row.name}
          </div>
        );
      },
     
},

    

];

const List=()=>{
    const [product,setProduct]=useState([]);
    const [search,setSearch]=useState('');
    const getProductData=()=>{
      const user= localStorage.getItem('userToken');
      const decoded = jwt_decode(user);
      const userId=decoded._id;
        axios.get(`http://localhost:4500/api/product/getProductById?business_id=${userId}`)
        .then(res=>{
          setProduct(res.data.product);
          console.log("product data",res.data.product);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    useEffect(()=>{
      getProductData();
    }
    ,[])
    const rowData=product;
   
        const [data, setData] = useState(rowData);
        
        const handleDelete = (id) => {
            axios.delete(`http://localhost:4500/api/product/delete?id=${id}`)
            .then(res=>{
                console.log(res);
                getProductData();  
            })

            .catch(err=>{
                console.log(err);
            })
        };
        const handleView = (id) => {
          axios.get(`http://localhost:4500/api/product/getOne?id=${id}`)
          .then(res=>{
              console.log(res);
              getProductData();  
          })

          .catch(err=>{
              console.log(err);
          })
      };
        const actionColumn = [
            {
              field: "action",
              headerName: "Action",
              width: 200,
              renderCell: (params) => {
                return (
                  <div className="cellAction">
                    <Link to={`/user/product/single/${params.row.id}`} style={{ textDecoration: "none" }}>
                      <div className="viewButton" onClick={() => handleView(params.row.id)} >View</div>
                    </Link>
                    <div
                      className="deleteButton"
                      onClick={() => handleDelete(params.row.id)}
                    >
                      Delete
                    </div>
                    <Link to={`/user/product/update/${params.row.id}`}style={{ textDecoration: "none" }}>
                      <div className="viewButton" onClick={() => handleView(params.row.id)} >Update</div>
                    </Link>
                  </div>
                );
              },
            },
          ];
         
        const handleSearch = (e) => {
            setSearch(e.target.value);
            const searchData = rowData.filter((item) => {
              if(search==""){
                return item;
              }
              else if(item.display_name.toLowerCase().includes(e.target.value.toLowerCase()))
                return item ;
            });
            setData(searchData);
            
        };
        
        return (
          <><div className="datatableTitle">
            <div className='tableTitle'>
            Product Lists
            </div>

            <Link to="/product/new" className="link">
              Add New
            </Link>
          </div>
          <div style={{ height: 500, width: '100%' }}>
              {/* <input type="text" placeholder='Search' className='search' onChange={handleSearch}></input> */}
              <DataGrid
                rows={rowData}
                columns={columns.concat(actionColumn)}
                pageSize={7}
                getRowId={(row) => row.id}
                rowsPerPageOptions={[7]}
                checkboxSelection />
            </div></>
          );


         
}


export default List;
