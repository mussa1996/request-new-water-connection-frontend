import React from 'react';
import AdmDashboardWrapper from '../user-component';
import AvailableProduct from '../../../product/list/List';


const ListProduct = ()=>{
   return(
    <AdmDashboardWrapper className="wrapper">
        <div>
          <AvailableProduct />
        </div>
    </AdmDashboardWrapper>
   )
}

export default ListProduct;