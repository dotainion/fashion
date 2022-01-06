import React, { useEffect, useRef, useState } from "react";
import defaultImage from '../images/dress.jpeg';
import { useStore } from "../state/Store";
import { SizesAvailable } from "./SizesAvailable";
import $ from 'jquery';
import { tools } from "../tools/Tools";
import { Input } from "../Widgets/Input";


export const CartItemSizeSelector = ({data, onCancel, onSubmit, id, cartRef}) =>{
    const { addToCart } = useStore();

    const [sizeSelected, setSizesSelected] = useState([]);

    const cRef = useRef();
    const quantityRef = useRef();

    const onTriggerSubmit = () =>{
        if (sizeSelected.length){
            onSubmit?.();
            addToCart({
                image: data?.info?.images?.[0]?.[0] || "",
                price: data?.info?.price || "",
                title: data?.info?.title || "",
                size: sizeSelected?.[0] || "",
                sellerId: data?.info?.userId,
                id: data?.id
            }, quantityRef.current.value, false, true);
            $(cartRef.current || cRef.current).toggle("slow");
        }else{
            tools.shakeElement(cartRef.current || cRef.current);
        }
    }

    const onTriggerCancel = () =>{
        onCancel?.();
       $(cartRef.current || cRef.current).toggle("slow");
    }

    useEffect(()=>{
        $(cartRef?.current || cRef.current).hide();
    }, [id, cartRef]);

    useEffect(()=>{
        quantityRef.current.value = 1;
        $(quantityRef.current).change(()=>{
            if($(quantityRef.current).val() < 1){
                quantityRef.current.value = 1;
            }
        });
    }, []);
    
    return(
        <div hidden onClick={e=>e.stopPropagation()} className="sales-sizes-container" id={id} ref={cartRef || cRef}>
            <SizesAvailable sizesData={data?.info?.sizes} onSizeSelected={setSizesSelected} title="PLEASE SELECT SIZE" />
            <div className="pad">
                <Input inputRef={quantityRef} cssClass="sales-sizes-quantity" title="Quentity" type="number" min={1} />
            </div>
            <table>
                <tbody>
                    <tr className="text-center max-width pad-mini">
                        <td onClick={onTriggerCancel}>CANCEL</td>
                        <td onClick={onTriggerSubmit}>ADD TO CART</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}