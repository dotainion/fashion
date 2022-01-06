import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../routes/Routes";


export const CheckoutNavBar = ({}) =>{
    const location = useLocation();
    const navigate = useNavigate();

    const hide = (path) =>{
        if(location.pathname === path){
            return true;
        }
        return false;
    }

    return(
        <div className="checkout-header">
            <label>PRETTY LITTLE THINGS</label>
            <span onClick={()=>navigate(routes.home)}>Home</span>
            <span hidden={hide(routes.checkout)} onClick={()=>navigate(routes.checkout)}>Checkout</span>
            <span hidden={hide(routes.orders)} onClick={()=>navigate(routes.orders)}>Orders</span>
        </div>
    )
}