import React, { useEffect, useRef, useState } from 'react';
import defaultImage from '../images/dress.jpeg';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import $ from 'jquery';
import { routes } from '../routes/Routes';
import { useNavigate } from "react-router-dom";
import { getProductsByTitle } from '../data/Database';


export const SlideContainer = ({data, children}) =>{
    const navigate = useNavigate();

    const sRef = useRef();
    const leftBtnRef = useRef();
    const rightBtnRef = useRef();

    const onViewProduct = (obj, imgageIndex=0) =>{
        obj["info"]["imgageIndex"] = imgageIndex;
        navigate(routes.product + obj?.id, {state: obj});
    }

    useEffect(()=>{
        $(leftBtnRef.current).click(() => {
            console.log(window.innerWidth);
            $(sRef.current).animate({ 
                scrollLeft: $(sRef.current).scrollLeft() - 150 
            }, "slow");
        });

        $(rightBtnRef.current).click(() => {
            $(sRef.current).animate({ 
                scrollLeft: $(sRef.current).scrollLeft() + 150 
            }, "slow");
        });
    }, []);

    return(
        <div hidden={!data?.length} className="slide-horizontal">
            <div>{children}</div>
            <div className="flex">
                <div className="relative">
                    <span ref={leftBtnRef} className="float-left">
                        <IoIosArrowBack />
                    </span>
                </div>
                <div ref={sRef} className="slide-horizontal-scroll">
                    {data?.map((slide, key)=>(
                        <div onClick={()=>onViewProduct(slide)} className="slide-block" key={key}>
                            <img src={slide?.info?.images[0] || defaultImage} alt="" />
                            <div><span>{slide?.info?.title}</span></div>
                            <h5><span>{"XCD $"}{slide?.info?.price}</span></h5>
                        </div>
                    ))}
                </div>
                <div className="relative">
                    <span ref={rightBtnRef} className="float-right">
                        <IoIosArrowForward />
                    </span>
                </div>
            </div>
        </div>
    )
}