import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/Auth";
import defaultImage from '../images/dress.jpeg';
import { routes } from "../routes/Routes";
import { useStore } from "../state/Store";
import { GiShoppingBag } from 'react-icons/gi';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { tools } from "../tools/Tools";


export const CartItems = () =>{
    const { authenticated } = useAuth();
    const { cartItems, cartItemsBackup, cartItemsTotal, onUpdateQty } = useStore();

    const navigate = useNavigate();

    return(
        <div 
            className="navigation-dropdown cart-item-container scroll float-top-right" 
            onClick={e=>e.stopPropagation()}>
            <div className="cart-item-header-footer">
                <div>Products in cart</div>
            </div>
            {authenticated?.signIn ?
                <div>
                    {cartItems?.map?.((item, key)=>(
                        <div className="cart-item" key={key}>
                            <div>
                                <img src={item?.image || defaultImage} alt="" />
                            </div>
                            <div className="max-width">
                                <div>{item?.title}</div>
                                <div>{"XCD $"}{item?.price}</div>
                                <div>Size: {item?.size}</div>
                                <div className="flex">
                                    <button onClick={(e)=>onUpdateQty("sub", item, `cart-${key}-item`, e)}>-</button>
                                    <input 
                                        id={`cart-${key}-item`}
                                        onKeyDown={tools.maintainValidNumber} 
                                        onKeyUp={tools.maintainValidNumber} 
                                        defaultValue={item?.qty} 
                                        onChange={()=>{}}
                                    />
                                    <button onClick={(e)=>onUpdateQty("add", item, `cart-${key}-item`, e)}>+</button>
                                </div>
                            </div>
                            <div>
                                <IoMdCloseCircleOutline className="cart-item-close" onClick={(e)=>onUpdateQty("add", item, `cart-${key}-item`, e, true)}/>
                            </div>
                        </div> 
                    ))}
                    <div hidden={!cartItems?.length} className="cart-item-header-footer">
                        <div><b>Sub Total: </b>{"$"}{cartItemsTotal}</div>
                        <div onClick={()=>navigate(routes.deliveryOptions)} className="cart-item-checkout">CHECKOUT</div>
                    </div>
                    <div hidden={cartItems?.length} className="text-center">
                        <div className="pad">Shopping cart is empty</div>
                        <GiShoppingBag style={{fontSize:"100px",color:"dodgerblue"}} />
                    </div>
                </div>
                :
                <div>
                    <div hidden={cartItems?.length}>Shopping cart is empty</div>
                    <div hidden={!cartItems?.length}>Your cart is saved</div>
                    <p>Welcome back! If you had items in your shopping cart, we have saved them for you. 
                        You can <label onClick={()=>navigate(routes.singin)} style={{color:"dodgerblue"}}>SIGN IN</label> now to see them, or whenever you're ready to check out.</p>
                </div>
            }
        </div>
    )
}