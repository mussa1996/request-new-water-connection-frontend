import React from 'react';
import AdmDashboardWrapper from '../user-component';
import AvailableSingleService from '../../../service/single/Single';


const SingleService = ()=>{
   return(
    <AdmDashboardWrapper className="wrapper">
        <div>
          <AvailableSingleService />
        </div>
    </AdmDashboardWrapper>
   )
}

export default SingleService;