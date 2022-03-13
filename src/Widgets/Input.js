import React, { useEffect, useState, useRef } from 'react';
import { FiEdit } from 'react-icons/fi';
import $ from 'jquery';


export const Input = ({title, type, inputRef, cssClass, placeholder, min}) =>{
    const [element, setElement] = useState({input: null, div: null});

    const inputProviderRef = useRef();


    const position = (e) =>{
        if (e.type == 'focus'){
            $(element.div).animate({top: 0}, 'fast');
        }
        if (e.type == 'blur' && !$(element.input).val()){
            $(element.div).animate({top: '50%'}, 'fast');
        }
    }

    const titleFocus = () =>{
        position({type: 'focus'});
        $(element.input).focus();
    }

    useEffect(()=>{
        setElement({
            input: $(inputProviderRef.current).find('input')[0], 
            div: $(inputProviderRef.current).find('div')[0]
        });
    }, []);

    useEffect(()=>{
        $(element.input).focus(position);
        $(element.input).blur(position);
        $(element.div).click(titleFocus);
    }, [element]);

    return(
        <div 
            ref={inputProviderRef} 
            className={`input-entry ${type === "price" && "price"} ${cssClass}`}
        >
            <FiEdit/>
            {title && <div>{title}</div>}
            <span>
                <input 
                    ref={inputRef} 
                    type={type? type === "price"? "number": type: "text"} 
                    placeholder={placeholder} 
                    min={min || 0}
                    onChange={()=>console.log('fihesfsdfd...')}
                />
            </span>
        </div>
    )
}