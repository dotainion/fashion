import React from "react";
import { BsAlignBottom } from "react-icons/bs";

export const Loading = ({isOpen, darkMode}) =>{
    return(
        <div hidden={!isOpen} className="loading-container" style={{backgroundColor:darkMode && "rgb(0,0,0,0.5)"}}>
            <div className="float-center">
                <h2 style={{paddingBottom:"20px",marginLeft:"-30px"}}><b>Please wait.</b></h2>
                <div className="loading"></div>
            </div>
        </div>
    )
}