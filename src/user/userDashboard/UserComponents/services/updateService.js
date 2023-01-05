import React from 'react';
import AdmDashboardWrapper from '../user-component';
import AvailableServiceUpdate from '../../../service/update/Update';


const UpdateService = ()=>{
   return(
    <AdmDashboardWrapper className="wrapper">
        <div>
          <AvailableServiceUpdate />
        </div>
    </AdmDashboardWrapper>
   )
}

export default UpdateService;