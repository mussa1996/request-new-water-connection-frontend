import React from 'react';
import AdmDashboardWrapper from '../user-component';
import AvailableProductNew from '../../../product/new/New';


const NewProduct = ()=>{
   return(
    <AdmDashboardWrapper className="wrapper">
        <div>
          <AvailableProductNew />
        </div>
    </AdmDashboardWrapper>
   )
}

export default NewProduct;