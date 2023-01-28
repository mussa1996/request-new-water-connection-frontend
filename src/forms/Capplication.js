import React, { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
// import "../../dashboard/style.css"
import "./new-appl.css"
import { Link } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Header from '../admin/adminDashboard/Header';
import Menu from '../admin/adminDashboard/Menu';
import { useLocation } from 'react-router-dom';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(request);
  const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [oneRequest, setOneRequest] = useState([]);

    const [newStatus,setNewStatus]=useState('')
    // const [comment,setComment]=useState('')

  const token = localStorage.getItem('userToken')
  const details = jwt_decode(token);
  console.log("details log in", details)
  console.log(token)

  let location = useLocation();
  let searchParams = new URLSearchParams(location.search);
  let id = searchParams.get('id');
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

  // const handleView = (id) => {
  //   axios.get(`http://localhost:4500/api/admin/getOne/branch?id=${id}`)
  //     .then(res => {

  //       // setBranch(res.data.cust);  

  //     })

  //     .catch(err => {
  //       console.log(err);
  //     })
  // };
  // useEffect(() => {
  //   handleView()
  // }
  //   , [])

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

// add comment and update status of request

async function addCommentAndUpdateRequest(e) {
  // add comment to comments table
  e.preventDefault();
  try {
    const commentResponse = await axios.post(`http://localhost:4500/api/comment/create?request=${id}`, { comment:newComment });
    console.log("add comment testing",commentResponse);

    // update status of request in requests table
    const requestResponse = await axios.put(`http://localhost:4500/api/admin/update/status/`, { _id:id,status: newStatus});
    console.log("update request testing ",requestResponse);
  } catch(error) {
    console.log(error);
  }
}

const handleView = () => {
 
  axios.get(`http://localhost:4500/api/admin/getOne/request?id=${id}`,{ headers: {"Authorization" : `Bearer ${token}`} })
  .then(res=>{
      console.log("res in application",res.data.cust)
    setOneRequest(res.data.cust);  
      
  })

  .catch(err=>{
      console.log(err);
  })
};
useEffect(()=>{
handleView()
}
,[])
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

const handleSubmitComment = (e) => {
  e.preventDefault();
  setComments([...comments, newComment]);
  setNewComment('');
}
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

          <h4 className="title-appl">Application Review</h4>
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
          <div style={{display:"flex"}}>
            <div >
            <h style={{fontSize:"20px",fontWeight:"300",color: "black",padding:"30px"}}>Names</h> 
            <p style={{fontSize:"15px",fontWeight:"200",color: "grey-green"}}>{oneRequest.first_name+" "+oneRequest.last_name}</p> 
            </div>
            <div>
            <h style={{fontSize:"20px",fontWeight:"300",color: "black",padding:"10px"}}>Telephone     </h>
            <p style={{fontSize:"15px",fontWeight:"200",color: "grey-green"}}>{oneRequest.phone}</p>
            </div>
            <div>
            <h style={{fontSize:"20px",fontWeight:"300",color: "black",padding:"10px"}}>    Document Number</h>
            <p style={{fontSize:"15px",fontWeight:"200",color: "grey-green"}}>{oneRequest._id}</p>
            </div>
            <div>
            <h style={{fontSize:"20px",fontWeight:"300",color: "black",padding:"60px"}}>Email</h>
            <p style={{fontSize:"15px",fontWeight:"200",color: "grey-green"}}>{oneRequest.email}</p>
            </div>
            <div>
            <h style={{fontSize:"20px",fontWeight:"300",color: "black",padding:"10px"}}>Country</h>
            <p style={{fontSize:"15px",fontWeight:"200",color: "grey-green"}}>{oneRequest.country}</p>
            </div>
            <div>
            <h style={{fontSize:"20px",fontWeight:"300",color: "black",padding:"10px"}}>Branch Name</h>
            <p style={{fontSize:"15px",fontWeight:"200",color: "grey-green"}}>{oneRequest.branch_name}</p>
            </div>
            <div>
            <h style={{fontSize:"20px",fontWeight:"300",color: "black",padding:"20px"}}>Status</h>
            <p style={{fontSize:"15px",fontWeight:"200",color: "grey-green"}}>{oneRequest.status}</p>
            </div>
          </div>








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
                       onChange={e => setNewStatus(e.target.value)}
                      >
                        <option disabled selected>
                          Select Decision
                        </option>
                        <option value="Proposed to Approved">PROPOSE TO APPROVE</option>
                        <option value="Returned">RETURN TO APPLICANT</option>
                        <option value="Approved">APPROVED</option>
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
            {
            
            
            comments.map((comment, index) => (
                <p key={index}>
  <div className="card-body" style={{backgroundColor:"#eee"}}>

<div className="card-text">
  <div className="row">
    <div className="col-md-6">
      <div className="card-text" style={{display:"flex", flexDirection: "row", margin:" 4px 80px"}}>
           <p style={{}}>Mussa</p>  <p style={{}}>Date</p> <p style={{paddingRight:"-200px"}}>Status</p>
        </div>
        <hr  style={{marginLeft:"50px", color: '#eee', backgroundColor: '#000000', height:.5, borderColor : '#000000', width:"1150px"
}}/>
        <h style={{marginLeft:"-400px"}}>comment</h>
         <p style={{marginLeft:"0px"}}>{comment}</p>
        </div>
        </div>
        </div>
          
</div>

                </p>
            ))}

          </div>
            {/* // display Comments here // */}
            <form onSubmit={addCommentAndUpdateRequest}>
          <label className="title-appl">Comments</label>
          <textarea name="comment" id="comment" cols="100" rows="5"  value={newComment} onChange={e => setNewComment(e.target.value)}></textarea>
          <div className='confirm-btn'>
            <button className='btn-conf' type="submit" >Confirm</button>

          </div>
          </form>
        </div>


      </div>
    </>

  )

}
export default NewApplicant;