import React, { useRef, useEffect, useState } from "react";
import { RiVisaFill } from 'react-icons/ri';
import { FaCcMastercard, FaCcDiscover, FaCcPaypal } from 'react-icons/fa';
import { CartItems } from "../components/CartItems";
import { BsCreditCard2BackFill } from 'react-icons/bs';
import { GiPayMoney, GiShoppingBag } from 'react-icons/gi';
import { Input } from "../Widgets/Input";
import $ from 'jquery';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { routes } from "../routes/Routes";
import { CheckoutNavBar } from "../layout/CheckoutNavBar";
import { addCheckout } from "../data/Database";
import { useAuth } from "../auth/Auth";
import { useStore } from "../state/Store";
import { Loading } from "../components/Loading";
import img from './../images/dress.jpeg';
import { tools } from "../tools/Tools";
import { Checkbox } from "../Widgets/Checkbox";


export const Checkout = () =>{
    const { user } = useAuth();
    const { cartItems, deliveryType, clearCart, onUpdateQty, holdCheckout } = useStore();

    const [loading, setLoading] = useState();

    const navigate = useNavigate();

    const location = useLocation();
    
    const checkoutTypRef = useRef();

    const readyCartItems = (items) =>{
        return items?.filter((item)=> !item?.hold );
    }

    const onCheckout = async() =>{
        if (loading){
            return;
        }
        setLoading(true);
        readyCartItems(cartItems)?.forEach(async(item)=>{
            await addCheckout({
                userId: user?.id,
                sellerId: item?.sellerId,
                items: item,
                fromAddress: "fromAddress",
                toAddress: "toAddress",
                delivered: "Pending",
                time: new Date().getTime(),
                deliveryType: deliveryType
            });
        });
        clearCart();
        setLoading(false);
    }

    useEffect(()=>{
        if (deliveryType === "pickup" || deliveryType === "dropOff"){
            checkoutTypRef.current = deliveryType;
        }else{
            navigate(routes.deliveryOptions);
        }
    }, []);

    return(
        <div className="checkout-container">
            <CheckoutNavBar />
            <div className="checkout-inner-container">
                <h3 className="checkout-type">
                    <label>Type: </label>
                    <span>{deliveryType?.toUpperCase?.()}</span>
                </h3>
                <table hidden={!cartItems?.length}>
                    <tbody>
                        <tr>
                            <td>
                                <table>
                                    <thead>
                                        <tr style={{backgroundColor:"red",color:"white"}}>
                                            <th>Item</th>
                                            <th>Size</th>
                                            <th>Price</th>
                                            <th>Qty</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            cartItems.length?
                                            cartItems.map((item, key)=>(
                                                <tr key={key}>
                                                    <td className="checkout-row">
                                                        <table>
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <img src={item?.image} alt="" style={{width:"80px", height:"80px"}} />
                                                                    </td>
                                                                    <td>
                                                                        <table>
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td className="checkout-row-ready">
                                                                                        <label>
                                                                                            <input onChange={(e)=>holdCheckout(item, !e.target.checked)} defaultChecked={!item?.hold} type="checkbox" />
                                                                                            <span>Ready</span>
                                                                                        </label>
                                                                                    </td>
                                                                                    <td className="btn" onClick={(e)=>onUpdateQty("add", item, `cart-${key}-item-checkout`, e, true)}>Delete</td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                    <td className="checkout-row">{item?.size}</td>
                                                    <td className="checkout-row">{"ECD$"}{item?.price}</td>
                                                    <td className="checkout-row">
                                                        <div className="flex centered">
                                                            <button onClick={(e)=>onUpdateQty("sub", item, `cart-${key}-item-checkout`, e)}>-</button>
                                                            <input 
                                                                className="btn"
                                                                id={`cart-${key}-item-checkout`}
                                                                onKeyDown={tools.maintainValidNumber} 
                                                                onKeyUp={tools.maintainValidNumber} 
                                                                defaultValue={item?.qty} 
                                                                onChange={()=>{}}
                                                            />
                                                            <button onClick={(e)=>onUpdateQty("add", item, `cart-${key}-item-checkout`, e)}>+</button>
                                                        </div>
                                                    </td>
                                                    <td className="checkout-row">{"ECD$"}{parseInt(item?.qty) * parseFloat(item?.price)}</td>
                                                </tr>
                                            )):
                                            <tr>
                                                <td>No records</td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </td>
                            <td className="checkout-summery-container">
                                <h4>Order Summary</h4>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Subtotal</td>
                                            <td className="text-right">
                                                <h1>EXD$25.00</h1>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="checkout-button">
                                    <div onClick={onCheckout}>CHECKOUT NOW</div>
                                </div>
                                <div className="checkout-continue-button">
                                    <span onClick={()=>navigate(routes.home)}>Continue Shopping</span>
                                </div>
                                <div>
                                    <RiVisaFill className="checkout-icon" />
                                    <FaCcMastercard className="checkout-icon" />
                                    <FaCcDiscover className="checkout-icon" />
                                    <FaCcPaypal className="checkout-icon" />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div hidden={cartItems?.length}>
                <div className="text-center">
                    <h1 className="pad">Shopping cart is empty</h1>
                    <GiShoppingBag style={{fontSize:"300px",color:"dodgerblue"}} />
                    <div className="checkout-transit-btn" onClick={()=>navigate(routes.orders)}>SEE TRANSIT</div>
                </div>
            </div>
            <Loading isOpen={loading} />
        </div>
    )
}