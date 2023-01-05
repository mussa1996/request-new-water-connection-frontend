import React from 'react';
import AdmDashboardWrapper from '../user-component';
import AvailableProductUpdate from '../../../product/update/Update';


const UpdateProduct = ()=>{
   return(
    <AdmDashboardWrapper className="wrapper">
        <div>
          <AvailableProductUpdate />
        </div>
    </AdmDashboardWrapper>
   )
}

export default UpdateProduct;