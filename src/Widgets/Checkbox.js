import React from 'react';

export const Checkbox = ({title, sideLable, cssClass, inputRef}) =>{
    return(
        <div className={`input-entry ${cssClass}`}>
            {!sideLable && <h4>{title}</h4>}
            <label>
                <input ref={inputRef} type="checkbox"/>
                {sideLable && <span>{title}</span>}
            </label>
        </div>
    )
}