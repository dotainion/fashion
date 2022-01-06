import React from 'react';
import { GiCardPickup } from 'react-icons/gi';
import { FaShuttleVan } from 'react-icons/fa';
import bonnet from '../images/bonnets.jpeg';
import { FcHome } from 'react-icons/fc';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { routes } from '../routes/Routes';
import { CheckoutNavBar } from '../layout/CheckoutNavBar';
import { useStore } from '../state/Store';


export const DeliveryOptions = () =>{
    const { deliveryType, changeDeliveryType } = useStore();

    const navigate = useNavigate();
    
    const options = [
        {
            title: "Pick up",
            icon: GiCardPickup,
            detail: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            action: ()=>{
                changeDeliveryType("pickup");
                navigate(routes.checkout);
            }
        },{
            title: "Drop off",
            icon: FaShuttleVan,
            detail: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            action: ()=>{
                changeDeliveryType("dropOff");
                navigate(routes.checkout);
            }
        },{
            title: "Delivery",
            icon: FcHome,
            detail: "Unavailable.",
            action: null
        },{
            title: "Continue Shopping",
            icon: MdOutlineShoppingCart,
            detail: "Take me back so i can continue shopping.",
            action: ()=>navigate(routes.home)
        }
    ];
    return(
        <div>
            <CheckoutNavBar />
            <div className="checkout-options-container">
                <div className="max-width">
                    {options.map((opt, key)=>(
                        <div className="checkout-options" key={key}>
                            <div className="checkout-options-icon">
                                <span>{opt?.icon && <opt.icon/>}</span>
                            </div>
                            <div className="checkout-options-content">
                                <h3 onClick={()=>opt?.action?.()}>{opt?.title}</h3>
                                <div>{opt?.detail}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="checkout-options-image">
                    <img src={bonnet} alt="" />
                </div>
            </div>
        </div>
    )
}