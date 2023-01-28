
import React, { useState,useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./billing.css"
const BillingQuantitiesListScreen = ({history, match}) => {


  const [data, setData] = useState([
    { id: 1, item_description: "", quantity: "", unit_price: "", total_price: "" ,quantity_man:"",quantity_man_he:""
  , total_all: "", total_price_man: "", totalI: "", totalIII:"",vat: "",unit_price_man:"",item_man:"",unit_price_man_he:"",
  approved_by:"",prepared_by:"",verified_by:"",request_id:"",
  },
  ]);

  const handleChange = (e, index, key) => {
    const newData = [...data];
    newData[index][key] = e.target.innerText;
    setData(newData);
  };

  const handleAddRow = () => {
    const newRow = { item_description: '', quantity: '', unit_price: '', total_price: '' };
    setData([...data, newRow]);
  };
    
  
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null
});
const [unitPrice, setUnitPrice] = useState(null);


  //calculating total price for each item
  const [totalPrice, setTotalPrice] = useState(0);
  //calculating total price for all items
  const [totalPriceAll, setTotalPriceAll] = useState(0);
  //calculating total price for each item
  const [totalPriceEach, setTotalPriceEach] = useState(0);
// function for calculating total price for quantity and unit price
  const calculateTotalPrice = (quantity, unitPrice) => {
    setTotalPrice(quantity * unitPrice);
    return totalPrice;
  }
  // function for calculating total price for all items
  const calculateTotalPriceAll = (quantity, unitPrice) => {
    setTotalPriceAll(quantity * unitPrice);
    return totalPriceAll;
  }
  // function for calculating total price for each item
  const calculateTotalPriceEach = (quantity, unitPrice) => {
    setTotalPriceEach(quantity * unitPrice);
    return totalPriceEach;
  }
  //function for calculating total for total price
  const calculateTotal = (totalPrice, totalPriceAll, totalPriceEach) => {
    return totalPrice + totalPriceAll + totalPriceEach;
  }
  //function for calculating  VAT of 18% for total price
  const calculateVAT = (totalPrice, totalPriceAll, totalPriceEach) => {
    return (totalPrice + totalPriceAll + totalPriceEach) * 0.18;
  }
  //function for calculating  total price with VAT
  const calculateTotalWithVAT = (totalPrice, totalPriceAll, totalPriceEach) => {
    return (totalPrice + totalPriceAll + totalPriceEach) * 1.18;
  }

  
  // Defining a state named rows
  // which we can update by calling on setRows function
  const [rows, setRows] = useState([
      { id: 1, item: "", quantity: "", unit_price: "", description: "" },
  ]);

  // Initial states
  const [open, setOpen] = React.useState(false);
  const [isEdit, setEdit] = React.useState(false);
  const [disable, setDisable] = React.useState(true);
  const [showConfirm, setShowConfirm] = React.useState(false);

  // Function For closing the alert snackbar
  const handleClose = (event, reason) => {
      if (reason === "clickaway") {
          return;
      }
      setOpen(false);
  };

  // Function For adding new row object
  const handleAdd = () => {
      setRows([
          ...rows,
          {
              id: rows.length + 1, item: "",
              quantity: "",  unit_price: "",description: ""
          },
      ]);
      setEdit(true);
  };

  // Function to handle edit
  const handleEdit = (i) => {
      // If edit mode is true setEdit will 
      // set it to false and vice versa
      setEdit(!isEdit);
  };

  // Function to handle save
  const handleSave = () => {
      setEdit(!isEdit);
      setRows(rows);
      console.log("saved : ", rows);
      setDisable(true);
      setOpen(true);
  };
console.log("rows", rows);
console.log("handleSave", handleSave);
  // The handleInputChange handler can be set up to handle
  // many different inputs in the form, listen for changes 
  // to input elements and record their values in state
  const handleInputChange = (e, index) => {
      setDisable(false);
      const { name, value } = e.target;
      const list = [...rows];
      list[index][name] = value;
      setRows(list);
  };

  // Showing delete confirmation to users
  const handleConfirm = () => {
      setShowConfirm(true);
  };

  // Handle the case of delete confirmation where 
  // user click yes delete a specific row of id:i
  const handleRemoveClick = (i) => {
      const list = [...rows];
      list.splice(i, 1);
      setRows(list);
      setShowConfirm(false);
  };

  // Handle the case of delete confirmation 
  // where user click no 
  const handleNo = () => {
      setShowConfirm(false);
  };


