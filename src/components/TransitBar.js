import React from 'react';
import { TiArrowRightThick } from 'react-icons/ti';


export const TransitBar = ({level}) =>{
    const isLevel = (lvl) =>{
        if (parseInt(level || 0) !== lvl) return {display: "none"};
        else return {display: ""};
    }

    const isBorder = (lvl) =>{
        if (isLevel(lvl)?.display === "none") return {borderColor: ""};
        else return {borderColor: "navy"};
    }

    return(
        <div className="scheduled-delivery-bulletin-container">
            <div className="scheduled-delivery-bulletin" style={isBorder(1)}>
                <TiArrowRightThick style={isLevel(1)} />
                <div>Processing</div>
            </div>
            <div className="scheduled-delivery-bulletin-line">
                <div></div>
            </div>
            <div className="scheduled-delivery-bulletin" style={isBorder(2)}>
                <TiArrowRightThick style={isLevel(2)} />
                <div>Packaged</div>
            </div>
            <div className="scheduled-delivery-bulletin-line">
                <div></div>
            </div>
            <div className="scheduled-delivery-bulletin" style={isBorder(3)}>
                <TiArrowRightThick style={isLevel(3)} />
                <div>Transit</div>
            </div>
            <div className="scheduled-delivery-bulletin-line">
                <div></div>
            </div>
            <div className="scheduled-delivery-bulletin" style={isBorder(4)}>
                <TiArrowRightThick style={isLevel(4)} />
                <div>Delivered</div>
            </div>
        </div>
    )
}