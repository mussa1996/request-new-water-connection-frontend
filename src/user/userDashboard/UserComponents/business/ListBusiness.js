import React from 'react';
import AdmDashboardWrapper from '../user-component';
import AvailableBusiness from '../../../business/list/List';


const ListBusiness = ()=>{
   return(
    <AdmDashboardWrapper className="wrapper">
        <div>
          <AvailableBusiness />
        </div>
    </AdmDashboardWrapper>
   )
}

export default ListBusiness;