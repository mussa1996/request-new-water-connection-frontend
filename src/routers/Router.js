import React from "react";
import { BrowserRouter as Router, Route, StaticRouter, Switch } from "react-router-dom";
import Login from "../components/views/Login";
import Register from "../components/views/RegisterUser";
import Forget from "../components/views/Forgot"
import "../App.css"
import "../dashboard/dash.css"
import "../dashboard/dark.scss"
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../user/userDashboard/UserComponents/Dashboard";
import Footer from "../user/userDashboard/Footer";
import Header from "../user/userDashboard/Header";
import Menu from "../user/userDashboard/Menu";
import UserForm from "../user-form/userForm";
import validation from "../user-form/validation"
import ADashboard from "../admin/adminDashboard/adminComponents/Dashboard";
import AFooter from "../admin/adminDashboard/Footer";
import AHeader from "../admin/adminDashboard/Header";
import AMenu from "../admin/adminDashboard/Menu";
import Verify from "../components/views/Verify";
import Forgot from "../components/views/Forgot";
import Resetpassword from "../components/views/Resetpassword";
import ListBranch from "../admin/branch/list/list"
import UpdateBranch from"../admin/branch/update/Update"
import NewBranch from "../admin/branch/new/New"
import SingleBranch from"../admin/branch/single/Single"
import UserList from "../admin/user/list/list"
// import SingleUser from "../admin/user/single/Single"
// import UpdateUser from "../admin/user/update/Update"
import RequestList from"../admin/request/list/list"

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
            <Route exact path="/verification" component={Verify} />
            <Route exact component={Forgot} path="/forgot-password" />
            <Route exact component={Resetpassword} path="/resetpassword" />
   
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
             <ProtectedRoute path="/admin-dashboard" >
             <AHeader />
              <ADashboard />
              <AFooter />
              
              <AMenu />

            </ProtectedRoute>
            <ProtectedRoute
                path="/admin/branch/list"
                component={ListBranch}
              />
              <ProtectedRoute
                path="/admin/branch/update"
                component={UpdateBranch}
              />
                <ProtectedRoute
                path="/admin/branch/new"
                component={NewBranch}
              />
              <ProtectedRoute path="/admin/branch/single" component={SingleBranch} />
              <ProtectedRoute path="/admin/user/list" component={UserList} />
              {/* <ProtectedRoute path="/admin/user/single" component={SingleUser} />
              <ProtectedRoute path="/admin/user/update" component={UpdateUser} /> */}
              <ProtectedRoute path="/admin/request/list" component={RequestList} />
            {/* <ProtectedRoute path="/list" component={List} />
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
            <ProtectedRoute path="/award/list" component={AwardList} />  */}


            {/* user routes */}
            <ProtectedRoute path="/user-dashboard">
              <Dashboard />
              <Footer />
              <Header />
              <Menu />
              </ProtectedRoute>
              <ProtectedRoute
                path="/user/user-form"
                component={UserForm}
              />
             
              {/* <ProtectedRoute
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
              /> */}
            
            <Route exact path="/" component={Login} /> 

        {/* user routes  */}
        {/* <ProtectedRoute path="/user-dashboard">
              <Dashboard />
              <Footer />
              <Header />
              <Menu />
              </ProtectedRoute> */}
              {/* <Route exact path="/user-form" component={UserForm} />
              <Router path="/user-dashboard">
              <Dashboard />
              <Footer />
              <Header />
              <Menu />
              </Router> */}


{/* admin router */}

{/* <Router path="/admin-dashboard" >
              <ADashboard />
              <AFooter />
              <AHeader />
              <AMenu />

            </Router> */}
            
          </Switch>
        </Router>
      </div>
    </>
  );
}
