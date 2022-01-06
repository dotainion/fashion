import React, { useEffect, useRef, useState } from "react";
import dress from '../images/dress.jpeg';
import $ from 'jquery';


export const ColorsAvailable = ({title, readOnly, clothing, size, onClick, error, clearError}) =>{
    const [itemSelected, setItemSelected] = useState();
    const [img, setImg] = useState([]);
    const [img2, setImg2] = useState([]);

    const largerSize = {width: size, height: size};

    const moreImageRef = useRef();
    const moreImgBtnRef = useRef();

    const onMoreShow = () =>{
        $(moreImageRef.current).toggle("slow");
    }

    const onTriggerClick = (index) =>{
        onClick?.(index);
        setItemSelected(index);
        clearError?.("");
    }

    useEffect(()=>{
        if (img2.length){
            $(moreImgBtnRef.current).show();
        }else{
            $(moreImgBtnRef.current).hide(); 
        }
    }, [img2]);

    useEffect(()=>{
        let visibleImage = [];
        let hiddenImage = [];
        clothing.forEach((img, i)=>{
            i <= 5 ? visibleImage.push(img) : hiddenImage.push(img);
        });
        setImg(visibleImage);
        setImg2(hiddenImage);
    }, [clothing]);

    return(
        <div className="relative" onClick={e=>!readOnly && e.stopPropagation()} style={{border:error && "1px solid red"}}>
            {title && <h4>{title}</h4>}
            <div onClick={onMoreShow} ref={moreImageRef} hidden className="color-available-more-colors">
                {img2?.map?.((cloth, key)=>(
                    <div 
                        className="color-available" 
                        style={{
                            ...largerSize, 
                            overflow:"hidden",
                            border:itemSelected == key && "2px solid dodgerblue"
                        }} 
                        key={key}>
                        <img 
                            onClick={()=>onTriggerClick(key)}
                            className="color-inner-available" 
                            src={cloth?.[0]} 
                            style={{transform:"scale(4)"}}
                        />
                    </div>
                ))}
            </div>
            <div className="flex">
                <div className="color-available-scroll-container scroll hide-scroll">
                    {img?.map?.((cloth, key)=>(
                        <div 
                            className="color-available" 
                            style={{
                                ...largerSize, 
                                overflow:"hidden",
                                border:itemSelected == key && "2px solid dodgerblue"
                            }} 
                            key={key}>
                            <img 
                                onClick={()=>onTriggerClick(key)}
                                className="color-inner-available" 
                                src={cloth?.[0]} 
                                style={{transform:"scale(4)"}}
                            />
                        </div>
                    ))}
                    <div onClick={onMoreShow} ref={moreImgBtnRef} className="color-more-btn">5+</div>
                    <div className="color-available" style={{...largerSize, display:clothing?.length && "none"}} />
                </div>
            </div>
            <div hidden={!readOnly} className="float-center max-size" />
        </div>
    )
}