import React from 'react';
import AdmDashboardWrapper from '../user-component';
import AvailableServiceNew from '../../../service/new/New';


const NewService = ()=>{
   return(
    <AdmDashboardWrapper className="wrapper">
        <div>
          <AvailableServiceNew />
        </div>
    </AdmDashboardWrapper>
   )
}

export default NewService;