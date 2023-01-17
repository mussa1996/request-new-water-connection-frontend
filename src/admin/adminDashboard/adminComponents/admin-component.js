import { Box } from "@mui/material";
import React from "react";
import Header from "../Header";
import Menu from "../Menu";
import Footer from "../Footer";

const AdmDashboardWrapper = (props)=>{
    return(
        <React.Fragment class="wrapper">
           <Header />
           <Menu />
           <div className="content-wrapper">
             {props.children}
             </div>
        </React.Fragment>
    )
}

export default AdmDashboardWrapper;