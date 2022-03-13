import React, { useEffect, useRef } from "react";
import $ from 'jquery';
import defaultImage from '../images/dress.jpeg';
import { ColorsAvailable } from "./ColorsAvailable";
import { CartItemSizeSelector } from "./CartItemSizeSelector";
import { useNavigate, useLocation } from "react-router-dom";
import { routes } from "../routes/Routes";
import { useStore } from "../state/Store";

export const SaleContent = ({data}) =>{
    const { onViewProduct } = useStore();

    const navigate = useNavigate();

    const imgRef = useRef();
    const sizeRef = useRef();
    const containerRef = useRef();

    const onShowSelector = (e) =>{
        e?.stopPropagation();
        $(sizeRef.current).toggle("slow");
    }

    useEffect(()=>{
        /*$(containerRef.current).hover(function() {
            $(imgRef.current).attr("src", data?.info?.images?.[0]?.[1]).hide("slow");
        });
        $(containerRef.current).mouseout(()=>{
            $(imgRef.current).attr("src", data?.info?.images?.[0]?.[0]).show("slow");
        });*/
    }, [data]);

    return(
        <div onClick={()=>onViewProduct(data)} className="sales-container" ref={containerRef}>
            <div onClick={onShowSelector} className="sales-cart-button">ADD TO CART</div>
            <img className="sales-image" src={data?.info?.images?.[0]?.[0] || defaultImage} alt="" ref={imgRef} />
            <div>{data?.info?.title}</div>
            <div><b>{"XCD $"}{data?.info?.price}</b></div>
            <ColorsAvailable onClick={(i)=>onViewProduct(data, i)} clothing={data?.info?.images || []} />
            <CartItemSizeSelector data={data} cartRef={sizeRef} />
        </div>
    )
}