import React, { useEffect, useState } from "react";
import { availableSizes, availableSizesObj } from "../contents/lists";
import { IoClose } from 'react-icons/io5';


export const SizesAvailable = ({sizeRef, readOnly, editable, title, loading, onSizeSelected, sizesData, useSelection, error, clearError}) =>{
    const [sizes, setSizes] = useState([]);
    const [selected, setSelected] = useState([]);

    const onSelect = (size) =>{
        clearError?.("");
        if (!isSelected(size)){
            if (!useSelection) setSelected([size]);
            else setSelected([...selected, size]); 
        }else{
            let tempSize = [];
            for(let sSize of selected){
                if (sSize !== size) tempSize.push(sSize);
            }
            setSelected(tempSize); 
        }
    }

    const isSelected = (size) =>{
        for(let select of selected){
            if (select === size){
                return true;
            }
        }
        return false;
    }

    useEffect(()=>{
        if (!loading){
            setSelected([]);
        }
    }, [loading]);

    useEffect(()=>{
        onSizeSelected?.(selected);
    }, [selected]);

    useEffect(()=>{
        if (useSelection && sizesData){
            if (sizesData?.length) setSelected(sizesData); 
            setSizes(availableSizes);
        }else if (useSelection){
            setSizes(availableSizes);
        }else{
            if (sizesData?.length) setSizes(sizesData);
            else setSizes([]);
        }
    }, [useSelection, sizesData]);
    return(
        <div className="relative" ref={sizeRef} onClick={e=>!readOnly && e.stopPropagation()} style={{border:error && "1px solid red"}}>
            {title !== null && <h4>{title || "Size"}</h4>}
            {editable && <div className="pad" style={{backgroundColor:"lightgray"}}>
                <h4>Size selected</h4>
                {selected.map((size, key)=>(
                <span 
                    onClick={()=>onSelect(size)} 
                    className="size-available size-available-select" 
                    style={{border:"none"}}
                    key={key}>
                    <span>{availableSizesObj[size]}</span>
                </span>
            ))} 
            </div>}
            <div hidden={!editable} className="pad">Select size from the list bellow.</div>
            {sizes.map((size, key)=>(
                <div 
                    onClick={()=>onSelect(size)} 
                    className="size-available" 
                    style={{borderColor: isSelected(size) && "dodgerblue"}}
                    key={key}>
                    <span>{size}</span>
                </div>
            ))}
            <div hidden={!readOnly} className="float-center max-size" />
        </div>
    )
}