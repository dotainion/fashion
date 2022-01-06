import React from "react";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./auth/Auth";
import { NotAuthorize } from "./error/NotAuthorize";
import { routes } from "./routes/Routes";



export const AuthValidator = ({element, component: Component}) =>{
    const { authenticated } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const acceptedPathName = [
        routes.orders,
        routes.checkout,
        routes.deliveryOptions
    ]

    if (acceptedPathName.includes(location.pathname)){
        if (element) return element
        if (Component) return <Component/>
    }
    if (authenticated?.signIn && authenticated?.isAdmin){
        if (element) return element
        if (Component) return <Component/>
    }
    if (authenticated?.signIn) return <NotAuthorize/>
    return <Navigate to={routes.singin} />
}