import './list.css'
import React, {useEffect,useState} from 'react';
import {Link } from 'react-router-dom';
import axios from 'axios';
import { DataGrid,GridColDef } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import Menu from '../../adminDashboard/Menu';
import Header from "../../adminDashboard/Header"

const columns= [
    { field: '_id', headerName: 'ID', width: 70, hide: true },
    { field: 'branch_code', headerName: 'Branch Code', width: 150 },
    { field: 'branch_name', headerName: 'Branch Name', width: 150 },

];

const List=()=>{
 
    const [branch,setBranch]=useState([]);
    const [search,setSearch]=useState('');
    const getbranchData=()=>{
        axios.get('http://localhost:4500/api/admin/getAll/branch')
        .then(res=>{
            setBranch(res.data.pro);
            console.log("branch data",res.data.pro);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    useEffect(()=>{
        getbranchData();
    }
    ,[])
    const rowData=branch;
   
        const [data, setData] = useState(rowData);
        
        const handleDelete = (id) => {
            axios.delete(`http://localhost:4500/api/admin/delete/branch?id=${id}`)
            .then(res=>{
                console.log(res);
                getbranchData();  
            })

            .catch(err=>{
                console.log(err);
            })
        };
        const handleView = (id) => {
          axios.get(`http://localhost:4500/api/admin/getOne/branch?id=${id}`)
          .then(res=>{
              
              setBranch(res.data.cust);  
              
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
              width: 300,
              renderCell: (params) => {
                return (
                  <div className="cellAction">
                    <div>
                    <Link to={`/admin/branch/update/${params.row._id}`}style={{ textDecoration: "none" }}>
                      <div className="btn btn-success" onClick={() => handleView(params.row._id)} >Update</div>
                    </Link>
                    </div>
                    <Link to={`/view-branch-details?id=${params.row._id}`} style={{ textDecoration: "none" }}>
                      <div className="btn btn-primary" onClick={() => handleView(params.row._id)} >View</div>
                
                    </Link>

                    <div
                      className="btn btn-danger"
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

            <Link to="/admin/branch/new" className="link">
              Add New
            </Link>
          </div>
          <Menu />
          <div style={{ height: 500, width: '100%',paddingLeft:'300px',paddingTop:'30px',paddingRight:'100px'}}>
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
