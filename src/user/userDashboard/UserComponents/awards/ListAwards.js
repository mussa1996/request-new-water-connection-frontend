import React from 'react';
import AdmDashboardWrapper from '../user-component';
import AvailableAwards from '../../../awards/list/List';


const ListAwards = ()=>{
   return(
    <AdmDashboardWrapper className="wrapper">
        <div>
          <AvailableAwards />
        </div>
    </AdmDashboardWrapper>
   )
}

export default ListAwards;