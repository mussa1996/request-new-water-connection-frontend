import './list.css'
import React, {useEffect,useState} from 'react';
import {Link } from 'react-router-dom';
import axios from 'axios';
import { DataGrid,GridColDef } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import jwt_decode from "jwt-decode";
const columns=[
    { field: '_id', headerName: 'ID', width: 70, hide: true },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'business_id', headerName: 'Business Name', width: 130,
    renderCell: (params) => {
      return (
        <div>
          {params.row.business_id.name}
        </div>
      );
    }
  },
    

];

const List=()=>{
    const [service,setService]=useState([]);
    const [search,setSearch]=useState('');
    const getServiceData=()=>{
      const user= localStorage.getItem('userToken');
      const decoded = jwt_decode(user);
      const userId=decoded._id;
        axios.get(`http://localhost:4500/api/service/getServiceById?business_id=${userId}`)
        .then(res=>{
          setService(res.data.service);
          console.log("award data",res.data.service);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    useEffect(()=>{
      getServiceData();
    }
    ,[])
    const rowData=service;
   
        const [data, setData] = useState(rowData);
        
        const handleDelete = (id) => {
            axios.delete(`http://localhost:4500/api/service/delete?id=${id}`)
            .then(res=>{
                console.log(res);
                getServiceData();  
            })

            .catch(err=>{
                console.log(err);
            })
        };
        const handleView = (id) => {
          axios.get(`http://localhost:4500/api/service/getOne?id=${id}`)
          .then(res=>{
              console.log(res);
              getServiceData();  
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
                    <Link to={`/user/service/single/${params.row._id}`} style={{ textDecoration: "none" }}>
                      <div className="viewButton" onClick={() => handleView(params.row._id)} >View</div>
                    </Link>
                    <div
                      className="deleteButton"
                      onClick={() => handleDelete(params.row._id)}
                    >
                      Delete
                    </div>
                    <Link to={`/user/service/update/${params.row._id}`}style={{ textDecoration: "none" }}>
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
              else if(item.display_name.toLowerCase().includes(e.target.value.toLowerCase()))
                return item ;
            });
            setData(searchData);
            
        };
        
        return (
  <>
  <div className="datatableTitle">
  <div className='tableTitle'>
          Service Lists
            </div>
            <Link to="/service/new" className="link">
              Add New
            </Link>
          </div>
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
            </div> </>
          );


         
}


export default List;
