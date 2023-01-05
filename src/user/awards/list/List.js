import './list.css'
import React, {useEffect,useState} from 'react';
import {Link } from 'react-router-dom';
import axios from 'axios';
import { DataGrid,GridColDef } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import jwt_decode from "jwt-decode";

// let business=null;
// ;
// console.log("business data",business)
// departments.filter(item=>item.departmentId==formData[i].departmentId).map(item=>item.departmentName)
const List=()=>{
  
 const  [business,setBusiness]=useState('')
  
  const columns= [
    { field: '_id', headerName: 'ID', width: 70, hide: true },
    { field: 'award_type', headerName: 'Award Type', width: 130 },
    { field: 'display_name', headerName: 'Award Name', width: 130 },
    { field: 'year', headerName: 'Year', width: 130 },
    { field: 'business_id', headerName: 'Business Name', width: 130,
    renderCell: (params) => {
      return (
        <div>
          {params.row.business_id.name}
        </div>
      );
    }},
    { field: 'photo', headerName: 'Photo', width: 200 ,
    renderCell: (params) => {
      // console.log("parama",params)
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.images} alt="avatar" />
            {params.row.display_name}
          </div>
        );
      },
}
    

];
    const [award,setAward]=useState([]);
    const [search,setSearch]=useState('');
    
    const businessData=()=>{
      axios.get('http://localhost:4500/api/admin/getAll')
      .then(res=>{
        setBusiness(res.data.data);
        // console.log("business data",res.data.data);
      })
      .catch(err=>{
          console.log(err);
      })
  }
    useEffect(()=>{
      businessData();
    },[])
    const getAwardData=()=>{
      const user= localStorage.getItem('userToken');
      const decoded = jwt_decode(user);
      const userId=decoded._id;
        axios.get(`http://localhost:4500/api/award/getAwardById?business_id=${userId}`)
        .then(res=>{
          setAward(res.data.award);
          console.log("award data",res.data.award);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    useEffect(()=>{
      getAwardData();
    }
    ,[])
    var rowData=award;
   
        const [data, setData] = useState(rowData);
        
        const handleDelete = (id) => {
            axios.delete(`http://localhost:4500/api/award/delete?id=${id}`)
            .then(res=>{
                console.log(res);
                getAwardData();  
            })

            .catch(err=>{
                console.log(err);
            })
        };
        const handleView = (id) => {
          axios.get(`http://localhost:4500/api/award/getOne?id=${id}`)
          .then(res=>{
              console.log(res);
              getAwardData();  
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
                    <Link to={`/user/award/single/${params.row._id}`}style={{ textDecoration: "none" }}>
                      <div className="viewButton" onClick={() => handleView(params.row._id)} >View</div>
                    </Link>
                    <div
                      className="deleteButton"
                      onClick={() => handleDelete(params.row._id)}
                    >
                      Delete
                    </div>
                    <Link to={`/user/award/update/${params.row._id}`}style={{ textDecoration: "none" }}>
                      <div className="viewButton" onClick={() => handleView(params.row._id)} >Update</div>
                    </Link>
                  </div>
                );
              },
            },
          ];
         
        
      
     
        const handleSearchChange = async (e) => {
          setSearch(e.target.value);
          const searchData = await rowData.filter((item) => {
            if(search==""){
              return item;
            }
            else if(item.display_name.toLowerCase().includes(search.toLowerCase()))
              return item ;
          });
          setData(searchData);
          rowData=data;
          console.log("search data",rowData);
        };
       
        return (
          <>
          <div className="datatableTitle">
          <div className='tableTitle'>
          Award Lists
            </div>
           
            <Link to="/award/new" className="link">
              Add New
            </Link>
          </div>
 
            <div style={{ height: 500, width: '100%' }}>
              {/* <input type="text" placeholder='Search'  className='search' onChange={handleSearchChange}/>
              */}
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
