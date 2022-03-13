import React from 'react';
import { FiEdit } from 'react-icons/fi';


export const Textarea = ({title, rows, placeholder, inputRef}) =>{
    return(
        <div className="input-entry">
            <FiEdit/>
            <div className="relative">{title}</div>
            <textarea ref={inputRef} placeholder={placeholder || 'Place text here'} rows={rows || 6} />
        </div>
    )
}