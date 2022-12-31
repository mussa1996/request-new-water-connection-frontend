import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../components/views/Login";
import Register from "../components/views/RegisterUser";
import Forget from "../components/views/Forgot"
import "../App.css"



export default function Routers() {
  // const { darkMode } = useContext(DarkModeContext);

  return (
    <>
      <div class="wrapper">
        <div></div>
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/forgot-password" component={Forget} />
   
            {/* order routes */}
            {/* <ProtectedRoute path="/order-dashboard" >
              <OrderDashboard />
              <OrderFooter />
              <OrderHeader />
              <OrderMenu />

            </ProtectedRoute>
            <ProtectedRoute path="/order" component={OrderList} />
            <ProtectedRoute path="/order-business" component={OrderListByBusiness} />
            <ProtectedRoute path="/order/single" component={OrderSingle} />
            <Route path="/cart-list" component={CartList} />
            <ProtectedRoute path="/rating" component={Rating} /> */}

            {/* admin routes */}
            {/* <ProtectedRoute path="/admin-dashboard" >
              <ADashboard />
              <AFooter />
              <AHeader />
              <AMenu />

            </ProtectedRoute>

            <ProtectedRoute path="/list" component={List} />
              <ProtectedRoute path="/single" component={Single} />
              <ProtectedRoute path="/award/single" component={AwardSingle} />
              <ProtectedRoute
                path="/product/single"
                component={ProductSingle}
              />
              <ProtectedRoute
                path="/service/single"
                component={ServiceSingle}
              />
              
              <ProtectedRoute path="/service/list" component={ServiceList} />
              <ProtectedRoute path="/product/list" component={ProductList} />
            <ProtectedRoute path="/award/list" component={AwardList} /> */}
            {/* user routes */}
            {/* <ProtectedRoute path="/user-dashboard">
              <Dashboard />
              <Footer />
              <Header />
              <Menu />
              </ProtectedRoute>
              <ProtectedRoute
                path="/user/award/single"
                component={UAwardSingle}
              />
              <ProtectedRoute
                path="/user/product/single"
                component={UProductSingle}
              />
              <ProtectedRoute
                path="/user/service/single"
                component={UServiceSingle}
              />
              <ProtectedRoute path="/user/list" component={UList} />
              <ProtectedRoute path="/user/single" component={USingle} />
              <ProtectedRoute path="/user/award/list" component={UAwardList} />
              <ProtectedRoute
                path="/user/service/list"
                component={UServiceList}
              />
              <ProtectedRoute
                path="/user/product/list"
                component={UProductList}
              />
              <ProtectedRoute
                path="/user/award/update"
                component={AwardUpdate}
              />
              <ProtectedRoute
                path="/user/product/update"
                component={ProductUpdate}
              />
              <ProtectedRoute
                path="/user/service/update"
                component={ServiceUpdate}
              />
              <ProtectedRoute
                path="/user/business/update"
                component={BusinessUpdate}
              />
              <ProtectedRoute path="/award/new" component={AwardNew} />
              <ProtectedRoute path="/service/new" component={ServiceNew} />
              <ProtectedRoute
                path="/product/new" component={New}
              />
            
            <Route exact path="/" component={Index} /> */}
          </Switch>
        </Router>
      </div>
    </>
  );
}
