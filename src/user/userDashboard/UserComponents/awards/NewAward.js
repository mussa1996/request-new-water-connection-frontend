import React from 'react';
import AdmDashboardWrapper from '../user-component';
import AvailableAwardNew from '../../../awards/new/New';


const NewAward = ()=>{
   return(
    <AdmDashboardWrapper className="wrapper">
        <div>
          <AvailableAwardNew />
        </div>
    </AdmDashboardWrapper>
   )
}

export default NewAward;