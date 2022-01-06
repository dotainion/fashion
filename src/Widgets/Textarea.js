import React from 'react';

export const Textarea = ({title, rows, placeholder, inputRef}) =>{
    return(
        <div className="input-entry">
            <h4>{title}</h4>
            <textarea ref={inputRef} placeholder={placeholder} rows={rows || 6} />
        </div>
    )
}