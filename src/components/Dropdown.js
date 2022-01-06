import React, { useEffect, useState } from "react";
import defaultImage from '../images/dress.jpeg';


export const Dropdown = ({option, option2, title, title2, image, hidden}) =>{

    useEffect(()=>{
        
    }, []);
    return(
        <div className="navigation-dropdown float-top-right" onClick={e=>e.stopPropagation()}>
            <div className="flex-animate">
                <div hidden={!image} className="navigation-dropdown-image-container">
                    <img src={image} />
                </div>
                <div>
                    <div className="flex-animate">
                        <div style={{display:!option?.length && "none"}}>
                            <div><h4>{title}</h4></div>
                            {option?.map?.((opt, key)=>(
                                <div 
                                    onClick={opt?.action} 
                                    className="navigation-dropdown-sub" 
                                    style={{display: opt?.hidden && "none"}}
                                    key={key}
                                >{opt?.title}</div>
                            ))}
                        </div>
                        <div style={{display:!option2?.length && "none"}}>
                            <div><h4>{title2}</h4></div>
                            {option2?.map?.((opt, key)=>(
                                <div 
                                    onClick={opt?.action} 
                                    className="navigation-dropdown-sub"  
                                    style={{display:opt?.hidden && "none"}}
                                    key={key}
                                >{opt?.title}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}