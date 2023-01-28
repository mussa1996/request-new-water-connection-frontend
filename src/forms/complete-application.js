import React, { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
// import "../../dashboard/style.css"
import "./new-appl.css"
import { Link } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Header from '../admin/adminDashboard/Header';
import Menu from '../admin/adminDashboard/Menu';
import { ItemMeta } from 'semantic-ui-react';

const columns = [
  { field: '_id', headerName: 'ID', width: 70, hide: true },
  { field: 'first_name', headerName: 'Names', width: 130 },
  { field: 'email', headerName: 'Email', width: 130 },
  { field: 'phone', headerName: 'Phone', width: 130 },
  { field: 'gender', headerName: 'Gender', width: 130 },
  { field: 'country', headerName: 'Country', width: 130 },
  { field: 'branch_name', headerName: 'Branch Name', width: 130 },
  { field: 'status', headerName: 'Status', width: 130 },

];
const NewApplicant = () => {

  const [request, setRequest] = useState([]);
  const [oneRequest,setOneRequest]=useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [filteredData, setFilteredData] = useState(request.slice(0, entriesToShow));
  const token = localStorage.getItem('userToken')
  const details = jwt_decode(token);
  console.log("details log in", details)
  console.log(token)
  // const getrequestData = () => {
  //   axios.get('http://localhost:4500/api/client_form/getRequestByPending', { headers: { "Authorization": `Bearer ${token}` } })
  //     .then(res => {
  //       setRequest(res.data.form);
  //       console.log("request data", res.data.form);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  // }
  // useEffect(() => {
  //   getrequestData();
  // }
  //   , [])
  const rowData = request;

  console.log("row data", rowData)
  const handleShow10 = () => {
    setEntriesToShow(10);
    setFilteredData(request.slice(0, 10));
  };
  
  const handleShow20 = () => {
    setEntriesToShow(20);
    setFilteredData(request.slice(0, 20));
  };

  useEffect(() => {
    fetch('http://localhost:4500/api/client_form/getRequestByCompleted', { headers: { "Authorization": `Bearer ${token}` } })
    .then(res => res.json())
    .then(data => {
      console.log("data", data)
        setRequest(data.form);
        setFilteredData(data.form);
    });
}, []);



  // const handleDelete = (id) => {
  //   axios.delete(`http://localhost:4500/api/admin/delete/branch?id=${id}`)
  //     .then(res => {
  //       console.log(res);
  //       // getbranchData();  
  //     })

  //     .catch(err => {
  //       console.log(err);
  //     })
  // };

  const handleView = (id) => {
   console.log("testing id " ,request._id)
    axios.get(`http://localhost:4500/api/admin/getOne/request?id=${id}`,{ headers: {"Authorization" : `Bearer ${token}`} })
    .then(res=>{
        console.log("handle one id",res.data)
        setOneRequest(res.data.pro);  
        
    })

    .catch(err=>{
        console.log(err.message);
    })
};
useEffect(()=>{
  handleView()
}
,[]) 

  // const actionColumn = [
  //   {
  //     field: "action",
  //     headerName: "Action",
  //     width: 200,
  //     height: 200,
  //     renderCell: (params) => {
  //       return (
  //         <div className="btn-group">

  //           {/* <Link to={`/view-branch-details?id=${params.row._id}`} style={{ textDecoration: "none" }}> */}
  //           <button className="btn btn-primary dropdown-toggle btn-sm" data-toggle="dropdown"
  //             aria-haspopup="true" aria-expanded="false"
  //             onClick={() => handleView(params.row._id)}>
  //             Actions
  //           </button>
  //           <div className="dropdown-menu" >
  //             <a className='dropdown-item'>View details</a>
  //             <a className='dropdown-item'>Applications</a>

  //           </div>

  //           {/* </Link> */}
  //         </div>
  //       );
  //     },
  //   },
  // ];

//   function handleSearchTermChange(e) {
//     setSearchTerm(e.target.value);
// }



// function filteredData()  {
//   setFiltered( rowData.filter(row => row.name.toLowerCase().includes(searchTerm.toLowerCase())))
//   if (filtered.length === 0) {
//     return <tr><td colSpan={2}>No Results Found</td></tr>;
//   }
//   return filtered;
// }
const handleSearch = (e) => {
  setSearchTerm(e.target.value);
  const lowercaseSearchTerm = e.target.value.toLowerCase();
  const newFilteredData = request.filter((item) => {
    return Object.values(item).some((val) =>
      val.toString().toLowerCase().includes(lowercaseSearchTerm)
    );
  });
  console.log("new filtered data", newFilteredData)
  setFilteredData(newFilteredData);
};
console.log("filtered data", filteredData)
  return (
    <>
      <div>

        <Header />
        <Menu />

        {/* my applicatio section  */}

        {/* <div className="cards-containers">
          <div className="card-body">

            <div className="card-text">
              <div className="row">
                <div className="col-md-6">
                  <div className="card-text">
                    <div className="input-field">
                      <label htmlFor="gender">Status</label>
                      <select
                      
                      >
                        <option disabled selected>
                          Select Status
                        </option>
                        <option value="Pending">PENDING</option>
                        <option value="Approved">APPROVED</option>
                        <option value="Returned">RETURN TO APPLICANT</option>
                        <option value="Completed">APPROVED</option>
                        <option value="Rejected">REJECTED</option>

                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}


        <div className="cards-containers2">

          <h4 className="title-appl">Completed Applications</h4>
          {/* 
          <div className="table-style" style={{ height: 500, width: '100%',paddingLeft:'100px',paddingTop:'30px',paddingRight:'50px'}} >
            
            <DataGrid
              rows={rowData}
              columns={columns.concat(actionColumn)}
              pageSize={6}
              getRowId={(row) => row._id}
              rowsPerPageOptions={[5]}
              checkboxSelection />
              
          </div> */}


          <div className="row"><div className="col-sm-12 col-md-6"><div className="dataTables_length" id="kt_datatable1_length">
            <label data-dashlane-label="true">Show <select name="kt_datatable1_length" aria-controls="kt_datatable1"
              className="custom-select custom-select-sm form-control form-control-sm" data-dashlane-rid="f96af9cd51d86fe6"
              data-form-type=""><option value="10" onClick={handleShow10}>10</option><option value="20" onClick={handleShow20} >20</option><option value="50">50
              </option><option value="100">100</option></select> entries</label></div></div><div className="col-sm-12 col-md-6">
              <div id="kt_datatable1_filter" className="dataTables_filter"><label data-dashlane-rid="f2f85b847e81ca4b" data-form-type=""
                data-dashlane-label="true">Search:<input type="search" className="form-control form-control-sm" placeholder="" aria-controls="kt_datatable1"
                  data-dashlane-rid="8b56ec32cdb38ffd" data-form-type="" value={searchTerm} onChange={handleSearch} /></label></div></div></div>



          <div className="col-sm-12">
            <table className="table table-separate table-head-custom table-checkable dataTable no-footer" id="kt_datatable1" role="grid" aria-describedby="kt_datatable1_info" style={{ width: "1200px" }} >
              <thead>
                <tr>
                  <th>#</th>
                <th>Names</th>
                <th>Telephone</th>
                  <th >Document Number</th>
                    <th>Email</th>
                      <th >Country</th>
                     
                      <th >Branch Name</th>
                      <th>Status</th>
                        <th>Actions</th></tr>
              </thead>
              <tbody>
              {

filteredData.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td style={{width:"50px"}}>{index+1}
                      </td>
                      <td style={{width:"300px",paddingLeft:"30px",display:"inline-block"}}>{item.first_name +" "+ item.last_name}</td>
                      <td>{item.phone}</td>
                      <td>{item._id}</td>
                      <td>{item.email}</td>
                      <td>{item.country}</td>
                      <td >{item.branch_name}</td>
                      <td >{item.status}</td>
                      <td>
                        <div className="btn-group">
                          <button type="button" className="btn btn-primary  dropdown-toggle btn-sm" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false" data-dashlane-label="true" data-dashlane-rid="9629f2dfc54b7dc4" data-form-type="">Actions
                          </button>
                          <div className="dropdown-menu" style={{}}>
                            <a className="dropdown-item" href="">
                              View Details</a>
                            <a className="dropdown-item" href={`/view-application?id=${item._id}`} style={{ textDecoration: "none" }}>
                              Applications</a>
                            <a className="dropdown-item" href="">
                              Payment History</a>

                          </div>

                        </div>
                        </td></tr>
                  )
                }
                )
              }





              </tbody>
            </table>
            <div id="kt_datatable1_processing" className="dataTables_processing card" style={{ display: "none" }}>Processing...</div></div>





        </div>



        <div className="cards-containers3">
          <div className="card-body">

            <div className="card-text">
              <div className="row">
                <div className="col-md-6">
                  <div className="card-text">
                    <div className="input-field">
                      <label>Decision</label>
                      <select

                      >
                        <option disabled selected>
                          Select Decision
                        </option>
                        <option value="Proposed to Approved">PROPOSE TO APPROVE</option>
                        <option value="Returned">RETURN TO APPLICANT</option>
                        <option value="Approved">APPROVED</option>
                        <option value="Returned">RETURN TO APPLICANT</option>
                        <option value="Completed">APPROVED</option>
                        <option value="Rejected">REJECTED</option>

                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            {/* // display Comments here // */}


          </div>

          <label className="title-appl">Comments</label>
          <textarea name="" id="" cols="100" rows="5"></textarea>
          <div className='confirm-btn'>
            <button className='btn-conf'>Confirm</button>

          </div>
        </div>


      </div>
    </>

  )

}
export default NewApplicant;