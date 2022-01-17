import React from 'react';


export const Modal = ({backdrop, children}) =>{
    return(
        <>
        <div className="modal">
            { children }
        </div>
        <div hidden={!backdrop} className="backdrop vh" />
        </>
    )
}