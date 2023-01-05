import React from 'react';
import AdmDashboardWrapper from '../user-component';
import AvailableAwardUpdate from '../../../awards/update/Update';


const UpdateAward = ()=>{
   return(
    <AdmDashboardWrapper className="wrapper">
        <div>
          <AvailableAwardUpdate />
        </div>
    </AdmDashboardWrapper>
   )
}

export default UpdateAward;