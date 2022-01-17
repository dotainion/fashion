import React from 'react';
import { Routes, Route, HashRouter } from "react-router-dom";


import './themes/general.css';
import './themes/mobileResponsive.css';
import './themes/desktopResponsive.css';


import { Sales } from "./pages/Sales";
import { ViewItem } from "./pages/ViewItem";
import { DataEntry } from "./admin/DataEntry";
import { SignIn } from "./admin/SignIn";
import { AuthContext } from "./auth/Auth";
import { Register } from "./admin/Register";
import { StoreContext } from "./state/Store";
import { routes } from "./routes/Routes";
import { AuthValidator } from "./AuthValidator";
import { DeliveryOptions } from "./checkout/DeliveryOptions";
import { Checkout } from "./checkout/Checkout";
import { Products } from "./admin/Products";
import { Orders } from "./checkout/Orders";
import { Test } from "./test/Test";
import { Settings } from "./admin/Settings";
import { AdminOrders } from "./checkout/AdminOrders";
import { PageNotFound } from './error/PageNotFound';


const App = () => {
  return (
    <HashRouter>
      <AuthContext>
        <StoreContext>
          <Routes>
            <Route path={routes.default} element={<Sales/>}/>
            <Route path={routes.product + routes.productParam} element={<ViewItem/>}/>
            <Route path={routes.profile} element={<AuthValidator component={DataEntry}/>}/>
            <Route path={routes.productsEdit} element={<AuthValidator component={Products}/>}/>
            <Route path={routes.checkout} element={<AuthValidator component={Checkout}/>}/>
            <Route path={routes.orders} element={<AuthValidator component={Orders}/>}/>
            <Route path={routes.adminOrders} element={<AuthValidator component={AdminOrders}/>}/>
            <Route path={routes.deliveryOptions} element={<AuthValidator component={DeliveryOptions}/>}/>
            <Route path={routes.settings} element={<AuthValidator component={Settings}/>}/>
            <Route path={routes.singin} element={<SignIn/>}/>
            <Route path={routes.register} element={<Register/>}/>
            <Route path={"/test"} element={<Test/>}/>
            <Route path={routes.pageNotFound} element={<PageNotFound/>}/>
          </Routes>
        </StoreContext>
      </AuthContext>
    </HashRouter>
  );
}

export default App;
