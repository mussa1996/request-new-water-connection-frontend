

import React from 'react';
import AdmDashboardWrapper from './admin/admin-component';
import Header from './Header';
import Menu from './Menu';


const Dashboard = ()=>{
   return(
    <AdmDashboardWrapper className="wrapper">
       
        <Menu />
       
    </AdmDashboardWrapper>
   )
}

export default Dashboard;