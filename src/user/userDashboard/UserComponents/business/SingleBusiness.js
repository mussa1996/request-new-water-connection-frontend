import React from 'react';
import AdmDashboardWrapper from '../user-component';
import AvailableSingleBusiness from '../../../business/single/Single';


const SingleBusiness = ()=>{
   return(
    <AdmDashboardWrapper className="wrapper">
        <div>
          <AvailableSingleBusiness />
        </div>
    </AdmDashboardWrapper>
   )
}

export default SingleBusiness;