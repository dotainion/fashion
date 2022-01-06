import React, { useEffect, useState } from 'react';

export const Input = ({title, type, inputRef, cssClass, placeholder, min}) =>{
    return(
        <div className={`input-entry ${type === "price" && "price"} ${cssClass}`}>
            {title && <h4>{title}</h4>}
            <span>
                <input 
                    ref={inputRef} 
                    type={type? type === "price"? "number": type: "text"} 
                    placeholder={placeholder} 
                    min={min || 0}
                />
            </span>
        </div>
    )
}