import React from 'react';
import { FiEdit } from 'react-icons/fi';


export const Select = ({title, option, inputRef, defaultOption}) =>{
    return(
        <div className="input-entry">
            <FiEdit/>
            <div className="relative">{title}</div>
            <select ref={inputRef} onChange={e=>e.target.style.borderColor = "lightgray"}>
                <option defaultChecked hidden>{defaultOption}</option>
                {option?.map((opt, key)=>(
                    <option key={key}>{opt}</option>
                ))}
            </select>
        </div>
    )
}