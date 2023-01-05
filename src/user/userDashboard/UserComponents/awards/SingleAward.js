import React from 'react';
import AdmDashboardWrapper from '../user-component';
import AvailableSingleAward from '../../../awards/single/Single';


const SingleAward = ()=>{
   return(
    <AdmDashboardWrapper className="wrapper">
        <div>
          <AvailableSingleAward />
        </div>
    </AdmDashboardWrapper>
   )
}

export default SingleAward;