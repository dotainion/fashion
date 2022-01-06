import React from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/Routes";
import { BsFacebook, BsInstagram } from 'react-icons/bs';


export const BottomNavigationBar = ({medias}) =>{
    const navigate = useNavigate();

    const onMedia = async(mediaLink) =>{
        if (mediaLink){
            window.open(mediaLink, "_blank");
        }
    }

    return(
        <div className="bottom-navigation-container">
            <div className="centered-animate">
                <div className="flex-animate">
                    <div className="flex">
                        <div className="pad">
                            <div onClick={()=>navigate(routes.home)} className="bottom-navigation-link">Home</div>
                        </div>
                        <div className="pad">
                            <div onClick={()=>navigate(routes.profile)} className="bottom-navigation-link">Profile</div>
                        </div>
                    </div>
                    <div hidden={!medias} className="pad">
                        <div>FIND US ON</div>
                        <BsFacebook onClick={()=>onMedia(medias?.facebook)} className="bottom-navigation-icon" />
                        <BsInstagram onClick={()=>onMedia(medias?.instagram)} className="bottom-navigation-icon" />
                    </div>
                    <div>
                        <div className="pad" style={{fontSize:"30px"}}>PRETTY LITTLE THINGS</div>
                    </div>
                </div>
            </div>
        </div>
    )
}