import './list.css'
import React, {useEffect,useState} from 'react';
import {PropTypes} from 'prop-types';
import {Link } from 'react-router-dom';
import axios from 'axios';
import { DataGrid,GridColDef } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import jwt_decode from "jwt-decode";

const columns= [
    { field: '_id', headerName: 'ID', width: 70, hide: true },
    { field: 'name', headerName: 'Business Name', width: 130 },
    { field: 'owner_name', headerName: 'Owner Name', width: 130 },
    { field: 'category', headerName: 'Category', width: 130 },
    { field: 'address', headerName: 'Address', width: 130 },
    { field: 'phone', headerName: 'Phone', width: 130 },
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'photo', headerName: 'Photo', width: 200 ,
    renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.photo} alt="avatar" />
            {params.row.name}
          </div>
        );
      },
},
    { field: 'website', headerName: 'Website', width: 130 },

];

const List=()=>{
    const [business,setBusiness]=useState([]);
    const [user,setUser]=useState([]);
    const [search,setSearch]=useState('');
    const getBusinessData=()=>{
     const user= localStorage.getItem('userToken');
      const decoded = jwt_decode(user);
      const userId=decoded._id;
      
        axios.get(`http://localhost:4500/api/admin/getOne?id=${userId}`)
        .then(res=>{
            setBusiness([res.data.business]);
            console.log("business data is:",res.data.business);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    
    let rowData=business
    useEffect(()=>{
        getBusinessData();
         
    }
    ,[])
    console.log("business is:",business);
    
    // rowData.push(business);
    
    // console.log("rowData is:",rowData);
        const [data, setData] = useState(rowData);
        
        const handleDelete = (id) => {
            axios.delete(`http://localhost:4500/api/admin/delete?id=${id}`)
            .then(res=>{
                console.log(res);
                getBusinessData();  
            })

            .catch(err=>{
                console.log(err);
            })
        };
        const handleView = (id) => {
          axios.get(`http://localhost:4500/api/admin/getOne?id=${id}`)
          .then(res=>{
              
              setUser(res.data.business);  
              // localStorage.setItem('businessToken', res.data.business);
              // console.log("test in user business",res.data.business);
              
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
                // console.log("testing of param",params.row._id)
                return (
                  <div className="cellAction">
                    <Link to={`/user/single/${params.row._id}`} style={{ textDecoration: "none" }}>
                      <div className="viewButton" onClick={() => handleView(params.row._id)} >View</div>
                    </Link>
                    <div
                      className="deleteButton"
                      onClick={() => handleDelete(params.row._id)}
                    >
                      Delete
                    </div>
                    <Link to={`/user/business/update/${params.row._id}`}style={{ textDecoration: "none" }}>
                      <div className="viewButton" onClick={() => handleView(params.row._id)} >Update</div>
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
              else if(item.name.toLowerCase().includes(e.target.value.toLowerCase()))
                return item ;
                console.log(item.name)
            });
            setData(searchData);
            
        };
        // convert object into array of objects for grid to render correctly  with keys and values
        // const dataArray = 
        // console.log("dataArray",dataArray);
       
        console.log("rowdata",rowData);
        return (

            <div style={{ height: 500, width: '100%' }}>
              {/* <input type="text" placeholder='Search' className='search' onChange={handleSearch}></input> */}
              <DataGrid
                rows={rowData}
                columns={columns.concat(actionColumn)}
                pageSize={7}
                getRowId={(row) => row._id}
                rowsPerPageOptions={[7]}
                checkboxSelection
              />
            </div>
          );


         
}


export default List;
