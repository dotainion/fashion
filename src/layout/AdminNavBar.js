import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../routes/Routes";


export const AdminNavBar = ({}) =>{
    const navigate = useNavigate();
    const location = useLocation();

    const titleCase = (title) =>{
        title = title?.replace("/", "");
        const firstLetter = title?.substring?.(0, 1);
        const lastLetter = title?.substring?.(1, title?.length);
        return firstLetter?.toUpperCase?.() + lastLetter;
    }

    const hide = (path) =>{
        if(location.pathname === path){
            return true;
        }
        return false;
    }

    return(
        <div className="admin-nav-bar">
            <div>
                <h2>{titleCase(location.pathname)}</h2>
                <span onClick={()=>navigate(routes.home)}>Home</span>
                <span hidden={hide(routes.productsEdit)} onClick={()=>navigate(routes.productsEdit)}>Products</span>
                <span hidden={hide(routes.profile)} onClick={()=>navigate(routes.profile)}>Data Entry</span>
                <span hidden={hide(routes.adminOrders)} onClick={()=>navigate(routes.adminOrders)}>Orders</span>
                <span hidden={hide(routes.settings)} onClick={()=>navigate(routes.settings)}>Settings</span>
            </div>
        </div>
    )
}