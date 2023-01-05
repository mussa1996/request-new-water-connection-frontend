import React from 'react';
import AdmDashboardWrapper from '../user-component';
import AvailableBusinessUpdate from '../../../business/update/Update';


const UpdateBusiness = ()=>{
   return(
    <AdmDashboardWrapper className="wrapper">
        <div>
          <AvailableBusinessUpdate />
        </div>
    </AdmDashboardWrapper>
   )
}

export default UpdateBusiness;