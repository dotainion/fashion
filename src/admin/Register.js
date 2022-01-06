import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../auth/Auth";
import { Input } from "../Widgets/Input";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/Routes";
import { NavigationBar } from "../layout/NavigationBar";
import { BottomNavigationBar } from "../layout/BottomNavigationBar";

export const Register = () =>{
    const { register, authenticated } = useAuth();

    const navigate = useNavigate();

    const [message, setMessage] = useState();

    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const addressRef = useRef();
    const phoneNumberRef = useRef();

    const singUp = async() =>{
        setMessage("");
        if (passwordRef.current.value !== confirmPasswordRef.current.value){
            return setMessage("Passord mismatch.");
        }

        const res = await register({
            isAdmin: false, 
            email: emailRef.current.value,
            password: passwordRef.current.value,
            address: addressRef.current.value,
            phone: phoneNumberRef.current.value
        }, false);

        if (res?.error){
            setMessage(res?.error);
        }
    }

    useEffect(()=>{

    }, []);

    return(
        <div className="accounts-entry-container">
            <NavigationBar relative/>
            <div className="accounts-entry-center">
                <h2>SING UP</h2>
                <div style={{color:"red"}}>{message}</div>
                <Input title="Email" inputRef={emailRef} />
                <Input title="Password" type="password" inputRef={passwordRef} />
                <Input title="Confirm Password" type="password" inputRef={confirmPasswordRef} />
                <Input title="Address" inputRef={addressRef} />
                <Input title="Phone number" inputRef={phoneNumberRef} />
                <button onClick={singUp}>SIGN UP</button>
                <div>
                    <span onClick={()=>navigate(routes.singin)} style={{float:"left"}}>Sing in</span>
                    <span onClick={()=>navigate(routes.default)} style={{float:"right"}}>continue shopping</span>
                </div>
            </div>
        </div>
    )
}