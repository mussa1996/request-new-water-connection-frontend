import React from 'react';
import AdmDashboardWrapper from '../user-component';
import AvailableSingleProduct from '../../../product/single/Single';


const SingleProduct = ()=>{
   return(
    <AdmDashboardWrapper className="wrapper">
        <div>
          <AvailableSingleProduct />
        </div>
    </AdmDashboardWrapper>
   )
}

export default SingleProduct;