console.log("testing data", data);
  
    return (

        <>
        <div className="containers">
            <div className="row">
              <div className='title-client'>
             < h1>I.  Client description</h1>
              </div>
            <div className="client-data">
                
                <div>
                <label><span className='client-label'>Names: </span><span className='client-details'>testing</span></label>
                </div>
                <div>
                <label><span className='client-label'>ID Number: </span><span className='client-details'></span></label>
                </div>
               <div>
               <label><span className='client-label'>District: </span><span className='client-details'></span></label>
               </div>
                <div>
                <label><span className='client-label'>Sector: </span><span className='client-details'></span></label>
                </div>
                <div>
                <label><span className='client-label'>Cell: </span><span className='client-details'></span></label>
                </div>
                <div>
                <label><span className='client-label'>Village: </span><span className='client-details'>testing</span></label>
                </div>
                <div>
                <label><span className='client-label'>PLot Number: </span><span className='client-details'></span></label>
                </div>
                <div>
                <label><span className='client-label'>Tel: </span><span className='client-details'></span ></label>
                </div>
                <div>
                <label><span className='client-label'>Quotation No: </span><span className='client-details'></span></label>
                </div>
                <div>
                <label><span className='client-label'>Request Date: </span><span className='client-details'></span></label>
                </div>
                <div>
                <label><span className='client-label'>Measurement date: </span><span className='client-details'></span></label>
                </div>
                <div>
                <label><span className='client-label'>Date quotation: </span><span className='client-details'>testing</span></label>
                </div>
            </div>
            <div className="container">
            <h1>BILLING OF QUANTITIES FOR NEW WATER CONNECTION</h1>
            
            <table  id="customers">
                <thead>
                <tr>
                    <th>BRANCH NAME</th>
                    <th style={{borderRightStyle:"hidden "}}>Product Category</th>
                    <th style={{borderRightStyle:"hidden "}}></th>
                    <th ></th>
                </tr>
                II.   Description of the material to be used for the connection
                </thead>
                <thead>
                <tr>
                    <th>Item Description</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total Price</th>
                </tr>
                </thead>
              
                <tbody>

                {data.map((item, index) => (
                  <tr  key={index}>
                
                    <tr style={{border: "1px solid black "}} >
                    <tr><button onClick={handleAddRow}>Add row</button></tr>
                        <td contentEditable={true}
                suppressContentEditableWarning={true}
                onInput={e => handleChange(e, index, 'item_description')}
                 style={{border: "1px solid black "}} >{item.item_description}</td>
                 
                        <td contentEditable={true}
                suppressContentEditableWarning={true}
                onInput={e => handleChange(e, index, 'quantity')}
                        style={{border: "1px solid black "}}>{item.quantity} </td>

                        <td  contentEditable={true}
                suppressContentEditableWarning={true}
                onInput={e => handleChange(e, index, 'unit_price')}
                        style={{border: "1px solid black "}}> {item.unit_price}</td>
                    </tr>
                    <tr style={{border: "1px solid black "}}>
                        <td style={{borderRightStyle:"hidden "}} >S/TOTAL I</td>
                        <td style={{borderRightStyle:"hidden "}}> {}</td>
                        <td style={{border: "1px solid black "}}> </td>
                    </tr>
                    <tr>
                        
                    </tr>
                    </tr>
                ))}
                </tbody>
                
                <tbody>
                {data.map((item, index) => (
                  <tr  key={index}>
                <tr> 
                        </tr>
                <tr>
                III.  MANPOWER  
                        </tr>
                    <tr>
                        <td>Technician</td>
                        <td
                        
                        >{item.quantity_man} </td>
                        <td contentEditable={true} >{item.unit_price_man} </td>
                        <td> </td>
                    </tr>
                    <tr>
                        <td>Technician Helper</td>
                        <td contentEditable={true}
                suppressContentEditableWarning={true}
                onInput={e => handleChange(e, index, 'quantity_man')}
                        
                        >{item.quantity_man} </td>
                        <td contentEditable={true}
                suppressContentEditableWarning={true}
                onInput={e => handleChange(e, index, 'unit_price_man')}
                        >{item.unit_price_man} </td>
                        <td> </td>
                    </tr>
                    <tr>
                        <td  style={{borderRightStyle:"hidden "}}>S/TOTAL I</td>
                        <td style={{borderRightStyle:"hidden "}}> </td>
                        <td > </td>
                        <td> </td>
                    </tr>
                    <tr>
                        <td style={{borderRightStyle:"hidden "}}>S/TOTAL III</td>
                        <td style={{borderRightStyle:"hidden "}}> </td>
                        <td > </td>
                        <td> </td>

                    </tr>
                    <tr>
                        <td style={{borderRightStyle:"hidden "}}>VAT(18%)</td>
                        <td style={{borderRightStyle:"hidden "}}> </td>
                        <td > </td>
                        <td> </td>
                    </tr>
                    <tr>
                        <td style={{borderRightStyle:"hidden "}}>TOTAL (All taxes included)</td>
                        <td style={{borderRightStyle:"hidden "}}> </td>
                        <td > </td>
                        <td> </td>
                    </tr>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className='amount'>
              Amount in words: <span className='amount-in-words'></span>
            </div>
        </div>
            <div className="workedon">
                
              <div className="display-by-column">
                <h2 className='title-by'>Prepared by:</h2>
                <h2 className='role'>Title and Names</h2>
              </div>
              <div className="display-by-column">
                <h2 className='title-by'>Verified by:</h2>
                <h2 className='role'>Water Distribution Officer</h2>
              </div>
              <div className="display-by-column">
                <h2 className='title-by'>Approved  by:</h2>
                <h2 className='role'>Title and Names</h2>
              </div>
                
            </div>
            <div className="foot">
                
                <div className="display-by-column">
                <h1 className='footer-title'>***  Items description are material used to connect clients to water network</h1>
                </div>
                  
              </div>
                
                
                  
            </div>
        </div>
        </>
    )
}
export default BillingQuantitiesListScreen
