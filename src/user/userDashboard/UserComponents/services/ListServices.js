import React from 'react';
import AdmDashboardWrapper from '../user-component';
import AvailableService from '../../../service/list/List';


const ListService = ()=>{
   return(
    <AdmDashboardWrapper className="wrapper">
        <div>
          <AvailableService />
        </div>
    </AdmDashboardWrapper>
   )
}

export default ListService;