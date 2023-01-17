import './list.css'
import React, {useEffect,useState} from 'react';
import {Link } from 'react-router-dom';
import axios from 'axios';
import { DataGrid,GridColDef } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import Menu from '../../adminDashboard/Menu';
import jwt_decode from "jwt-decode";
import Header from "../../adminDashboard/Header"
const columns= [
    { field: '_id', headerName: 'ID', width: 70, hide: true },
    { field: 'fullname', headerName: 'Names', width: 130 },
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'phone', headerName: 'Phone', width: 130 },
    { field: 'isVerified', headerName: 'Verify Status', width: 130 },

];

const List=()=>{
 
    const [user,setUser]=useState([]);
    const [search,setSearch]=useState('');
    const token = localStorage.getItem('userToken')
    const details=jwt_decode(token);
    console.log("details log in",details)
    console.log(token)
    const getuserData=()=>{
      axios.get('http://localhost:4500/api/admin/getAll',{ headers: {"Authorization" : `Bearer ${token}`} })
        .then(res=>{
            setUser(res.data.data);
            console.log("user data",res.data.data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    useEffect(()=>{
        getuserData();
    }
    ,[])
    const rowData=user;
   
        const [data, setData] = useState(rowData);
        
        const handleDelete = (id) => {
          axios.delete(`http://localhost:4500/api/admin/delete?id=${id}`,{ headers: {"Authorization" : `Bearer ${token}`} })
            .then(res=>{
                console.log(res);
                getuserData();  
            })

            .catch(err=>{
                console.log(err);
            })
        };
        const handleView = (id) => {
          axios.get(`http://localhost:4500/api/admin/getOne?id=${id}`)
          .then(res=>{
              
              setUser(res.data.cust);  
              
          })

          .catch(err=>{
              console.log(err);
          })
      };
      useEffect(()=>{
        handleView()
    }
    ,[])
        const actionColumn = [
            {
              field: "action",
              headerName: "Action",
              width: 200,
              renderCell: (params) => {
                return (
                  <div className="cellAction">
                    <Link to={`/admin/user/single/${params.row._id}`} style={{ textDecoration: "none" }}>
                      <div className="viewButton" onClick={() => handleView(params.row._id)} >View</div>
                
                    </Link>

                    <div
                      className="deleteButton"
                      onClick={() => handleDelete(params.row._id)}
                    >
                      Delete
                    </div>
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
        
        return (
          <>
          <Header />
          <div className="datatableTitle">
            <div className='tableTitle'>
            Branch Lists
            </div>
          </div >
          <Menu /><div className='table_column' style={{ height: 500, width: '100%',paddingLeft:'300px',paddingTop:'30px',paddingRight:'100px'}}>
            {/* <input type="text" placeholder='Search' className='search' onChange={handleSearch}></input> */}
            <DataGrid
              rows={rowData}
              columns={columns.concat(actionColumn)}
              pageSize={7}
              getRowId={(row) => row._id}
              rowsPerPageOptions={[7]}
              checkboxSelection />
          </div></>
          );


         
}


export default List;
