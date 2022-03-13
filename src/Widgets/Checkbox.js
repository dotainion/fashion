import React from 'react';
import { FiEdit } from 'react-icons/fi';


export const Checkbox = ({title, sideLable, cssClass, inputRef}) =>{
    return(
        <div className="input-entry">
            <FiEdit/>
            {!sideLable && <div className="relative">{title}</div>}
            <div className="relative">
                <input ref={inputRef} type="checkbox"/>
                {sideLable && <span>{title}</span>}
            </div>
        </div>
    )
}