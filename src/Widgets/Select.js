import React from 'react';

export const Select = ({title, option, inputRef, defaultOption}) =>{
    return(
        <div className="input-entry">
            <h4>{title}</h4>
            <select ref={inputRef} onChange={e=>e.target.style.borderColor = "lightgray"}>
                <option defaultChecked hidden>{defaultOption}</option>
                {option?.map((opt, key)=>(
                    <option key={key}>{opt}</option>
                ))}
            </select>
        </div>
    )
}