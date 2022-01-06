import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../auth/Auth";
import { Input } from "../Widgets/Input";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/Routes";
import { NavigationBar } from "../layout/NavigationBar";
import { BottomNavigationBar } from "../layout/BottomNavigationBar";

export const SignIn = () =>{
    const { signIn, authenticated } = useAuth();
    
    const navigate = useNavigate();

    const [message, setMessage] = useState();

    const emailRef = useRef();
    const passwordRef = useRef();

    const login = async() =>{
        const res = await signIn(emailRef.current.value, passwordRef.current.value);
        if (res?.error){
            setMessage(res?.error);
        }
    }

    useEffect(()=>{
        if(authenticated?.signIn){
            navigate(routes.default);
        }
    }, [authenticated]);

    return(
        <div className="accounts-entry-container">
            <NavigationBar relative/>
            <div className="accounts-entry-center">
                <h2>SING IN</h2>
                <div style={{color:"red"}}>{message}</div>
                <Input title="Email" inputRef={emailRef} />
                <Input title="Password" type="password" inputRef={passwordRef} />
                <button onClick={login}>SIGN IN</button>
                <div>
                    <span onClick={()=>navigate(routes.register)} style={{float:"left"}}>Register</span>
                    <span onClick={()=>navigate(routes.default)} style={{float:"right"}}>continue shopping</span>
                </div>
            </div>
        </div>
    )
}